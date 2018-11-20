const to = require("await-to-js");

module.exports = (app, Clubs, Users, rndstring)=>{
  app.post('/setClub', async (req,res)=>{
    console.log("post:setClub")
      const data = req.body;
      // if(!Clubs.findOne({token: data.token})){
      //   console.log("!Clubs.findOne")
      //   console.log(data.token)
      // } else {
      //   console.log(Clubs.findOne({token: data.token}).token)
        // const club = new Clubs(data);
        // await to(club.save());
      Clubs.findOneAndUpdate({token: data.token}, data, {upsert:true, new: true},
    function (err, res) {
    });
      // }
      res.redirect("/");
  })
  .post('/deleteClubAll', async (req,res)=>{
      Clubs.remove({}, function(err) {
            if (err) {
                console.log(err)
            } else {
                res.end('success');
            }
          }
      );
    })
  .post('/deleteClub', async (req,res)=>{
      Clubs.remove({token: req.body.token}, function(err) {
            if (err) {
                console.log(err)
            } else {
                res.end('success');
            }
          }
      );
    })

};
