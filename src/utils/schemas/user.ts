import { z } from "zod";

export const RegisterSchema = z
  .object({
    email: z
      .string()
      .email({ message: "Invalid email format!" })
      .min(8, { message: "Email must be at least 8 characters long!" })
      .max(100, { message: "Email must be at most 100 characters long!" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long!" })
      .max(50, { message: "Password must be at most 50 characters long!" }),

    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long!" })
      .max(50, { message: "Password must be at most 50 characters long!" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter!",
      })
      .regex(/[0-9!@#$%^&*(),.?":{}|<>]/, {
        message:
          "Password must contain at least one number or special character!",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match!",
    path: ["confirmPassword"],
  });

export const LoginSchema = z.object({
  email: z.string().email({ message: "Email is required!" }).min(8).max(50),
  password: z.string().min(8, { message: "Password is required!" }).max(50),
  code: z.optional(z.string()),
});

export const ResetPasswordSchema = z.object({
  email: z.string().email({ message: "Email is required!" }).min(8).max(50),
});

export const NewPasswordSchema = z
  .object({
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

export const PersonalDataSchema = z.object({
  fullName: z
    .string()
    .min(8, { message: "Name must be at least 8 characters long!" })
    .max(50, { message: "Name must be at most 50 characters long!" }),
  birthDate: z.string().refine((value) => !isNaN(Date.parse(value)), {
    message: "Invalid date format!",
  }),
  address: z
    .string()
    .min(8, { message: "Address must be at least 8 characters long!" })
    .max(100, { message: "Address must be at most 100 characters long!" }),
  state: z
    .string()
    .min(2, { message: "State must be at least 2 characters long!" })
    .max(50, { message: "State must be at most 50 characters long!" }),
  zipCode: z
    .string()
    .min(4, { message: "Zip code must be at least 4 characters long!" })
    .max(10, { message: "Zip code must be at most 10 characters long!" }),
  city: z
    .string()
    .min(2, { message: "City/Countryside must be at least 2 characters long!" })
    .max(50, {
      message: "City/Countryside must be at most 50 characters long!",
    }),
  country: z
    .string()
    .min(4, { message: "Country must be at least 4 characters long!" })
    .max(50, { message: "Country must be at most 50 characters long!" }),
  phoneNumber: z
    .string()
    .regex(/^\+?[0-9\s\-]+$/, { message: "Invalid phone number format!" })
    .min(8, { message: "Phone number must be at least 8 characters long!" })
    .max(20, { message: "Phone number must be at most 20 characters long!" }),
});

export const UpdateNameSchema = z.object({
  name: z
    .string()
    .min(8, { message: "Name must be at least 8 characters long!" })
    .max(20, { message: "Name must be at most 20 characters long!" }),
});
