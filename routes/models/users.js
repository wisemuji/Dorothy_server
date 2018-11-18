module.exports = (router, Users)=>{

  router.get('/profile', async (req, res)=>{
    const user = await Users.findOne(req.user);
    if(user) return res.status(200).json(user);
    else return res.status(404).json({message: "user not found"});
  })
  .get('/', async (req, res)=>{
    console.log("asdf");
    if(req.user.is_admin){
      var users = await Users.find();
      res.status(200).json(users);
    }else return res.sendStatus(404);
  })
  .get('/:id', isAuth, async (req, res)=>{
    if(req.user.is_admin) {
      const id = req.params.id;
      var user = await Users.findOne({id: id}, {_id: 0, passwd: 0});
      if(user) return res.status(200).json( {id: user.id, name: user.name, token: user.token, is_admin: user.is_admin} );
      else return res.status(404).send("user not found");
    } else
      return res.status(403).send("Permission denied!");
  })
  .put('/:id', (req, res)=>{

  })
  .patch('/admin/:id', isAuth, async (req, res)=>{
    if(req.user.is_admin){
      const id = req.params.id;
      var user = await Users.findOne({id: id});
      try{
        var result = await Users.update(user, {$set: {is_admin: !user.is_admin}})
      }catch(e){

      }
    }else return res.status(403).send("excess denied");
  })
  .delete('/', async (req, res)=>{
    if(req.user.is_admin){
      var user = req.body.id;
      var result = await Users.remove(user);
      if(result) res.status(200).json({message: "success"});
      else res.status(500).json({message: "server err"});
    }else{
      var result = await Users.remove(req.user);
      if(result) {
        req.logout();
        res.status(200).json({message: "success"});
      }
      else res.status(500).json({message: "server err"});
    }
  });

  return router;
}
