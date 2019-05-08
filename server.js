const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: 'http://localhost:8000',
}))

app.post('/upload', (req, res) => {
  console.log(req.body);
  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log('Server started');
});
