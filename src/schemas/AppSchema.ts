"use client";

import { z } from "zod";

export const AppSchema = z.object({
  name: z.string().min(2).max(50),
  url: z.optional(z.string()),
});
