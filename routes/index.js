var express = require('express');
var router = express.Router();
module.exports = function(app, Clubs){
  app.get('/', function (req, res) {
     Clubs.find({}).sort({date:-1}).exec(function(err, rawContents){ //오래된 순으로 정렬
       if(err) throw err;
         if(req.session.logined) {
          res.render('index', {contents: rawContents, id: req.session.user_id||req.session.email });
         } else {
          res.render('index', {contents: rawContents, id: false});
         }
      });
  })
  .get('/:page', function (req, res) {
    const page = req.params.page;
    console.log(page);
    if(page == 'index') res.redirect('/');
    else if(!page.includes('form')&&!page.includes('apply_view')&&!page.includes('join')&&!page.includes('leader_view')&&!page.includes('login')&&!page.includes('root')&&!page.includes('student_view')) return;
    Clubs.find({}).sort({date:0}).exec(function(err, rawContents){
      if(err) throw err;
        if(req.session.logined) {
         res.render(page + '', {contents: rawContents, id: req.session.user_id||req.session.email });
        } else {
          res.render(page + '', {contents: rawContents, id: false});
        }
     });
  });
}
