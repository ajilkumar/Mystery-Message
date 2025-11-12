import { z } from "zod";

export const signiacceptMessageSchema = z.object({
  content: z
    .string()
    .min(10, { message: "Message content must be atleat 10 characters long." })
    .max(300, {
      message: "Message content must be atmost 300 characters long.",
    }),
});
