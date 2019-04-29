const config = require('../../config.js');
const accountSid = config.accountSid; // Your Account SID from www.twilio.com/console
const authToken = config.authToken;   // Your Auth Token from www.twilio.com/console

const twilio = require('twilio');

module.exports = (app, Confirm)=>{
    app.post("/phoneAuth", async (req,res) => {
        const phone = '+82' + req.body.phone;
        let client = new twilio(accountSid, authToken);

        client.messages.create({
            body: 'Hello from Node',
            to: phone,  // Text this number
            from: '+12053509816' // From a valid Twilio number
        })
        .then((message) => res.status(200).json(message.sid),
            (error) => {
                console.error(error);
                res.status(400).json(error);
            }
        )
    });
}