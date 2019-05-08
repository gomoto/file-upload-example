const express = require('express');
const multer = require('multer');

const app = express();

app.use(express.static(__dirname));

// multer middleware adds file to request object
app.post('/upload', fileUploadMiddleware, (req, res) => {
  // print file information
  console.log('file content:', req.file.buffer.toString());
  console.log('file details:', req.file);
  console.log('body details:', req.body);
  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log('Server started');
});

function fileUploadMiddleware(req, res, next) {
  // The default multer storage engine buffers the file.
  // To stream the file, create a custom storage engine:
  // https://github.com/expressjs/multer/blob/32ec11698624d4ebd6edb037f4a520c0fa323548/StorageEngine.md
  multer().single('myfile')(req, res, (error) => {
    if (error instanceof multer.MulterError) {
      // multer throws and error when FormData name does not match expected name (myfile)
      console.error('A Multer error occurred when uploading', error);
      res.sendStatus(500);
    } else if (error) {
      console.error('An unknown error occurred when uploading', error);
      res.sendStatus(500);
    } else {
      next();
    }
  });
}
