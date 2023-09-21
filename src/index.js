const express = require('express');
import configViewEngine from './configs/configsViewEngine';
import initWebRoute from './views/web';
const bodyParser = require('body-parser');

const app = express();
const port = 4040

app.use(bodyParser.json());

configViewEngine(app);

// view enginer
configViewEngine(app)

// router 
initWebRoute(app)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})