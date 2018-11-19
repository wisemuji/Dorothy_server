import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/dorothy', { useNewUrlParser: true }).then(() => {
console.log("Connected to Database");
}).catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
});
mongoose.Promise = global.Promise;

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () { console.log("Mongo On"); });

var UsersSchema = mongoose.Schema({
  id: {type : String}, //아이디
  passwd: {type : String}, //비밀번호
  club: {type : String}, //소속 동아리
  token : {type : String} //user token
});

var ClubSchema = mongoose.Schema({
  img: {type : String}, //활동 사진
  name: {type : String}, //동아리 이름
  introduction: {type : String}, //소개
  goal: {type : String}, //목표
  activity: {type : String}, //활동 내용
  reason: {type : String}, //지원해야 하는 이유
  etc: {type : String}, //기타 공지
  date: {type: Date, default: Date.now}, //수정 날짜
  token : {type : String}, //club token
  appliers : [{
    id: {type : Number}, //학번
    name: {type : String}, //이름
    pr: {type : String}, //자기소개
    reason: {type : String}, //신청이유
    club: {type : String}, //신청 동아리
    token : {type : String} //applier token
  }]
});

require('./err')(UsersSchema, ClubSchema);

var Users = mongoose.model("users", UsersSchema);
var Clubs = mongoose.model("clubs", ClubSchema);

export {Users, Clubs};

export default db;
