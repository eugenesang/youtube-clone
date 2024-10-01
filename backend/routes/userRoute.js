import express from "express";
const router = express.Router();
import {
  getAllUsers,
  getProfile,
  searchUser,
  updateUserDetails,
  updateUserPassword,
  deleteUser,
  subscribe,
  unsubscribe,
  like,
  dislike,
} from "../controller/userController.js";
import { verifyUser } from "../Middlewares/verifyUser.js";


//getAllUsers - get All user detail
router.get("/", getAllUsers);

//getProfile - get current logged user detail
router.get("/profile", verifyUser, getProfile); 

//search user by id
router.get("/find/:id", searchUser);

//update user details
router.put("/update/user-details", verifyUser, updateUserDetails);

//update user password
router.put("/update/user-password", verifyUser, updateUserPassword);

//delete user Account
router.delete("/delete", verifyUser, deleteUser);

/**
 * sub/unsub a user/channel
 * like/dislike a video
 */

//sub channel
router.put("/sub/:uid", verifyUser, subscribe);

//unsub channel
router.put("/unsub/:uid", verifyUser, unsubscribe);

//like a vid
router.put("/like/:vid", verifyUser, like);

//dislike a vid
router.put("/dislike/:vid", verifyUser, dislike);

export default router;
