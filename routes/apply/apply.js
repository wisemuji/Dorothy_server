module.exports = (app, Clubs, rndstring)=>{
  app.get('/apply/:token', async (req,res)=>{
      const token = req.params.token;
      const club = await Clubs.findOne({token: token});
        if(req.session.logined) {
         res.render('form', {item: club, id: req.session.user_id||req.session.email });
        } else {
          res.send('<script type="text/javascript">alert("로그인이 필요합니다."); history.back();</script>');
        }

  })
  .post('/apply/:token', async (req,res)=>{
      const email = req.session.email;
      const id = req.body.id;
      const name = req.body.name;
      const pr = req.body.pr;
      const reason = req.body.reason;
      const token = rndstring.generate(40);
      Clubs.findOne({token: req.params.token}, function(err, rawContent){
          if(err) throw err;

          rawContent.appliers.unshift({ email: email, id: id, name: name, pr: pr, reason: reason, token: token });
          rawContent.save(function(err){
              if(err) throw err;
          });
      });
    	res.send('<script type="text/javascript">alert("신청이 완료되었습니다."); history.back();</script>');

  })

};
