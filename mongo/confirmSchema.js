const mongoose = require("mongoose");

var ConfirmSchema = mongoose.Schema({
  email: {type : String}, //이메일
  email_token : {type : String}, //이메일 token
  phone: {type : String}, //휴대폰
  phone_token : {type : String} //휴대폰 token
});

require('./err')(ConfirmSchema);
module.exports =  mongoose.model("confirm", ConfirmSchema);
