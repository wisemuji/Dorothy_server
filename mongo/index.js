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
  email: {type: String}, //이메일(아이디)
  passwd: {type: String}, //비밀번호
  name: {type: String}, //이름
  token : {type : String}, // 소셜 로그인 시 사용될 토큰 혹은 자동로그인.
  profile_img: {type: String}, // 프로필 사진, url을 넣어주면됨
  school: {type: String}, //학교
  fields: [{
    type: String,
    enum : ['app','vr','game','iot','etc'],
    default: 'etc'
  }], //관심 분야
  jobs: [{
    type: String,
    enum : ['pm','developer','designer','etc'],
    default: 'etc'
  }], //직군
  skill_set: {type: String}, //스킬셋
  github: {type: String}, //깃허브 주소
  favorites: [{
    type: String //즐겨찾기한 해커톤 - 토큰으로 저장
  }],
  attendance: [{
    type: String //참가했던 해커톤 - 토큰으로 저장
  }]
});

var ClubSchema = mongoose.Schema({
  start_day: { type: Date, default: Date.now }, //행사 시작하는 날짜
  end_day: { type: Date, default: Date.now }, //행사 끝나는 날짜
  start_apply: { type: Date, default: Date.now }, //신청 시작하는 날짜
  end_apply: { type: Date, default: Date.now }, //신청 끝나는 날짜
  host: { type: String }, //주최
  token : {type : String}, //해커톤 토큰
  location: { type: String }, //행사 장소
  summary: { type: String }, //행사 개요
  field: { type: String }, //관심 분야
  views: { type: Number } //조회수
});

require('./err')(UsersSchema, ClubSchema);

var Users = mongoose.model("users", UsersSchema);
var Clubs = mongoose.model("clubs", ClubSchema);

export {Users, Clubs};

export default db;
