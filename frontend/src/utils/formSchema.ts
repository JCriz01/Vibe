import { z } from "zod";

const formSchema = z.object({
  username: z.string().min(1, { message: "Please enter a valid username" }),
  password: z.string().min(1, { message: "Please enter a valid password" }),
});

export default formSchema;
