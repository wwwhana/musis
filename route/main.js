const analyse = require("../func/analyse");

module.exports = function(app, upload)
{
    app.get("/", function(req, res){
        res.render('index.html');
    });

    app.post("/analyze", upload.single("music_file"), function(req, res, next){

        var file = req.file;
    
	var analyse_result = analyse(file.path, {
		samplerate: 44100,
		win_s : 1024,
		hop_s : 512,
	});

        let fileinfo = {
            name : file.originalname,
            title : req.body.title,
            artist : req.body.artist,
                beats : analyse_result.beats,
                high_pitch : analyse_result.high_pitch,
                low_pitch : analyse_result.low_pitch,
                bpm : analyse_result.bpm,
                tempo : analyse_result.tempo,
                cur_time : analyse_result.cur_time
        };
    
       res.json(fileinfo);
    });
}
