import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
  api_secret: process.env.CLOUDINARY_CLOUD_SECRATE,
});

const uploadOnCloudinary = async (localFilepath) => {
  try {
    if (!localFilepath) {
      console.log("No file path received");
      return null;
    }

    console.log("Uploading:", localFilepath);

    const response = await cloudinary.uploader.upload(localFilepath, {
      resource_type: "auto",
    });

    // console.log("File is uploaded on cloudinary", response);
    fs.unlinkSync(localFilepath); // delete temp file

    return response;
  } catch (error) {
    console.error("Cloudinary error:", error.message);
    fs.unlinkSync(localFilepath);
    return null;
  }
};

export { uploadOnCloudinary };
