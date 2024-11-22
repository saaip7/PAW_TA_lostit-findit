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

module.exports = {
  uploadImage
};