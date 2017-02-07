import express from 'express';

const PORT = 8115;

let app = express();

app.get('/*', (req, res) => {
  res.send("Hello world");
})

app.listen(PORT, () => console.log(`Running on port ${PORT}`));