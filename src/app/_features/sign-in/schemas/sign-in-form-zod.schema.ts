import * as z from "zod";

export const signInFormZodSchema = z.object({
  username: z
    .string()
    .max(255, "Username must be at most 255 characters long")
    .nonempty("Username is required"),
  password: z
    .string()
    .min(10, "Password must be at least 10 characters long")
    .max(255, "Password must be at most 255 characters long")
    .regex(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,255}$/,
      "Password must contain at least one uppercase letter, one number, and one special character"
    ),
});
