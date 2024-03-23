"use server";
import cloudinary from 'cloudinary';

export const uploadImage = async(image:string) => {
    // function to upload image on cloudinary
    console.log('handling image')

    try{
      cloudinary.v2.config({
        cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
        api_key:process.env.CLOUDINARY_API_KEY,
        api_secret:process.env.CLOUDINARY_API_SECRET
      });

      const result = await cloudinary.v2.uploader.upload(image);

      return result.secure_url as string;
    } catch(error:any) {
      throw new Error('Failed to upload image in cloudinary! message: '+error.message)
    }
  }