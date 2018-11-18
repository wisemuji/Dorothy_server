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
      res.redirect("/");
  })
  .post('/deleteClub', async (req,res)=>{
      Clubs.remove({}, function(err) {
            if (err) {
                console.log(err)
            } else {
                res.end('success');
            }
          }
      );
    })

};
