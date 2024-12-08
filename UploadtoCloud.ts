import {upload}  from 'cloudinary-react-native';
import { Cloudinary } from "@cloudinary/url-gen";

interface CloudinaryUploadOptions {
  file: string;
  uploadPreset?: string;
  folder?: string;
  unsigned?: boolean;
}
const uploadToCloudinary = async ({
  file, 
  uploadPreset = 'Bhumisutra',  // Your preset name
  folder = 'suspicious_reports',
  unsigned = true
}: CloudinaryUploadOptions): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    const cld = new Cloudinary({
      cloud: {
        cloudName: 'dvdc4aqv4'
      },
      url: {
        secure: true
      }
    });

    // Prepare upload options
    const options = {
      upload_preset: uploadPreset,
      folder: folder,
      unsigned: unsigned,
    };

    // Perform upload
    upload(
      cld, 
      {
        file: file,
        options: options,
        callback: (error: any, response: any) => {
          if (error) {
            console.error('Cloudinary Upload Error:', error);
            reject(error);
          } else {
            // Resolve with the secure URL of the uploaded image
            resolve(response?.secure_url || null);
          }
        }
      }
    );
  });
};

export default uploadToCloudinary;