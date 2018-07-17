const 
    express = require('express'),
    http = require('http'),
    bodyParser = require('body-parser'),
    config = require('../config'),
    PORT = config.Port,
    app = express();

server = http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));



server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})