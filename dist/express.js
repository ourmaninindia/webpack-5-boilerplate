'use strict';

const express         = require('express');
const path            = require('path');
const XMLHttpRequest  = require("xmlhttprequest").XMLHttpRequest;

const bodyParser  = require('body-parser');
const axios       = require('axios');
const env         = require('dotenv').config();
const {check, validationResult} = require('express-validator');
const flash             = require('connect-flash');
const session           = require('express-session');
const passport          = require('passport');

// Settings
const PORT  = 3000;
const HOST  = '0.0.0.0';

// HTML Directory of statuc resources ./html (for testing only)
const htmlDirectory = path.join(__dirname, 'html');

// Server config
const app = express();

// Host static resources for the root files
app.use('/', express.static(htmlDirectory));
app.use('/', express.json({limit: '1mb'}));

// ./api - Host server api requests for the server
app.get('/api', (req, res) => {
  res.send('./api works. Try <a href="/api/getMessage">/api/getMessage</a>');
});

// ./api/getMessage - Endpoint to serve some json
app.get('/api/getMessage', (req, res) => {
  res.json({ message: 'The board is green!' });
});

app.post('/api/login', (req, res) => {
  
  console.log(req.body);

  var message;

  var data = JSON.stringify({
    "fields":["AdmUsers_id"],
    "orders":["uid"],
    "table":"dbo.admusers",
    "where":"uid="+req.body.email
    });

  var xhr = new XMLHttpRequest();
  //xhr.withCredentials = true;

  //var url   = 'https://regres.in/api/users/2'

  

  xhr.open("POST", "http://192.168.0.10:5100/db/getRecord");
  //xhr.open('GET', url);

console.log('test 2');

  //xhr.setRequestHeader("Content-Type", "application/json");
  //xhr.responseType = 'json'

 

xhr.onreadystatechange = function() {
    if (this.readyState == 4 ) {
       
       console.log( xhr.responseText );
    } else {
      console.log('no response')
    }
};

  xhr.send(null);
console.log('test 3');

  //res.json({
  //  message: 'collect data from the db! '+message,
  //  email: req.body.email
 // });
});

app.listen(PORT, HOST);

// Debugging
console.log(`HTML directory is ${htmlDirectory}`);
console.log(`Express is running on http://${HOST}:${PORT}`);