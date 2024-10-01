import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { type } from "os";
import { configDotenv } from "dotenv";

configDotenv();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (localFilePath) => {
  try {
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    fs.unlinkSync(localFilePath);
    // console.log(
    //   `cloudinaryResponse: ${JSON.stringify(response)} (search response.url)`
    // );

    return response;
  } catch (error) {
    console.log(error);
  }
};

//sample cloudinary response
// const resss = {
//   asset_id: "a618dbf8610fca6980s9d8fa0se416e894",
//   public_id: "fioj93zou3iasd9f0aylq",
//   version: 1723882882,
//   version_id: "fa766c325c2e27d09248fef106ede5",
//   signature: "7f6094522cd2e27fd3153bb292ce186ae7174",
//   width: 1080,
//   height: 360,
//   format: "jpg",
//   resource_type: "image",
//   created_at: "2024-08-17T08:21:22Z",
//   tags: [],
//   bytes: 80010,
//   type: "upload",
//   etag: "d174eaea2746awe0r8w9e890wfc8e5e51",
//   placeholder: false,
//   url: "http://res.cloudinary.com/dglr3zicv/image/upload/v1723882882/fioj93zou3ij0xwciylq.jpg",
//   secure_url:
//     "https://res.cloudinary.com/dglr3zicv/image/upload/v1723882882/fioj93zou3ij0xwciylq.jpg",
//   folder: "",
//   original_filename: "change_is_only_constant",
//   api_key: "6969696969",
// };
