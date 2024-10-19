import { Button } from "@/components/ui/button";
import { getEntries } from "@/lib/db_actions";

export default async function Home() {
  const entries = await getEntries();
  return (
    <div className="flex items-center justify-center min-h-80">
      <Button>Join a Game</Button>
      { entries.map((entry) => (
        <div key={entry.id}>
          <h1>{entry.person}</h1>
          <p>{entry.game_id}</p>
        </div>
      ))}
    </div>
  );
}
