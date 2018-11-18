module.exports = (app, Clubs, Users, rndstring)=>{
  app.get('/club/:token', async (req,res)=>{
      const token = req.params.token;
      const club = await Clubs.findOne({token: token});

  })

};
