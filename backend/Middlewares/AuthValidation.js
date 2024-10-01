import { z } from "zod";

export const signUpValidation = (req, res, next) => {
  const signupSchema = z.object({
    username: z.string(),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "password must be 8 or characters long"),
  });
  try {
    const { error } = signupSchema.safeParse(req.body);
    if (error) return res.status(400).json({ msg: "bad request", error });
    next();
  } catch (err) {
    console.log(err);
  }
};
export const loginValidation = (req, res, next) => {
  const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "password must be 8 or characters long"),
  });
  try {
    const { error } = loginSchema.safeParse(req.body);
    if (error) return res.status(400).json({ msg: "bad request", error });
    next();
  } catch (err) {
    console.log(err);
  }
};
