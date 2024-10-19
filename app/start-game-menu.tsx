"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { generate } from "random-words";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, RefreshCw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { gameIdExists } from "@/lib/db_actions";

export default function StartGameMenu() {
  const [gameName, setGameName] = useState(randomName());
  const [gameNameExists, setGameNameExists] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if the game name exists in the database.
  useEffect(() => {
    setLoading(true);
    gameIdExists({ gameId: gameName }).then((exists) => {
      setGameNameExists(exists);
      setLoading(false);
    })
  }, [gameName]);

  // Game name must be only letters, numbers, and hyphens.
  const nameIsValid = gameName.length > 0 && /^[a-zA-Z0-9-]+$/.test(gameName);

  return (
    <Tabs defaultValue="random">
      <TabsList>
        <TabsTrigger value="random">Random Name</TabsTrigger>
        <TabsTrigger value="custom">Custom Name</TabsTrigger>
      </TabsList>
      <div className="p-4 w-full flex flex-col items-center justify-start">
        <TabsContent value="random">
          <div className="flex flex-row items-center gap-8">
            <span className="text-muted-foreground">Game Name:</span>
            <div className="justify-between items-center flex flex-row w-48">
              <code>{gameName}</code>{" "}
              <Button
                variant="secondary"
                size="icon"
                onClick={() => setGameName(randomName())}
              >
                <RefreshCw />
              </Button>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="custom">
          <div className="flex flex-row justify-center items-center gap-3 w-full">
            <Label
              htmlFor="game-id"
              className="text-base text-muted-foreground"
            >
              Game Name:
            </Label>
            <Input
              name="game-id"
              type="text"
              className="max-w-40"
              onChange={(e) => setGameName(e.target.value)}
              value={gameName}
              autoCapitalize="off"
            />
          </div>
        </TabsContent>
      </div>
      <div className="w-full flex flex-col justify-center items-center">
        <Link href={`/games/${gameName.toLowerCase()}`}>
          <Button className="mt-4 text-base" size="lg" disabled={loading || !nameIsValid || gameNameExists}>
            Start <ArrowUpRight />
          </Button>
        </Link>
        {!nameIsValid && (
          <div className="text-red-500 text-sm mt-2">
            Game name must be only letters, numbers, and hyphens.
          </div>
        )}
        {gameNameExists && (
          <div className="text-red-500 text-sm mt-2">
            Game name already exists.
          </div>
        )}
      </div>
    </Tabs>
  );
}

function randomName() {
  return generate({ exactly: 2, maxLength: 5, join: "-" });
}
