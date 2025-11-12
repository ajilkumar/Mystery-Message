import { z } from "zod";

export const signiacceptMessageSchema = z.object({
  acceptMessages: z.boolean()
});
