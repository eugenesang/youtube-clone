import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    videoId: {
      type: [String],
      default: []
    },
    likedVid:{
      type: [String],
      default: []
    },

    subscribers: {
      type: Number,
      default:0
    },
    subscribedUsers: {
      type: [String],
      default:[]
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

const User = mongoose.model("User", userSchema);
export default User;
