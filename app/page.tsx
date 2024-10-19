import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import StartGameMenu from "./start-game-menu";

export default async function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-80">
      <h1 className="text-2xl mb-4">Welcome to Cashout!</h1>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="text-base" size="lg">Start a Game</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Start Game</DialogTitle>
          </DialogHeader>
          <StartGameMenu />
        </DialogContent>
      </Dialog>
    </div>
  );
}