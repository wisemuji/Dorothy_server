import to from 'await-to-js';

module.exports = (app, Clubs, Users, rndstring)=>{
  app.post('/setClub', async (req,res)=>{
    console.log("post:setClub")
      const data = req.body;
      Clubs.findOneAndUpdate({'token': data.token}, data, {upsert:true});
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
