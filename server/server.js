const appcfg = require('./appcfg');
const express = require("express");
const bodyParser = require('body-parser');

const port = appcfg.webPort;
const app = express();

app.use(bodyParser.json());
app.use(express.static(appcfg.Project_Root));

// Сохранение результатов игры
app.post('/api/results', (req, res) => 
{
  const { playerName, score, time, clicks } = req.body;  

  console.log('Received game result:', { playerName, score, time, clicks });
  
  res.status(200).json({ success: true });
});

app.all('/', (req, res) => {
  res.status(200).sendFile('/', {root: appcfg.Project_Root});
});

app.listen(port, () => {
  console.log("Node Express server is listening on http://localhost:" + port);
});