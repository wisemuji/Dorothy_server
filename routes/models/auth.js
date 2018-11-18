/*
  1xx 잠만기달려봐라
  2xx 잘응답했다 여기있어
  3xx 저리가
  4xx 클라가 잘못요청을 보넴
  5xx 서버 잘못했을 가능성이 큼
*/

module.exports = (router, Users, passport, to) =>{
  router.post('/signup', async (req, res) => {
      const data = req.body;
      const new_user = new Users(data);
      [e, result] = await to(new_user.save());
      if(e instanceof user_duplicate) return res.status(409).json({message:"already exist"});
      if(e instanceof ValidationError) return res.status(400).json({message: e.message});
      if(e instanceof paramsError) return res.status(400).json({message: e.message});
      res.status(200).json(new_user);
  })

  .get('/auto/:token', async(req, res)=>{
    var params = ['token'];
    const token = req.params.token;
    const user = await  Users.findOne({token: token}, {_id: 0, passwd: 0});
    if(user) return res.status(200).json({id: user.id, name: user.name, token: user.token});
    else return res.status(404).send("user not found");
  })

  //local auth
  .post('/signin', passport.authenticate('local'), (req,res)=>{
    res.status(200).json({message: "signin success"});
  })

  //social auth
  .get('/github/token', passport.authenticate('github-token'), async(req, res)=>{
    if (req.user) {
      const user = await Users.findOne({github_id: req.user._json.id}, {_id: 0});
      if(users) return res.status(200).send(users);
      else{
          var github_user = new Users({
            github_id: req.user._json.id,
            name: req.user._json.name,
            token: rndString.generate(),
          });
          [e,user] = await github_user.save();
          if(e instanceof user_duplicate) return res.status(409).json({message:"already exist"});
          if(e instanceof ValidationError) return res.status(400).json({message: e.message});
          if(e instanceof paramsError) return res.status(400).json({message: e.message});
        }
    }else res.status(401).send("unauthed");
  })

  .get('/fb/token', passport.authenticate('facebook-token'), async(req, res)=>{
    if (req.user) {
      const user = await Users.findOne({facebook_id: req.user.id}, {_id: 0});
      console.log(user);
      if(user) res.status(200).send(user);
      else{
          var facebook_user = new Users({
            facebook_id: req.user._json.id,
            name: req.user._json.name,
            token: rndString.generate(),
          });
          [e, result] = await github_user.save();
          if(e instanceof user_duplicate) return res.status(409).json({message:"already exist"});
          if(e instanceof ValidationError) return res.status(400).json({message: e.message});
          if(e instanceof paramsError) return res.status(400).json({message: e.message});
          return res.status(200).json({message: "success"});
        }
    } else  res.status(401).send("unauthed");
  })

  .get('/tw/token', passport.authenticate('twitter-token'), async(req, res) =>{
    if(req.user) {
      const user = await Users.findOne({twitter_id: req.user._json.id}, {_id: 0});
      if(users) res.status(200).send(users);
      else{
          var twitter_user = new Users({
            twitter_id: req.user._json.id,
            name: req.user._json.name
          });
          [e, result] = await twitter_user.save();
          if(e instanceof user_duplicate) return res.status(409).json({message:"already exist"});
          if(e instanceof ValidationError) return res.status(400).json({message: e.message});
          if(e instanceof paramsError) return res.status(400).json({message: e.message});
        }
    } else  res.status(401).send(req.user);
  })

  .post('/logout', (req, res)=>{
    req.logout();
    res.status(200).json({message: "logout success"});
  });

  return router;
}
