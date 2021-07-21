import multer from "multer";
import { v2 } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});
const storage = new CloudinaryStorage({
  cloudinary: v2,
  folder: "uploads",
  allowedFormats: ["jpg", "png", "pdf"],
  quality_analysis: true,
  transformation: [{
    width: "315", crop: "fill", gravity: "faces", radius: 50, effect: "saturation:50", height: "250"
  }]
});
const parser = multer({ storage });

export default parser;
