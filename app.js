// const express = require('express');
// const bodyParser = require('body-parser');
// const cloudinary = require('cloudinary').v2;

// const upload = require('./multer');

// const fs = require('fs');

// const app = express();

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// app.get('/', (req, res) => {
//   res.send('hello world');
// });

// app.post('/upload-images', upload.array('image'), async (req, res) => {
//   const uploader = async (path) => await cloudinary.uploads(path, 'Images');

//   if (req.method === 'POST') {
//     const urls = [];

//     const files = req.files;

//     for (const file of files) {
//       const { path } = file;
//       //--unhandled-rejections=strict
//       const newPath = await uploader(path);

//       urls.push(newPath);

//       fs.unlinkSync(path);
//     }

//     res.status(200).json({ message: 'images uploaded', data: urls });
//   } else {
//     res.status(405).json({ error: 'Images not uploaded' });
//   }
// });

/// NEW CODE

// const express = require('express');
// const app = express();
// const cloudinary = require('cloudinary').v2;
// const bodyParser = require('body-parser');
// const dotenv = require('dotenv');
// const Datauri = require('datauri');

// dotenv.config();

// // body parser configuration
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// // cloudinary configuration
// cloudinary.config({
// cloud_name: process.env.CLOUD_NAME,
// api_key: process.env.CLOUDINARY_API_KEY,
// api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// app.get('/', (request, response) => {
//   response.json({ message: 'Hey! This is your server response!' });
// });

// // image upload API
// app.post('/image-upload', (request, response) => {
//   // collected image from a user
//   const data = {
//     image: request.body.image,
//     file: request.file,
//   };

//   // var dUri = new Datauri();
//   // dUri.format(path.extname('TEST').toString(), req.file.buffer);

//   // upload image here
//   cloudinary.uploader
//     .upload(data.file, data.image)
//     .then((result) => {
//       response.status(200).send({
//         message: 'success',
//         result,
//       });
//     })
//     .catch((error) => {
//       response.status(500).send({
//         message: 'failure',
//         error,
//       });
//     });
// });

// // exports.uploads = (file, folder) => {
// //   return new Promise((resolve) => {
// //     cloudinary.uploader.upload(
// //       file,
// //       (result) => {
// //         resolve({
// //           url: result.url,
// //           id: result.public_id,
// //         });
// //       },
// //       {
// //         resource_type: 'auto',
// //         folder: folder,
// //       }
// //     );
// //   });
// // };

// module.exports = app;

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () =>
//   console.log(`Server listening at http://localhost:${PORT}`)
// );

/// CODE BELOW WORKS

// const express = require('express');
// const cors = require('cors');
// const app = express();
// const dotenv = require('dotenv');

// app.use(cors());

// dotenv.config();

// // MULTER
// const multer = require('multer');

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     console.log(file);
//     cb(null, file.originalname);
//   },
// });
// 1;

// POST ROUTE
// app.post('/upload', (req, res, next) => {
//   const upload = multer({ storage }).single('picture');
//   upload(req, res, function (err) {
//     if (err) {
//       return res.send(err);
//     }

//     console.log('file uploaded to server');
//     console.log(req.file);

//     // SEND FILE TO CLOUDINARY
//     const cloudinary = require('cloudinary').v2;
//     cloudinary.config({
//       cloud_name: process.env.CLOUD_NAME,
//       api_key: process.env.CLOUDINARY_API_KEY,
//       api_secret: process.env.CLOUDINARY_API_SECRET,
//     });

//     const path = req.file.path;
//     const uniqueFilename = new Date().toISOString();

//     cloudinary.uploader.upload(
//       path,
//       { public_id: `blog/${uniqueFilename}`, tags: `blog` }, // directory and tags are optional
//       function (err, image) {
//         if (err) return res.send(err);
//         console.log('file uploaded to Cloudinary');

//         var fs = require('fs');
//         fs.unlinkSync(path);

//         res.json(image);
//       }
//     );
//   });
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () =>
//   console.log(`Server listening at http://localhost:${PORT}`)
// );

const { ApolloServer } = require('apollo-server');
require('dotenv').config();
const typeDefs = require('./schema');
const resolvers = require('./resolver');

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

//server.listen().then(({ url }) => console.log(`Server ready at ${url}`));

const PORT = process.env.PORT || 5000;

server.listen(PORT, () =>
  console.log(`Server listening at http://localhost:${PORT}`)
);
