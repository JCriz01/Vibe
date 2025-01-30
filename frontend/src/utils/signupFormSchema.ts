import { z } from "zod";

const signupFormSchema = z.object({
  fullName: z.string().min(1, { message: "Please enter a full name" }),
  username: z.string().min(1, { message: "Please enter a username" }),
  email: z.string().email().min(1, { message: "Please enter a valid email" }),
  password: z.string().min(1, { message: "Please enter your password" }),
});

export default signupFormSchema;