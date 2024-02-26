import Register from "@/app/(auth)/register/page";
import { registerUser } from "@/redux/user/userSlice";
import { z } from "zod";

const RegisterSchema = z
  .object({
    email: z
      .string()
      .email({ message: "Invalid email format!" })
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

type User = z.infer<typeof RegisterSchema>;

const user = {
  email: 2,
};

console.log(RegisterSchema.parse(user));
