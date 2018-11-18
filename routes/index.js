import to from 'await-to-js';

module.exports = (express,Users, Boards, passport, multer, io)=>{
    var router = express.Router();
    router.get('/', function(req, res, next) {
      res.render('index', {title: "asdf"});
    });

    var auth = require('./models/auth')(express.Router(), Users, passport, to);
    var boards = require('./models/board')(express.Router(), Users, Boards,passport, multer, to);
    var users = require('./models/users')(express.Router(), Users, passport);
    var chat = require('./models/chat')(express.Router(), io)
    router.use('/auth', auth);
    router.use('/users', users);
    router.use('/boards', boards);
    router.use('/chat', chat)
    return router;
};
