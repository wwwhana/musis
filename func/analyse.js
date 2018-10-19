var aubio = require('aubio');
var ref = require('ref');

module.exports = function(path, params) {

	// create source
	var source = aubio.new_aubio_source(path, params.samplerate, params.hop_s);
	try {
		source.readPointer();
	}
	catch (e) {
		console.log('failed opening ' + path);
		return;
	}

	var samplerate = aubio.aubio_source_get_samplerate(source);
	console.log('samplerate: ' + samplerate);

	var total_frames = 0;
	var tmp_read = ref.alloc('int');

	// create tempo
	var tempo = aubio.new_aubio_tempo('default', params.win_s, params.hop_s, params.samplerate);
	var beats = 0;
	var total_bpm = 0;

	// create pitch
	var pitch = aubio.new_aubio_pitch('default', params.win_s, params.hop_s, params.samplerate);
	aubio.aubio_pitch_set_unit(pitch, 'Hz')

	var high_pitch = 0;
	var low_pitch = 999;

	// create output for source
	var samples = aubio.new_fvec(params.hop_s);
	// create output for pitch and beat
	var out_fvec = aubio.new_fvec(1);

	while(true) {

		aubio.aubio_source_do(source, samples, tmp_read);

		aubio.aubio_pitch_do(pitch, samples, out_fvec);
		var last_pitch = aubio.fvec_get_sample(out_fvec, 0);

		if(high_pitch < last_pitch)
			high_pitch = last_pitch;

		if(low_pitch > last_pitch && last_pitch > 0)
			low_pitch = last_pitch;

		aubio.aubio_tempo_do(tempo, samples, out_fvec);
		var is_beat = aubio.fvec_get_sample(out_fvec, 0);
		if (is_beat)
		{
			var last_bpm = aubio.aubio_tempo_get_bpm(tempo);
			total_bpm += last_bpm;
			beats++;
		}

		var read = tmp_read.deref();
		total_frames += read;

		if(read != params.hop_s) break; 
	}
	var cur_time = total_frames / samplerate;

	let result =
	{
		beats : beats,
		high_pitch : high_pitch,
		low_pitch : low_pitch,
		bpm : total_bpm / beats,
		cur_time : cur_time
	};

	aubio.del_aubio_source(source);
	aubio.del_aubio_tempo(tempo);
	aubio.del_aubio_pitch(pitch);

	return result;
}
