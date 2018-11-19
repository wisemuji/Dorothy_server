module.exports = (app, Clubs, rndstring)=>{
  app.get('/apply/:token', async (req,res)=>{
      const token = req.params.token;
      const club = await Clubs.findOne({token: token});
       res.render('form', {item: club});

  })
  app.post('/apply/:token', async (req,res)=>{
      const id = req.body.id;
      const name = req.body.name;
      const pr = req.body.pr;
      const reason = req.body.reason;
      const token = req.params.token;
      Clubs.findOne({token: token}, function(err, rawContent){
          if(err) throw err;

          rawContent.appliers.unshift({id: id, name: name, pr: pr, reason: reason});
          rawContent.save(function(err){
              if(err) throw err;
          });
      });
      res.redirect('/view/'+token);

  })

};
