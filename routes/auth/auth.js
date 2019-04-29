const nodemailer = require('nodemailer');
const config = require('../../config.js');

function sendMail(email, token) {
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
};

module.exports = (app, Users, rndstring, Confirm)=>{
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
  .post("/mailAuth", async (req,res) => {
    let email = req.body.email;
    let email_token = rndstring.generate(10);
    await sendMail(email, email_token);
    let confirm = await new Confirm({email:email, email_token:email_token});
    console.log("emamlkmlkdlaed"+confirm);
    await confirm.save((err)=>{
      if(err) {
        res.json({"message":"error!"}); 
      } else {
          res.json(confirm); 
        }
      });
    
    // client side coding
    // const button = document.getElementById('myButton');
    // button.addEventListener('click', function(e) {
    //   console.log('button was clicked');

    //   fetch('/clicked', {method: 'POST'})
    //     .then(function(response) {
    //       if(response.ok) {
    //         console.log('Click was recorded');
    //         return;
    //       }
    //       throw new Error('Request failed.');
    //     })
    //     .catch(function(error) {
    //       console.log(error);
    //     });
    // });
  })
  .post("/mailAuthCheck", async (req,res) => {
    await Confirm.findOne({email:req.body.email, email_token: req.body.email_token}, (err, data)=>{
      if (err){            
          res.send(err);
      }else {
          if( data == null){
            res.status(400).send("not found");
          }
          else res.status(200).send("success!");
      }
    }); 
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
  .post('/aaConfirm', async(req,res)=>{
    var result = await Confirm.find()
    res.send(result)
  })
  .get('/logout', (req, res) => {
    req.session.destroy();
    res.clearCookie('sid');
    res.redirect('/');
  });

};

