const mongoose = require("mongoose");

var AppliersSchema = mongoose.Schema({
  email: {type : String}, //이메일
  phone: {type : String}, //휴대폰
  passwd: {type : String}, //비밀번호
  applied_clubs: [{
    token : String
  }], //소속 동아리
  token : {type : String} //user token
});

require('./err')(AppliersSchema);
module.exports =  mongoose.model("appliers", AppliersSchema);
