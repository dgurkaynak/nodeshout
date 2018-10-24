var nodeshout = require('../'),
    FileReadStream = require('../').FileReadStream,
    ShoutStream = require('../').ShoutStream,
    fs = require('fs');

nodeshout.init();

console.log('Libshout version: ' + nodeshout.getVersion());

// Create instance and configure it.
var shout = nodeshout.create();
shout.setHost('localhost');
shout.setPort(8000);
shout.setUser('source');
shout.setPassword('hackme');
shout.setMount('deneme');
shout.setFormat(1); // 0=ogg, 1=mp3
shout.setAudioInfo('bitrate', '192');
shout.setAudioInfo('samplerate', '44100');
shout.setAudioInfo('channels', '2');

shout.open();

// Create file read stream and shout stream
var fileStream = new FileReadStream('./music/test.mp3', 65536),
    shoutStream = fileStream.pipe(new ShoutStream(shout));

fileStream.on('data', function(chunk) {
    console.log('Read %d bytes of data', chunk.length);
});

shoutStream.on('finish', function() {
    console.log('Finished playing...');
});
