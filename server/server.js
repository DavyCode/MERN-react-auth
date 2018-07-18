const 
    express = require('express'),
    http = require('http'),
    fs = require('fs'),
    path = require('path'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    chalk = require('chalk'),
    cors = require('cors'),
    config = require('../config'),
    container = require('./container'),
    PORT = process.env.PORT || config.Port;
   



container.resolve(function(auth) {
  //DB connection
  require('./models').connect(config.mongoURI, { useMongoClient: true })

  const app = SetupExpress();
  /**********
   * setup express
   * ************/
  function SetupExpress() {
    const 
        app = express(),
        server = http.createServer(app);

    server.listen(PORT, () => {
      console.log(chalk.bold.yellow(`Server running on port ${PORT}`))
    });
    
    ConfigureExpress(app);

    const router = require('express-promise-router')();
    auth.SetRouting(router);

    app.use(router)
  }


  function ConfigureExpress(app) {
    require('./services/passport-local');
    require('./services/passport-jwt')
    // create a write stream (in append mode)
    var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})
    
    app.use(morgan('combined', 
      // { stream: accessLogStream}
    ))
    app.use(cors());


    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use(passport.initialize());
  }

})