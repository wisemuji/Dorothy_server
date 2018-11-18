import express from 'express'
import bodyParser from 'body-parser'
import rndstring from 'randomstring'
import path from 'path'
import mongoose from 'mongoose'
import firebase from 'firebase'
//서버 생성
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  limit: '1gb',
  extended: false
}));

app.use(express.static(path.join(__dirname, 'public')));

//module setting
import { Users, Clubs, Appliers } from './mongo';
//module setting
// import { Users, Hackathons } from './mongo';
// require('./func')
// let passport = require('./passport')(Users, rndstring);
//
// //라우터
// // let auth = require('./routes/auth/auth')(app);
// // app.use('/', auth);
// // var router = require('./routes')(app, Users);
// app.post('/test', function(req, res){
//   console.log(req.body);
// });

app.get('/', function (req, res) {
   res.sendFile(__dirname + '/index.html');
});
app.get('/:page', function (req, res) {
  const page = req.params.page;
  if(page.indexOf('.html') == -1)
    res.sendFile(__dirname + '/' + page + '.html');
  else
   res.sendFile(__dirname + '/' + page);
});
//서버 실행
const PORT = 9999;
app.listen(PORT, function(){
  console.log('server running');
});

require('./routes/index')(app);
require('./routes/auth/auth')(app, Users, rndstring);
