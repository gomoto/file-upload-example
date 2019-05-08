const express = require('express');

const app = express();

app.use('/upload', (req, res) => {
  console.log(req);
  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log('Server started');
});
