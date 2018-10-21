const analyse = require("../func/analyse");
const mysql = require("mysql");
var dbConfig = require("../configs/dbconf.json");
const fs = require('fs');

module.exports = function(app, upload)
{
    app.get("/", function(req, res){
			var connection = mysql.createConnection(dbConfig);
			connection.query('SELECT * from musis', function(err, rows) {
            if(err) throw err;
        
            console.log('The solution is: ', rows);
		
			res.render('index', {rows : rows});
        });
    });

    app.get("/data", function(req, res){
	var connection = mysql.createConnection(dbConfig);
        connection.query('SELECT * from musis', function(err, rows) {
            if(err) throw err;
        
            console.log('The solution is: ', rows);
            res.send(rows);
        });
    });

    app.post("/analyze", upload.single("music_file"), function(req, res, next){

        var file = req.file;
    
		var analyse_result = analyse(file.path, {
			samplerate: 44100,
			win_s : 1024,
			hop_s : 512,
		});

        let fileinfo = {
            title : req.body.title,
            artist : req.body.artist,
                beats : analyse_result.beats,
                high_pitch : analyse_result.high_pitch,
                low_pitch : analyse_result.low_pitch,
                bpm : analyse_result.bpm,
                cur_time : analyse_result.cur_time
        };

        var sql = "INSERT INTO innodb.musis SET ?";

        var connection = mysql.createConnection(dbConfig);
        connection.query(sql, fileinfo, function (err, result) {
            if (err)
            {
                //throw err;
                res.status.send("Insert Error");
            } 
        });

//console.log(file);

	fs.unlink(file.path);
    
       res.json(fileinfo);
    });
}
