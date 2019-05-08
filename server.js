const express = require('express');
const multer = require('multer');

const app = express();

app.use(express.static(__dirname));

app.post('/upload', multer().single('myfile'), (req, res) => {
  console.log('file', req.file);
  console.log(req.file.buffer.toString());
  console.log('body', req.body);
  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log('Server started');
});
