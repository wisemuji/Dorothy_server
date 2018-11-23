module.exports = (app, Clubs)=>{
  app.get('/vertify/:token', async (req,res)=>{
    const club = await Clubs.findOne({token: req.session.club});
    console.log(req.session.club);
    if(!club)
    	res.send('<script type="text/javascript">alert("권한이 없습니다."); history.back();</script>');
    else {
      res.render('apply_view', {item: club, id: req.session.user_id });
    }
  })

  .get('/remove_applier/:token', async (req,res)=>{
    Clubs.updateOne( { 'appliers.token': req.params.token },
     { $pull: { appliers: { token: req.params.token } } } ,
      function (err, res) {
          if(err) console.log('2'+err);
      });
  	res.send('<script type="text/javascript">alert("삭제가 완료되었습니다.");history.back()</script>');
  });
}
