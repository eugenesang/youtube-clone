import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { createToken } from "../utils/createToken.js";
import { ApiError } from "../utils/apiError.js";

export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password)
      return res.json({ msg: "all credential required" });

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: "existing user" });

    const user = await User.create({ email, username, password });

    if (!user) return res.status(500).json({ msg: "signup failed" });
    const token = await createToken(user._id);
    // console.log(token);

    const cookieOptions = {
      httpOnly: true, //js cant touch this
      maxAge: 3 * 24 * 60 * 60 * 1000, //3days
      // sameSite: "lax", refer login cookie opt
      secure: process.env.NODE_ENV === "production", //true for production send only in https
    };
    res.cookie("token", token, cookieOptions);

    return res.status(200).json({ msg: "signed in success", user: user.email });

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "server error", error });
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // console.log(`login email:${email}`);
    if (!email || !password) throw new ApiError("all feilds required", 403);

    const user = await User.findOne({ email });
    if (!user) throw new ApiError("invalid email", 403);

    const auth = await bcrypt.compare(password, user.password);
    if (!auth) throw new ApiError("Incorrect password", 401);

    const token = await createToken(user._id);
    // console.log(token);

    const cookieOptions = {
      httpOnly: true, //js cant touch this
      // sameSite: 'none',   //for production same site none,
      maxAge: 3 * 24 * 60 * 60 * 1000, //3days
      secure: false, //true for production send only in https
    };
    // console.log(cookieOptions);

    return res
      .status(200)
      .cookie("token", token, cookieOptions)
      .json({ msg: "user logged in successfully", user: user.email });
  } catch (error) {

    console.error({error})
    // next(error);
    return res.status(400).json(error);
  }
};

export const logout = (req, res) => {
  const cookieOptions = {
    httpOnly: true,
    secure: false,
    maxAge: 0,
  };
  return res
    .status(200)
    .cookie("token", "", cookieOptions)
    .json({ msg: "user logged out" });
};
