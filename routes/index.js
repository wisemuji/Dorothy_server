var express = require('express');
var router = express.Router();
module.exports = function(app){
  app.post('/join-form', async (req,res)=>{
    console.log(req.body.id+"");
  })
}
