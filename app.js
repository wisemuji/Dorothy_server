const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const cloudinary = require("cloudinary");
const rndstring = require("randomstring");

//서버 생성
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  limit: '1gb',
  extended: false
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.cookieParser());
app.use(express.session({
  key: 'sid', // 세션키
  secret: 'secret', // 비밀키
  cookie: {
    maxAge: 1000 * 60 * 60 * 2 // 쿠키 유효기간 2시간
  }
}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//module setting
var Users = require("./mongo/usersSchema");
var Clubs = require("./mongo/clubsSchema");
var Appliers = require("./mongo/appliersSchema");
var Confirm = require("./mongo/confirmSchema");
const db = require("./mongo");

//서버 실행
const PORT = process.env.PORT || 5000;
app.listen(PORT, function(){
  console.log('server running');
});

require('./routes/auth/auth')(app, Users, Appliers, rndstring);
require('./routes/auth/mail')(app, Confirm);
require('./routes/auth/phone')(app, Confirm);
require('./routes/club/viewClub')(app, Clubs, Users, rndstring);
require('./routes/club/setClub')(app, Clubs, Users, rndstring);
require('./routes/apply/apply')(app, Clubs, rndstring);
require('./routes/apply/vertify')(app, Clubs);
require('./routes/index')(app, Clubs);
