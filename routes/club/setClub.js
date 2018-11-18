import to from 'await-to-js';

module.exports = (app, Clubs, Users, rndstring)=>{
  app.post('/setClub', async (req,res)=>{
    console.log("post:setClub")
      const data = req.body;
      Clubs.findOne({'name': data.name}, function(err, user) {
            if (err) return res.status(400).json({message: e.message});
            if (user) {
                return res.status(409).json({message:"already exist"});
              }
            });
      const club = new Clubs(data);
      club.token = rndstring.generate(25);
      await to(club.save());
      res.status(200).json(club);
  })

};
