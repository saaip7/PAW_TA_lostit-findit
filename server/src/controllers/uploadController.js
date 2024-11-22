const cloudinary = require('../config/cloudinary');

const uploadImage = async (req, res) => {
  try {
    if (!req.files || !req.files.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const file = req.files.file;
    
    // Upload to Cloudinary with transformation options matching the display dimensions
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: 'lost-found',
      resource_type: 'auto',
      transformation: [
        { quality: "auto" }, // Optimize quality
        { fetch_format: "auto" } // Automatically choose best format
      ]
    });

    // Generate optimized URL
    const imageUrl = cloudinary.url(result.public_id, {
      secure: true,
      transformation: [
        { quality: "auto" },
        { fetch_format: "auto" }
      ]
    });

    res.json({
      imageUrl: imageUrl,
      public_id: result.public_id
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Error uploading file' });
  }
};

const deleteImage = async (req, res) => {
  try {
    const { public_id } = req.body;
    
    if (!public_id) {
      return res.status(400).json({ message: 'No public_id provided' });
    }

    // Clean the public_id by removing query parameters
    const cleanPublicId = public_id.split('?')[0];
    
    console.log('Attempting to delete image with public_id:', cleanPublicId);

    // Delete the image using the API method
    const result = await cloudinary.uploader.destroy(cleanPublicId, {
      invalidate: true,
      resource_type: 'image'
    });

    console.log('Cloudinary deletion response:', result);

    if (result && result.result === 'ok') {
      res.json({ 
        message: 'Image deleted successfully',
        result: result
      });
    } else {
      console.error('Unexpected Cloudinary response:', result);
      throw new Error(`Failed to delete image from Cloudinary: ${JSON.stringify(result)}`);
    }
  } catch (error) {
    console.error('Delete error details:', {
      message: error.message,
      details: error.response?.data,
      publicId: req.body.public_id
    });
    
    res.status(500).json({ 
      message: 'Error deleting file',
      error: error.message,
      details: error.response?.data,
      publicId: req.body.public_id
    });
  }
};


module.exports = {
  uploadImage,
  deleteImage
};