var express = require('express');
var router = express.Router();
module.exports = function(app, Clubs){
  app.post('/join-form', async (req,res)=>{
    console.log(req.body.id+"");
  })
  .get('/', function (req, res) {
     // res.sendFile(__dirname + '/views/index.html');
     Clubs.find({}).sort({date:-1}).exec(function(err, rawContents){
       if(err) throw err;
         if(req.session.logined) {
          res.render('index', {contents: rawContents, id: req.session.user_id });
         } else {
          res.render('index', {contents: rawContents, id: false});
         }
      });
  })
  .get('/:page', function (req, res) {
    const page = req.params.page;
    if(page == 'index') res.redirect('/');
    Clubs.find({}).sort({date:0}).exec(function(err, rawContents){
      if(err) throw err;
        if(req.session.logined) {
         res.render(page + '', {contents: rawContents, id: req.session.user_id });
        } else {
          res.render(page + '', {contents: rawContents, id: false});
        }
     });
  });
}
