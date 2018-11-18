module.exports = (app, Clubs, Users, rndstring)=>{
  app.get('/view/:token', async (req,res)=>{
      const token = req.params.token;
      const club = await Clubs.findOne({token: token});
       res.render('student_view', {item: club});

  })

};
