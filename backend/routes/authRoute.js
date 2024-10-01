import express from "express";
import { signup, login, logout } from "../controller/authController.js";
import {
  loginValidation,
  signUpValidation,
} from "../Middlewares/AuthValidation.js";

const router = express.Router();

router.post("/signup", signUpValidation, signup);
router.post("/login", loginValidation, login);
router.post("/logout", logout);
export default router;
