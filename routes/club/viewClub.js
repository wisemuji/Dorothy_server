module.exports = (app, Clubs, Users, rndstring)=>{
  app.get('/leader_view', async (req,res)=>{
    const club = await Clubs.findOne({token: req.session.club});
    if(!club)
    	res.send('<script type="text/javascript">alert("권한이 없습니다."); history.back();</script>');
    else {
       res.render('leader_view', {item: club, id: req.session.user_id });
       console.log(club.name);
    }
  })
  .get('/view/:token', async (req,res)=>{
      const token = req.params.token;
      const club = await Clubs.findOne({token: token});
        if(req.session.logined) {
         res.render('student_view', {item: club, id: req.session.user_id });
        } else {
          res.render('student_view', {item: club});
        }

  })
  .post('/bb', async (req,res)=>{
    var result = await Clubs.find()
    res.status(200).json(result)

  })

};
