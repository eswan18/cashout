import { Button } from "@/components/ui/button";

export default async function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-80">
      <h1 className="text-2xl mb-4">Welcome to Cashout!</h1>
      <Button className='text-base' size='lg'>Join a Game</Button>
    </div>
  );
}
