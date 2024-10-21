import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import StartGameMenu from "./start-game-menu";
import JoinGameMenu from "./join-game-menu";

export default async function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-80">
      <h1 className="text-2xl mb-6">Welcome to Cashout!</h1>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="text-base mb-3" size="lg">Start a Game</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Start Game</DialogTitle>
          </DialogHeader>
          <StartGameMenu />
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="secondary" className="text-base" size="lg">Join a Game</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Join Game</DialogTitle>
          </DialogHeader>
          <JoinGameMenu />
        </DialogContent>
      </Dialog>
    </div>
  );
}