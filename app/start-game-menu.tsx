"use client";

import { useState } from "react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { generate } from "random-words";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, RefreshCw } from "lucide-react";

export default function StartGameMenu() {
  const [gameName, setGameName] = useState(randomName());
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
          <div className="flex flex-row justify-between items-center">
            Change your password here.
          </div>
        </TabsContent>
      </div>
      <div className="w-full flex flex-row justify-center items-center">
        <Link href={`/games/${gameName}`}>
          <Button className="mt-4 text-base" size="lg">
            Start <ArrowUpRight />
          </Button>
        </Link>
      </div>
    </Tabs>
  );
}

function randomName() {
  return generate({ exactly: 2, maxLength: 5, join: "-" });
}
