"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { NewEntry } from "@/types/db_types";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export type NewEntryWithoutGameId = Omit<NewEntry, "game_id">;

const formSchema = z.object({
  person: z.string().min(2).max(50),
  buy_in: z.coerce.number().min(0.1).max(1000),
  cash_out: z.coerce.number().min(0.1).max(1000),
});

export default function RecordEntryForm(
  { onSubmitEntry }: { onSubmitEntry: (entry: NewEntryWithoutGameId) => void },
) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      person: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    onSubmitEntry(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="person"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Bobby Tables" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="buy_in"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Buy-in</FormLabel>
              <FormControl>
                <Input placeholder="20" {...field} />
              </FormControl>
              <FormDescription>
                Money you bought in with
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cash_out"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cash-out</FormLabel>
              <FormControl>
                <Input placeholder="0" {...field} />
              </FormControl>
              <FormDescription>
                How much money you left with
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Record</Button>
      </form>
    </Form>
  );
}
