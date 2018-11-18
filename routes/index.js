var express = require('express');
var router = express.Router();
module.exports = function(app){
    app.get('/', function (req, res) {
       res.sendFile(__dirname + '/index.html');
    });
    app.get('/index', function (req, res) {
       res.sendFile(__dirname + '/index.html');
    });
    app.get('/login', function (req, res) {
       res.sendFile(__dirname + '/login.html');
    });

}
