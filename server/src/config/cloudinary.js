// Import the Cloudinary SDK v2
const cloudinary = require('cloudinary').v2;

// Load environment variables from .env file
require('dotenv').config();

// Check if all required Cloudinary credentials exist in environment variables
if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  throw new Error('Missing required Cloudinary environment variables');
}

try {
  // Configure the Cloudinary SDK with credentials
  // This setup is required before making any API calls
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
} catch (error) {
  // Log any configuration errors and re-throw
  console.error('Cloudinary configuration error:', error);
  throw error;
}

// Export the configured Cloudinary instance for use in other modules
module.exports = cloudinary;