import mongoose from "mongoose";
import dotenv from "dotenv";
import pc from "picocolors";
dotenv.config();

export const connectdb = async () => {
  try {
    await mongoose.connect(process.env.mongo);
    console.log(`${pc.green("Mongo Connected")}`);
  } catch (error) {
    console.log(`${pc.red("database connection failed: \n")}` + error);
  }
};
