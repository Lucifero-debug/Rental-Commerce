// src/app/api/cloudinary/route.js
import axios from 'axios';

// Disable body parsing, as we want to handle it manually
export const config = {
  api: {
    bodyParser: false,
  },
};

// Handle the upload
export async function POST(req) {
  // Read the raw body as FormData
  const formData = await req.formData();

  
  // Get the file from the FormData
  const file = formData.get('file');
  const data = new FormData();
  data.append('file', file); // Append the file to FormData
  data.append('upload_preset', 'hashing');

  try {
    const uploadResponse = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      data, 
      {
        headers: {
          'Content-Type': 'multipart/form-data', // Set content type to multipart/form-data
        },
      }
    );
    const imageUrl = uploadResponse.data.secure_url; // Get the image URL from Cloudinary's response
    return new Response(JSON.stringify({ url: imageUrl }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (uploadError) {
    return new Response(JSON.stringify({ error: 'Upload to Cloudinary failed', details: uploadError.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
