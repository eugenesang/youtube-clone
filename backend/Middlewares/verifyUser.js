import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { ApiError } from "../utils/apiError.js";

export async function verifyUser(req, res, next) {
  try {
    // console.log(`verifyUser req.cookie: ${req.cookies}`);
    // console.log(` req.cookies: ${req.cookies}`);
    const token = req.cookies.token;
    // console.log(`token : ${token}`)
    if (!token) throw new ApiError("Token not found", 401);

    const verify = jwt.verify(token, process.env.tokenSecret);
    if (!verify) throw new ApiError("unAuthorised user access", 401);

    const user = await User.findById(verify.id);
    if (!user) throw new ApiError("User not found");

    console.log("verified User\n");

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
}
