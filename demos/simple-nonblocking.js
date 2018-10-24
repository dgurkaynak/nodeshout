var nodeshout = require('../'),
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

// Set metadata
var metadata = nodeshout.createMetadata();
metadata.add('song', 'Led Zeppelin - I can\'t quit you baby');
shout.setMetadata(metadata);


// Don't forget to replace mp3 file path.
fs.open("./music/test.mp3", 'r', function(status, fd) {
    if (status) {
        console.log(status.message);
        return;
    }

    fs.fstat(fd, function(err, stats) {
        var fileSize = stats.size,
            bufferSize = fileSize,
            chunkSize = 4096,
            bytesRead = 0;

        function read() {
            var buffer = new Buffer(bufferSize);

            if ((bytesRead + chunkSize) > fileSize) {
                chunkSize = (fileSize - bytesRead);
            }

            fs.read(fd, buffer, 0, chunkSize, bytesRead, function(err, bytesRead_, buffer) {
                if (err) {
                    console.log(e);
                    debugger;
                    return;
                }

                bytesRead += bytesRead_;
                console.log('Bytes read:' + bytesRead + ' Total:' + fileSize);

                if (bytesRead_ > 0) {
                    shout.send(buffer, bytesRead_);
                    setTimeout(read, Math.abs(shout.delay()));
                } else {
                    console.log('Zero bytes read, aborting');
                    fs.closeSync(fd);
                    shout.close();
                }
            });
        }

        read();
    });
});
