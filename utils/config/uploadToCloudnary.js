const cloudinary = require("./cloudnaryConfig");

const uploadToCloudnary = async (buffer, folder) => {
  try {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: "auto",
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            return reject(error);
          }
          console.log("Cloudinary upload success:", result);
          return resolve(result);
        }
      );
      uploadStream.end(buffer);
    });
  } catch (error) {
    console.error("Upload to Cloudinary failed:", error);
    throw error;
  }
};

module.exports= uploadToCloudnary