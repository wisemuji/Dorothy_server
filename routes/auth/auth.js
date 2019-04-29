const nodemailer = require('nodemailer');
const config = require('../../config.js');

module.exports = (app, Users, rndstring)=>{
  app.post('/signup', async(req,res)=>{
    var user = new Users(req.body);
    user.token = rndstring.generate(40);
    user.club = rndstring.generate(40);
    try {
      var result = await user.save();
    }catch(e){
      if(e instanceof user_duplicate) return res.status(409).json({message:"already exist"});
      if(e instanceof ValidationError) return res.status(400).json({message: e.message});
      if(e instanceof paramsError) return res.status(400).json({message: e.message});
    }
    res.redirect("/");
  })
  .post('/signin', async(req,res)=>{
    var result = await Users.findOne(req.body)
    if(!result) {
    	res.send('<script type="text/javascript">alert("아이디 혹은 비밀번호가 맞지 않습니다."); history.back();</script>');
    }
    else{
      req.session.logined = true;
      req.session.user_id = result.id;
      req.session.club = result.club;
      res.redirect("/");
    }
  })
  .post('/delUser', async (req,res)=>{
    var result = await Users.deleteOne({token : req.body.token});
    if(!result.ok) return res.status(500).json({message : "ERR!"})
    else return res.status(200).json({message : "success!"})
  })
  .post('/aa', async(req,res)=>{
    var result = await Users.find()
    res.send(result)
  })
  .get('/logout', (req, res) => {
    req.session.destroy();
    res.clearCookie('sid');
    res.redirect('/');
  });

};

