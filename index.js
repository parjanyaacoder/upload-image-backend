const express = require('express');
const path = require('path');
const { getImagesHandler, uploadImageHandler } = require('./uploadImageHandler');

const app = express();
const port = process.argv[3] || 3000;

app.use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/getImages', async (req, res) => {
  console.log("Req", req)
  const {contents, location} = await getImagesHandler()
  if (contents !== null)
    res.status(200).json({
      location: location,
      contents: contents
  });
res.status(400)
});

app.post('/uploadImage', async (req, res) =>  {
  const { body } = req || {}
  if (body) {
  console.log("Req", req, body)
  const response = uploadImageHandler()
  res.status(200).json({
    message: "Image Uploaded Successfully",
    response: response
  })
 }
 else {
  res.status(400).json({error: "Invalid Request"})
 }
})

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
})