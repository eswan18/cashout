"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function JoinGameMenu() {
  const [gameName, setGameName] = useState("");

  // Game name must be only letters, numbers, and hyphens.
  const nameIsValid = gameName.length > 0 && /^[a-zA-Z0-9-]+$/.test(gameName);

  return (
    <>
      <div className="p-4 w-full flex flex-col items-center justify-start">
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
      </div>
      <div className="w-full flex flex-col justify-center items-center">
        <Link href={`/games/${gameName.toLowerCase()}`}>
          <Button
            className="mt-4 text-base"
            size="lg"
            disabled={!nameIsValid}
          >
            Join <ArrowUpRight />
          </Button>
        </Link>
        {!nameIsValid && (
          <div className="text-red-500 text-sm mt-2">
            Game name must be only letters, numbers, and hyphens.
          </div>
        )}
      </div>
    </>
  );
}
