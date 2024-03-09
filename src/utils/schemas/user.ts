import { z } from "zod";

export const RegisterSchema = z
  .object({
    email: z
      .string()
      .email({ message: "Invalid email format!" })
      .min(8, { message: "Email must be at least 8 character long!" })
      .max(100, { message: "Email must be at most 100 characters long!" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long!" })
      .max(50, { message: "Password must be at most 50 characters long!" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long!" })
      .max(50, { message: "Password must be at most 50 characters long!" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match!",
    path: ["confirmPassword"],
  });

export const LoginSchema = z.object({
  email: z.string().email({ message: "Email is required!" }).min(8).max(50),
  password: z.string().min(8, { message: "Password is required!" }).max(50),
});
