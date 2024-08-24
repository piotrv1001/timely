"use client";

import { targetToSingleSchema } from "@/schemas/target-to-single-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type TimerFormProps = {
  onSubmit: (data: z.infer<typeof targetToSingleSchema>) => void;
};

export default function TimerForm({ onSubmit }: TimerFormProps) {
  const form = useForm<z.infer<typeof targetToSingleSchema>>({
    resolver: zodResolver(targetToSingleSchema),
    defaultValues: {
      distance: 0,
      hours: 0,
      minutes: 0,
    }
  });

  const handleSubmit = (data: z.infer<typeof targetToSingleSchema>) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="distance"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">Distance (km)</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter distance"
                    type="number"
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center w-full justify-between">
            <FormField
              control={form.control}
              name="hours"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">Hours</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter hours"
                      type="number"
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="minutes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">Minutes</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter minutes"
                      type="number"
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button type="submit" className="w-full">
          Calculate
        </Button>
      </form>
    </Form>
  );
}
