const { Mongoose } = require('mongoose');
const multer =require('multer');
const {GridfsStorage} = require('multer-gridfs-storage');

var storage = new GridfsStorage({db: Mongoose.connection});

var upload = multer({storage:storage});


module.exports.add = (req, res) => {
    upload.single('image')
    .then((data) => {
        res.send(data)
    }).catch((err) => {
        res.status(401).send('smethiing happens wrong')
    })
}
