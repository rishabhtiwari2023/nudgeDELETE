var express = require("express")
var bodyParser = require("body-parser")
const dotenv = require('dotenv');
const fs = require('fs')
dotenv.config();
const User = require('./models/user')
const nudge = require('./models/nudge')

// const jwt = require('jsonwebtoken');
var jsonParser = bodyParser.json();
var mongoose = require("mongoose")
const User = require('./models/user')

const ObjectId = require('mongodb').ObjectId;
const cors = require('cors');
const app = express()
app.use(cors());
app.use(bodyParser.json())
const path = require("path");
const fs = require("fs");
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended: true
}));
mongoose.connect('mongodb+srv://_______...===--------odb.net/rites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
var db = mongoose.connection;

db.on('error', () => console.log("Error in Connecting to Database"));
db.once('open', () => console.log("Connected to Database"))
const multer = require("multer");

const handleError = (err, res) => {
  res
    .status(500)
    .contentType("text/plain")
    .end("Oops! Something went wrong!");
};

const upload = multer({  dest: "/models"});


app.post(
  "/upload",
  upload.single("file" ),
  (req, res) => {
    const tempPath = req.file.path;
    const targetPath = path.join(__dirname, "./uploads/image.png");

    if (path.extname(req.file.originalname).toLowerCase() === ".png") {
      fs.rename(tempPath, targetPath, err => {
        if (err) return handleError(err, res);

        res
          .status(200)
          .contentType("text/plain")
          .end("File uploaded!");
      });
    } else {
      fs.unlink(tempPath, err => {
        if (err) return handleError(err, res);

        res
          .status(403)
          .contentType("text/plain")
          .end("Only .png files are allowed!");
      });
    }
  }
);


app.get("/api/v3/app/event/:id", async (req, res) => {
    const id=req.params.id;
    db.collection('myCollection').find({"_id" :ObjectId(id)},function (err, collection){
        if (err) throw err;
            console.log("Record fetch Successfully", collection);
        d = [collection]
        res.json(collection);
    });
});
app.get("/api/v3/app/event/:type&:limit&:page", async (req, res) => {
 const a=req.params.type;
 const li=req.params.limit;
 const page=req.params.page;
 db.collection('myCollection').find({"type" :a,limit:li,page:page},function (err, collection){
    if (err) throw err;
        console.log("Record fetch Successfully", collection);
    d = [collection]
    res.json(collection);})
});
app.post("/api/v3/app/event", async (req, res) => {
    const newUser = new User(req.body)
    db.collection('myCollection').insertOne(newUser,function (err, collection){
        if (err) throw err;
            console.log("Record post Successfully", collection);
        d = [collection]
        res.json(collection);})

});
app.put("/api/v3/app/event/:id", async (req, res) => {
    const id=req.params.id;
    const newUser = new User(req.body)
    db.collection('myCollection').updateOne(
        { _id: ObjectId(id) },
        { $set:newUser},
        function(err, result) {
          if (err) {
            console.log(err);
          } else {
            console.log(result);
          }
        }
      );


});
app.delete("/api/v3/app/event/:id", async (req, res) => {
    const id=req.params.id;
    db.collection('myCollection').deleteOne({ _id: ObjectId(id) },function (err, collection){
        if (err) throw err;
            console.log("Record delete Successfully", collection);
        d = [collection]
        res.json(collection);})


});
// =========================================================================================================================
// 2nd Task API
app.get("/api/v3/app/nudge/:id", async (req, res) => {
    const id=req.params.id;
    db.collection('myCollection').find({"_id" :ObjectId(id)},function (err, collection){
        if (err) throw err;
            console.log("Record fetch Successfully", collection);
        d = [collection]
        res.json(collection);
    });
});
app.post("/api/v3/app/nudge", async (req, res) => {
    const newnudge = new nudge(req.body)
    db.collection('myCollection').insertOne(newnudge,function (err, collection){
        if (err) throw err;
            console.log("Record post Successfully", collection);
        d = [collection]
        res.json(collection);})

});

app.listen(3000);
console.log("Listening on PORT 3000");
