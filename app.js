const express = require ('express');
const mongoose = require('mongoose');
const multer =require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');
const authRouter  = require('./routes/auth');
const checkAuth = require('./middleware/checkAuth');
var maxSize = 1*1000*1000 //max file size of file can not be fgreater than maxSize
// const dashboardRouter = require('./routes/dashBoard')
require('dotenv').config();

const port = process.env.PORT || 3000;
const app = express();
// connectiong to monggose
mongoose.connect(process.env.MONGO_URL,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    user:process.env.USER,
    pass:process.env.PASS
   

})
mongoose.connection.once('open', () => {
    console.log('connected to database..')
})
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use('/insta/', authRouter) // the route for authorizaton
//app.use('/insta/dashboard', dashboardRouter)

// the fs storage to add image in mongoose
var storage = new GridFsStorage({db: mongoose.connection})

var upload = multer({storage:storage, limits:maxSize});
app.get('/', checkAuth, (req, res) => {
    res.sendFile(__dirname + '/index.html')
});
// upload the file 
app.post('/upload', checkAuth, upload.single('files'), (req, res) =>{
   res.send(req.file)
   console.log(req.file)
})

app.listen(port, () => {
    console.log(`app is running on port ${port}`)
})
