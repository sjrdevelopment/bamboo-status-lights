// web.js
var express = require("express");
var logfmt = require("logfmt");
var multipart = require('connect-multiparty');
var request = require('request');
var config = require('./config');
var sp = require("serialport");
var app = express();

var currentStatus;

app.use(logfmt.requestLogger());

app
.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', 'http://localhost');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
})
.options('*', function(req, res, next){
    res.end();
});

var passFailFlags = ['no state', 'pass', 'fail'];

var multipartMiddleware = multipart();
app.use(multipartMiddleware);


var serialPort = new sp.SerialPort("/dev/cu.usbmodem1451", {
   baudrate: 9600
 });

function getURLString() {
   return config.host;
}

function sendUpdatedStatus(status) {
  console.log('new build state');
  console.log(passFailFlags[status]);

  //send serial message to arduino via USB port
  serialPort.write(status+"\r", function(err, results) {

  });
}

setInterval(function () {
  request.get(getURLString(),
    {
     'auth': {
      'user': config.username,
      'pass': config.password,
      'sendImmediately': true
     },
     'headers': {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
     }
  }, function (error, response, body) {

    if (error) {
      console.log(error)
    } else {

      var objBody = {};

      try {
        objBody = JSON.parse(body);
      } catch (e) {
        console.log('issue with json response');
      }

      if (objBody) {
        if (objBody.results && objBody.results.result && objBody.results.result[0].state) {
          var status = objBody.results.result[0].state == 'Successful' ? 1 : 2;

          if (status !== currentStatus) {
            currentStatus = status;
            sendUpdatedStatus(currentStatus);
          }
        }
      }
    }
  });
}, 60000);







