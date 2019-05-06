const config = require('../../config.js');
const accountSid = config.accountSid; // Your Account SID from www.twilio.com/console
const authToken = config.authToken;   // Your Auth Token from www.twilio.com/console

const twilio = require('twilio');

function sendMessage(phone, contents) {
    let client = new twilio(accountSid, authToken);
    
    client.messages.create({
        body: contents,
        to: '+82' + phone,  // Text this number 국가번호 +82
        from: '+12053509816' // From a valid Twilio number
    })
    .then( async (message) => {
        let confirm = await new Confirm({phone: phone, phone_token: phone_token});
        //찾아서 있으면 업데이트 없으면 추가(upsert)
        await Confirm.findOneAndUpdate({phone: phone}, {phone_token: phone_token}, {upsert: true}, (err)=>{
            if(err) {
                res.status(400).json({"message":"error!"}); 
            } else {
                console.log(message.sid);
                res.status(200).json(confirm); 
            }
        });
    },
        (error) => {
            console.error(error);
            res.status(400).json(error);
        }
    )
  };

module.exports = (app, Confirm)=>{
    app.post("/phoneAuth", async (req,res) => {
        const phone = req.body.phone;
        let phone_token = Math.floor(Math.random() * 9000) + 1000; //랜덤 네자리수 생성
        let contents = '[도로시] 휴대폰 인증을 위해 인증번호 ['+phone_token+']를 입력해 주세요.'
        await sendMessage(phone, contents);
    })

    .post("sendPassOrFail", async (req,res) => {
        const club = req.body.club;
        const isPass = req.body.isPass;
        const phone = req.body.phone;
        let contents = '[도로시]동아리 모집 결과 안내\n'+phone+'님이 '+club+'에 최종 <strong>\''+isPass+'\'</strong>하셨음을 안내해드립니다. 미림 동아리 통합 관리 솔루션 도로시를 이용해주셔서 갑사합니다.'
        await sendMessage(phone, contents);
        res.status(200).send("success");
    })

    .post("/phoneAuthCheck", async (req,res) => {
        //인증번호 확인하면 삭제
        await Confirm.findOneAndRemove({phone:req.body.phone, phone_token: req.body.phone_token}, (err, data)=>{
            if (err){            
                res.send(err);
            } else {
                if( data == null){
                    res.status(204).send("인증에 실패하였습니다.");
                }
                else res.status(200).send("성공적으로 인증되었습니다.");
            }
        }); 
    });
}