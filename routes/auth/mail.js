const nodemailer = require('nodemailer');
const config = require('../../config.js');

module.exports = (app, Users)=>{
    app.post("/nodemailerTest", function(req, res, next){
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
            subject: 'Sending Email using Node.js',   // 제목
            text: 'That was easy!'  // 내용
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
    })
};



