import { z } from "zod";

export const targetToSingleSchema = z.object({
  distance: z.number({
    required_error: "Distance is required",
  }),
  hours: z.number({
    required_error: "Hours is required",
  }),
  minutes: z.number({
    required_error: "Minutes is required",
  }),
});
