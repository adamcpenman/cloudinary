const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const photos = [];

const resolvers = {
  Query: {
    allPhotos() {
      return photos;
    },
  },
  Mutation: {
    async uploadPhoto(parent, { photo }) {
      const { filename, createReadStream } = await photo;

      try {
        const result = await new Promise((resolve, reject) => {
          createReadStream().pipe(
            cloudinary.uploader.upload_stream((error, result) => {
              if (error) {
                reject(error);
              }

              resolve(result);
            })
          );
        });

        const newPhoto = { filename, path: result.secure_url };
        console.log(newPhoto);
        // photos.push(newPhoto);
        return newPhoto;
      } catch (err) {
        console.log(err);
      }
    },
  },
};

module.exports = resolvers;
