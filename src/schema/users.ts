import { z } from "zod";
export const SignUpSchema = z.object({
  name: z.string(),
  email: z
    .string()
    .min(1, { message: "email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be atleast 6 charactors long" }),
});

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(1, { message: "password is required" })
    .min(6, { message: "Password must be atleast 6 charactors long" }),
});
