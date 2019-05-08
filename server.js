const express = require('express');
const multer = require('multer');

const app = express();

app.use(express.static(__dirname));

app.post('/upload', fileUploadMiddleware, (req, res) => {
  console.log('file', req.file);
  console.log(req.file.buffer.toString());
  console.log('body', req.body);
  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log('Server started');
});

function fileUploadMiddleware(req, res, next) {
  multer().single('myfile')(req, res, (error) => {
    if (error instanceof multer.MulterError) {
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
