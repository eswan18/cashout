"use client";

import { Button } from "@/components/ui/button";
import { ClipboardCopy } from "lucide-react";
import { toast } from "sonner";

export default function GameLinkPanel({ gameId }: { gameId: string }) {
  const baseUrl = `${window.location.host}/`;
  const url = `${baseUrl}games/${gameId}`;
  const fullUrl = `${window.location.protocol}//${url}`;
  const handleCopy = () => {
    navigator.clipboard.writeText(fullUrl).then(() => {
      toast("Link copied to clipboard", {
        description: fullUrl,
      });
    });
  };
  // Check if navigator has a canShare method
  const canShare = navigator["canShare"] ? navigator.canShare() : false;
  return canShare
    ? <div>you can share!</div>
    : (
      <div className="flex flex-row gap-1 text-xs items-center">
        <div className="text-muted-foreground">Share Link:</div>
        <Button
          size="sm"
          variant="ghost"
          className="font-mono px-1 text-xs"
          onClick={handleCopy}
        >
          <p>{url}</p>
          <ClipboardCopy size={14} />
        </Button>
      </div>
    );
}
