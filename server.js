const express = require('express');

const app = express();

app.use(express.static(__dirname));

app.post('/upload', (req, res) => {
  console.log(req.body);
  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log('Server started');
});
