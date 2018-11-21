const mongoose = require("mongoose");

var ClubSchema = mongoose.Schema({
  images: [{
    id: {type : String}, //id
    url: {type : String} //url
  }], //활동 사진
  name: {type : String}, //동아리 이름
  introduction: {type : String}, //소개
  goal: {type : String}, //목표
  activity: {type : String}, //활동 내용
  reason: {type : String}, //지원해야 하는 이유
  etc: {type : String}, //기타 공지
  date: {type: Date, default: Date.now}, //수정 날짜
  interview_date: {type: Date}, //면접 날짜
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
require('./err')(ClubSchema);
module.exports =  mongoose.model("clubs", ClubSchema);
