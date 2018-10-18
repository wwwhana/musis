const express = require("express");
const app = express();
const multer = require("multer");

var storage = multer.memoryStorage();
var upload = multer({ storage: storage })

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

var router = require("./route/main")(app, upload);

var server = app.listen(3000, function(){
    console.log("Express server has started on port 3000")
});