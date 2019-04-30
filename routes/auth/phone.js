const config = require('../../config.js');
const accountSid = config.accountSid; // Your Account SID from www.twilio.com/console
const authToken = config.authToken;   // Your Auth Token from www.twilio.com/console

const twilio = require('twilio');

module.exports = (app, Confirm)=>{
    app.post("/phoneAuth", async (req,res) => {
        const phone = req.body.phone;
        let phone_token = Math.floor(Math.random() * 9000) + 1000;
        let client = new twilio(accountSid, authToken);
        let contents = '[도로시] 휴대폰 인증을 위해 인증번호 ['+phone_token+']를 입력해 주세요.'

        await client.messages.create({
            body: contents,
            to: '+82' + phone,  // Text this number
            from: '+12053509816' // From a valid Twilio number
        })
        .then( async (message) => {
            let confirm = await new Confirm({phone: phone, phone_token: phone_token});
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
    })
    .post("/phoneAuthCheck", async (req,res) => {
        await Confirm.findOneAndRemove({phone:req.body.phone, phone_token: req.body.phone_token}, (err, data)=>{
            if (err){            
                res.send(err);
            } else {
                if( data == null){
                    res.status(400).send("not found");
                }
                else res.status(200).send("success!");
            }
        }); 
    });
}