const nodemailer = require('nodemailer');
const config = require('../../config.js');
const rndstring = require("randomstring");

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

module.exports = (app, Confirm)=>{
    app.post("/mailAuth", async (req,res) => {
        let email = req.body.email;
        let email_token = rndstring.generate(10);
        await sendMail(email, email_token);
        let confirm = await new Confirm({email:email, email_token:email_token});
        Confirm.findOneAndUpdate({email: email}, {email_token: email_token}, {upsert: true}, (err)=>{
          if(err) {
            res.status(400).json({"message":"error!"}); 
          } else {
              res.status(200).json(confirm); 
            }
        });
    })
    
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
    
    .post("/mailAuthCheck", async (req,res) => {
        await Confirm.findOne({email:req.body.email, email_token: req.body.email_token}, (err, data)=>{
        if (err){            
            res.send(err);
        } else {
            if( data == null){
                res.status(400).send("not found");
            }
            else res.status(200).send("success!");
        }
        }); 
    })
    
    .post('/aaConfirm', async(req,res)=>{
        var result = await Confirm.find()
        res.send(result)
    })
};



