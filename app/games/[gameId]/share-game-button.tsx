"use client";

import { Button } from "@/components/ui/button";
import { ClipboardCopy, Share } from "lucide-react";
import { toast } from "sonner";

export default function ShareGameButton({ gameId }: { gameId: string }) {
  const baseUrl = `${window.location.protocol}//${window.location.host}`;
  const url = `${baseUrl}/games/${gameId}`;
  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(() => {
      toast("Link copied to clipboard", {
        description: url,
      });
    });
  };
  const shareData = {
    title: `Join game ${gameId} on Cashout!`,
    url,
  };
  // Some browsers don't support navigator.share (e.g. Firefox).
  // In that case, we'll just show the URL and let the user copy it.
  const canShare = navigator["canShare"]
    ? navigator.canShare(shareData)
    : false;
  return canShare
    ? (
      <Button
        size="sm"
        variant="outline"
        onClick={() => navigator.share(shareData).catch(() => {})}
      >
        Invite friends <Share size={14} />
      </Button>
    )
    : (
      <Button
        size="sm"
        variant="outline"
        onClick={handleCopy}
      >
        Copy URL <ClipboardCopy size={14} />
      </Button>
    );
}
