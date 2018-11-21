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

});
}
