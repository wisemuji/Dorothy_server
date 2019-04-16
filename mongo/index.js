const mongoose = require("mongoose");
const config = require('../config.js');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://'+config.mongo_id+':'+config.mongo_pass+'@ds227865.mlab.com:27865/dorothy', { useNewUrlParser: true }).then(() => {
console.log("Connected to Database");
}).catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
});
mongoose.Promise = global.Promise;

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () { console.log("Mongo On"); });

module.exports = db;
