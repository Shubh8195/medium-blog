import { z } from "zod";

export const signUpSchema = z.object({
  email: z.string().email({ message: "Please type a valid email" }),
  name: z.string(),
  password: z
    .string()
    .min(8, { message: "Length of password at least 8 digits" }),
});

export type SignupType = z.infer<typeof signUpSchema>;

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type SigninType = z.infer<typeof signInSchema>;

export const blogCreateSchema = z.object({
  title: z.string(),
  content: z.string(),
});

export type BlogCreateType = z.infer<typeof blogCreateSchema>;

export const blogUpdateSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  id: z.string(),
});

export type BlogUpdateType = z.infer<typeof blogUpdateSchema>;