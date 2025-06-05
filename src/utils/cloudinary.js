import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'


cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadCLoudinary = async (localFilePath) => {
    try {
        if (!localFilePath)
            return null
        cloudinary.v2.uploader.upload(localFilePath, {
            resource_type: "auto", 
        })
        console.log("File uploaded successfully to Cloudinary", response.url);
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath); // Delete the local file if upload fails
        return null;
    }
}

export { uploadCLoudinary };