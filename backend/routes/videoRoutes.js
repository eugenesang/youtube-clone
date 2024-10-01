import { Router } from "express";
import { verifyUser } from "../Middlewares/verifyUser.js";
import { upload } from "../Middlewares/multerMiddleware.js";
import {
  getVideo,
  addVideo,
  updateVideo,
  deleteVideo,
} from "../controller/videoController.js";
const router = Router();

router.get("/:id", getVideo);

router.post(
  "/upload",
  verifyUser,
  upload.fields([
    {
      name: "video",
      maxCount: 1,
    },
    {
      name: "thumbnail",
      maxCount: 1,
    },
  ]),
  addVideo
);

router.put("/:id", upload.single("thumbnail"), updateVideo); //title, desc,

router.delete("/:id", verifyUser, deleteVideo);

export default router;
