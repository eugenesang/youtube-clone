import User from "../models/userModel.js";
import Video from "../models/videoModel.js";
import bcrypt from "bcrypt";
import { ApiError } from "../utils/apiError.js";

export async function getAllUsers(req, res) {
  // const {user, ...user} = req
  // console.log({...user});
  const user = await User.find({});
  if (!user) {
    return res.json({ success: false, msg: "unable to get users deatail" });
  }
  res.json({ user });
}

export function getProfile(req, res, next) {
  // const {user, ...user} = req
  // console.log({...user});
  try {
    if (!req.user) {
      throw new ApiError("unauthorised user access");
    }
    return res.json(req.user);
  } catch (error) {
    res.json(error) 
    next(error)
  }
}

// get User details

export async function searchUser(req, res) {
  const { id } = req.params;
  // console.log(req.query);

  const { ...user } = await User.findById(id);
  // console.log({ user });

  const { password, ...userDetails } = user._doc;

  res.json({ userDetails });
}

export async function subscribe(req, res) {
  if (req.user._id == req.params.uid) {
    return res.json({ success: false, msg: "User can't subscribe themself" });
  } else {
    try {
      if (req.user.subscribedUsers.includes(req.params.uid)) {
        return res.json({ success: false, msg: "already Subscribed" });
      } else {
        //search that channel and inc the sub count
        await User.findByIdAndUpdate(req.params.uid, {
          $inc: { subscribers: +1 },
        });
        //search yourself and push that channel id in subedArray
        const user = await User.findByIdAndUpdate(req.user._id, {
          $push: { subscribedUsers: req.params.uid },
        });

        console.log({ you: user });

        // console.log(req.user._id === req.params.uid);//false
        // console.log(`req.user._id: ${typeof(req.user._id) }`); //object
        // console.log(`req.params.uid: ${typeof(req.params.uid) }`);// string

        return res.json({ success: true, msg: "Subscribed" });
      }
    } catch (error) {
      return res.json({ success: false, msg: "incorrect Channel Id", error });
    }
  }
}

export async function unsubscribe(req, res) {
  if (req.user._id == req.params.uid) {
    return res.json({ success: false, msg: "User can't unSubscribe themself" });
  } else {
    try {
      if (!req.user.subscribedUsers.includes(req.params.uid)) {
        return res.json({ success: false, msg: "Not Subscribed" });
      } else {
        //search that channel and inc the sub count
        await User.findByIdAndUpdate(req.params.uid, {
          $inc: { subscribers: -1 },
        });
        //search yourself and push that channel id in subedArray
        const user = await User.findByIdAndUpdate(req.user._id, {
          $pullAll: { subscribedUsers: req.params.uid },
        });

        console.log({ you: user });

        // console.log(req.user._id === req.params.uid);//false
        // console.log(`req.user._id: ${typeof(req.user._id) }`); //object
        // console.log(`req.params.uid: ${typeof(req.params.uid) }`);// string

        return res.json({ success: true, msg: "unSubscribed" });
      }
    } catch (error) {
      return res.json({ success: false, msg: "incorrect Channel Id", error });
    }
  }
}

export async function updateUserDetails(req, res) {
  try {
    const { email, username } = req.body;

    if (!email || !username)
      return res.json({ success: false, msg: "All feilds required" });

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: { email, username },
      },
      { new: true }
    ).select("-password");

    if (!updatedUser)
      return res.json({ success: false, msg: "Cant update User details" });

    return res.json({ success: true, msg: "user detail updated", updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
}

export async function updateUserPassword(req, res) {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword)
    return res.json({ success: false, msg: "All feilds required" });

  const isPasswordCorrect = bcrypt.compare(oldPassword, req.user.password);
  if (!isPasswordCorrect) {
    return res.json({ success: false, msg: "incorrect Password" });
  }
  const user = await User.findByid(req.user._id);
  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res.json({ success: true, msg: "Password changed" });
}

export async function like(req, res) {
  try {
    if (req.user.likedVid.includes(req.params.vid)) {
      return res.json({ success: false, msg: "Already Liked video" });
    }
    //push video in liked array
    const user = await User.findByIdAndUpdate(req.user._id, {
      $push: { likedVid: req.params.vid },
    });

    await Video.findByIdAndUpdate(req.params.vid, {
      $inc: { likes: +1 },
    });

    return res.json({ success: true, msg: "liked" });
  } catch (error) {
    return res.json({
      success: false,
      msg: "incorrect video Id or User ID",
      error,
    });
  }
}

export async function dislike(req, res) {
  try {
    if (!req.user.likedVid.includes(req.params.vid)) {
      return res.json({ success: false, msg: "unliked video" });
    }
    //push video in liked array
    const user = await User.findByIdAndUpdate(req.user._id, {
      $pullAll: { likedVid: req.params.vid },
    });

    await Video.findByIdAndUpdate(req.params.vid, {
      $inc: { likes: -1 },
    });

    return res.json({ success: true, msg: "Disliked" });
  } catch (error) {
    return res.json({
      success: false,
      msg: "incorrect video Id or User ID",
      error,
    });
  }
}

export async function deleteUser(req, res) {
  try {
    const { password } = req.body;
    if (!password)
      return res.json({ success: false, msg: "Password required" });

    const isPasswordCorrect = bcrypt.compare(password, req.user.password);
    if (!isPasswordCorrect)
      return res.json({ success: false, msg: "incorrect password" });

    const user = await User.findByIdAndDelete(req.user._id);
    res.clearCookies;
    return res.json({ success: true, msg: "user account deleted" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, msg: "server error", error });
  }
}
