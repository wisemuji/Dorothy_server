const to = require("await-to-js");
const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: 'wisemuji',
  api_key: '948844142811467',
  api_secret: 'TBBeTe1fOj0Jh6ZyeKI_VYg_Vp0'
});
const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: "dorothy",
  allowedFormats: ["jpg", "png"],
  transformation: [{ width: 1500, height: 1500, crop: "limit" }]
});
const upload = multer({ storage: storage });
const fields = [
  { name: 'image1', maxCount: 1 },
  { name: 'image2', maxCount: 1 },
  { name: 'image3', maxCount: 1 },
  { name: 'image4', maxCount: 1 },
  { name: 'image5', maxCount: 1 }
];
const SIZE = 5;

module.exports = (app, Clubs, Users, rndstring)=>{
  app.post('/setClub', upload.fields(fields), async (req,res)=>{
    // console.log("post:setClub")
    console.log(req.body) // to see what is returned to you
    console.log(req.files) // to see what is returned to you
    const data = req.body;
    data.images = [];
    Clubs.findOneAndUpdate({token: data.token}, data, {upsert:true, new: true},
    function (err, res) {
        if(err) console.log('1'+err);
    });
    for(var i=1; i<=SIZE; i++){
      if(typeof req.files['image'+i] != 'undefined'){
        console.log('image'+i);
        // console.log(typeof req.files['image'+i]+', '+i);
        var element = req.files['image'+i][0];
        const image = { url: element.url, id: element.public_id };
        Clubs.updateOne({ token: data.token }, { $push:
           { images: image  }},
        function (err, res) {
            if(err) console.log('2'+err);
            console.log('i='+i);
        });
        // Clubs.findOne({ token: data.token, 'pictures.index': i }, function (err, rawContent) {
        //     if(err) console.log('3'+err);
        //     console.log(rawContent.images.index);
        // });
      }
    };
    // Clubs.findOne({token: data.token}, function(err, rawContent){
    //     if(err) console.log('2'+err);
    //
    //     rawContent.images.push(image);
    //     rawContent.save(function(err){
    //         if(err) console.log('3'+err);
    //     });
    // });
    res.redirect("/");
  })
  .post('/deleteClubAll', async (req,res)=>{
      Clubs.remove({}, function(err) {
            if (err) {
                console.log(err)
            } else {
                res.end('success');
            }
          }
      );
    })
  .post('/deleteClub', async (req,res)=>{
      Clubs.remove({token: req.body.token}, function(err) {
            if (err) {
                console.log(err)
            } else {
                res.end('success');
            }
          }
      );
    })

};
