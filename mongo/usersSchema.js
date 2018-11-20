const mongoose = require("mongoose");

var UsersSchema = mongoose.Schema({
  id: {type : String}, //아이디
  passwd: {type : String}, //비밀번호
  club: {type : String}, //소속 동아리
  token : {type : String} //user token
});

require('./err')(UsersSchema);
module.exports =  mongoose.model("users", UsersSchema);
