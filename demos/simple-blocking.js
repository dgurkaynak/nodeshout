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
shout.setFormat(0); // 0=ogg, 1=mp3
shout.setAudioInfo('bitrate', '192');
shout.setAudioInfo('samplerate', '44100');
shout.setAudioInfo('channels', '2');

shout.open();

// Don't forget to replace ogg file path.
fs.open("./music/test.ogg", 'r', function(status, fd) {
    if (status) {
        console.log(status.message);
        return;
    }

    fs.fstat(fd, function(err, stats) {
        var fileSize = stats.size,
            bufferSize = fileSize,
            chunkSize = 4096,
            buffer = new Buffer(bufferSize),
            bytesRead = 0;

        console.log('Got file stats, file size: ' + fileSize);
        while (bytesRead < fileSize) {
            if ((bytesRead + chunkSize) > fileSize) {
                chunkSize = (fileSize - bytesRead);
            }

            var num = 0;
            try {
                num = fs.readSync(fd, buffer, 0, chunkSize, bytesRead);
            } catch(e) {
                console.log(e);
                debugger;
            }

            bytesRead += num;
            console.log('Bytes read:' + bytesRead + ' Total:' + fileSize);

            if (num > 0) {
                shout.send(buffer, num);
            }
            else {
                console.log('Zero bytes read, aborting');
                break;
            }

            shout.sync();
        }

        fs.closeSync(fd);
        shout.close();
    });
});
