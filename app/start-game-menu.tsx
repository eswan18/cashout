"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { generate } from "random-words";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, RefreshCw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { gameIdExists } from "@/lib/db_actions";

function randomName() {
  return generate({ exactly: 2, maxLength: 5, join: "-" });
}

const formSchema = z.object({
  gameId: z.string().min(2).max(20).regex(
    /^[a-z0-9-]+$/,
    "Must be lowercase letters, digits, or dashes only",
  ),
});

export default function StartGameForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gameId: randomName(),
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Reject game names that already exist.
    const gameExists = await gameIdExists({ gameId: values.gameId });
    if (gameExists) {
      form.setError("gameId", {
        type: "manual",
        message: "This game name already exists. Please choose another.",
      });
      return;
    }
    // Redirect to the game page.
    const gameUrl = `/games/${values.gameId}`;
    router.push(gameUrl);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="gameId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Game Name</FormLabel>
              <FormControl>
                <div className="flex flex-row w-full gap-2">
                  <Input placeholder="abc-def" {...field} />
                  <Button
                    variant="secondary"
                    size="icon"
                    type="button"
                    onClick={() => {
                      form.setValue("gameId", randomName());
                    }}
                  >
                    <RefreshCw />
                  </Button>
                </div>
              </FormControl>
              <FormDescription>
                Choose a unique name for your game. You can use lowercase letters, digits, or dashes.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="mt-4 text-base"
          size="lg"
          type="submit"
        >
          Start <ArrowUpRight />
        </Button>
      </form>
    </Form>
  );
}
