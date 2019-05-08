module.exports = (app, Clubs, Appliers, rndstring)=>{
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
      const user = await Appliers.find( { email: email } );
      const phone = user[0].phone;
      console.log(user);
      console.log(phone);
      const id = req.body.id;
      const name = req.body.name;
      const pr = req.body.pr;
      const reason = req.body.reason;
      const token = rndstring.generate(40);
      Clubs.findOne({token: req.params.token}, function(err, rawContent){
          if(err) throw err;
          rawContent.appliers.unshift({ email: email, phone: phone, id: id, name: name, pr: pr, reason: reason, token: token });
          rawContent.save(function(err){
              if(err) throw err;
          });
      });
    	res.send('<script type="text/javascript">alert("신청이 완료되었습니다."); location.href = "/";</script>');

  })

};
