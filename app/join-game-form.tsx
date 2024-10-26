"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  gameId: z.string().min(2).max(20).regex(
    /^[a-z0-9-]+$/,
    "Must be lowercase letters, digits, or dashes only",
  ),
});


export default function JoinGameForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gameId: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
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
                <Input placeholder="abc-def" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="mt-4 text-base"
          size="lg"
        >
          Join <ArrowUpRight />
        </Button>
      </form>
    </Form>
  );
}
