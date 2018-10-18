module.exports = function(app, upload)
{
    app.get("/", function(req, res){
        res.render('index.html');
    });

    app.post("/analyze", upload.single("music_file"), function(req, res, next){

        var file = req.file;
    
        let fileinfo = {
            name : file.originalname,
            mimetype : file.mimetype,
            title : req.body.title,
            artist : req.body.artist,
        };
    
       res.json(fileinfo);
    });
}