module.exports = (app, Clubs)=>{
  app.get('/vertify/:token', async (req,res)=>{
    const club = await Clubs.findOne({token: req.session.club});
    console.log(req.session.club);
    if(!club)
    	res.send('<script type="text/javascript">alert("권한이 없습니다."); history.back();</script>');
    else {
      console.log('club');
      res.render('apply_view', {item: club, id: req.session.user_id });
    }

  })

  .get('/remove_applier/:token', async (req,res)=>{
    console.log('token: '+req.params.token);
    Clubs.updateOne( { 'appliers.token': req.params.token },
     { $pull: { appliers: { token: req.params.token } } } ,
      function (err, res) {
          if(err) console.log('2'+err);
      });
  	res.send('<script type="text/javascript">alert("삭제가 완료되었습니다.");history.back()</script>');
  })

  // .get('/vertify/:token/find_applier/:find', async (req,res)=>{
  //   console.log('token: '+req.params.token);
  //     Clubs.findOne({ token: req.session.club, appliers: { $elemMatch: { id: req.params.find}}}, function(err, result){
  //       console.log(req.session.club + ', ' + req.params.find);
  //       if(err) return res.status(500).json({error: err});
  //       if(!result) return res.send('<script type="text/javascript">alert("찾는 신청자가 없습니다.");history.back()</script>');
  //       console.log(result);
  //       res.render('apply_view', {item: result, id: req.session.user_id });
  //     });
  // });
}
