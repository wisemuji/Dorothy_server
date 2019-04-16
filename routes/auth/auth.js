const nodemailer = require('nodemailer');
const config = require('../../config.js');

sendMail(email, token =>{
  let email = req.body.email;
  console.log(email);

  let transporter = nodemailer.createTransport({
      service: config.service,
      auth: {
          user: config.user,  // gmail 계정 아이디를 입력
          pass: config.pass          // gmail 계정의 비밀번호를 입력
      }
  });

  let mailOptions = {
      from: 's2017s25@e-mirim.hs.kr',    // 발송 메일 주소 (위에서 작성한 gmail 계정 아이디)
      to: email ,                     // 수신 메일 주소
      subject: '미림 동아리 통합 관리 솔루션, 도로시입니다. ',   // 제목
      html: '<p>회원가입 완료를 위해 아래의 인증코드를 인증코드 입력란에 넣어주세요!</p>' +
    "<p>" + token + "</p>"
  };

  transporter.sendMail(mailOptions, function(error, info){
      if (error) {
          console.log(error);
      }
      else {
          console.log('Email sent: ' + info.response);
      }
  });

  res.redirect("/");
});

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
  .get("/auth", function(req, res, next){
    let email = req.query.email;
    let token = req.query.token;
    if(token="1234") console.log("회원가입 성공!");
    // token이 일치하면 테이블에서 email을 찾아 회원가입 승인 로직 구현
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

