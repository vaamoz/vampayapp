// lib/validationSchema.ts
import { z } from "zod";

export const loginSchema = z.object({
  userid: z.string().nonempty({ message: "Username is required" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});
