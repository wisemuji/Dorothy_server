module.exports = (app, Clubs, Users, rndstring)=>{
  app.get('/leader_view', async (req,res)=>{
    const user = await Users.findOne({id: req.session.user_id});
    const club = await Clubs.findOne({token: req.session.club});
    console.log(req.session.club);
    if(!user)
    	res.send('<script type="text/javascript">alert("권한이 없습니다."); history.back();</script>');
    else {
      if(!club){
        const new_club = new Clubs;
        new_club.token = req.session.club;
        res.render('leader_view', {item: new_club, id: req.session.user_id,  email: null });
      }
      else{
        res.render('leader_view', {item: club, id: req.session.user_id, email: null });
     }
    }
  })
  .get('/root_view', async (req,res)=>{
    res.render('root', {id: req.session.user_id });
  })
  .get('/view/:token', async (req,res)=>{
      const token = req.params.token;
      const club = await Clubs.findOne({token: token});
        if(req.session.logined) {
          if(req.session.user_id == 'root'){
            res.render('leader_view', {item: club, id: req.session.user_id, email: null });
          }
          res.render('student_view', {item: club, id: req.session.user_id||req.session.email , email: req.session.email  });
        } else {
          res.render('student_view', {item: club, id: false});
        }

  })
  .post('/bb', async (req,res)=>{
    var result = await Clubs.find()
    res.status(200).json(result)

  });

};
