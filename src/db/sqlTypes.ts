import { z } from "zod";

export const SqlNullString = z.object({
  Valid: z.boolean(),
  String: z.string().nullable(),
});

export const SqlNullDateTime = z.object({
  Valid: z.boolean(),
  Time: z.date().nullable(),
});

export const SqlNullBool = z.object({
  Valid: z.boolean(),
  Bool: z.boolean().nullable(),
});
