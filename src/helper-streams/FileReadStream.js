var util = require('util'),
    stream = require('stream'),
    fs = require('fs');


/**
 * This class is simple clone of readable file stream that supports custom buffer size.
 * Because, fs.createReadableStream does not support to specify buffer size.
 * @constructor
 * @param {string} file File path.
 * @param {number} chunkSize Buffer size in bytes.
 */
var FileReadStream = function(file, chunkSize) {
    stream.Readable.call(this);

    this.reset();
    this.file = file;
    this.chunkSize = chunkSize;
    this.buffer = new Buffer(this.chunkSize);

    this.start();
};
util.inherits(FileReadStream, stream.Readable);


/**
 * Resets class properties.
 */
FileReadStream.prototype.reset = function() {
    this.file = null;
    this.fileSize = null;
    this.totalBytesRead = null;
    this.chunkSize = null;
    this.fd = null;
};


/**
 * Opens and gets stats of file.
 */
FileReadStream.prototype.start = function() {
    this.fd = fs.openSync(this.file, 'r');

    var stats = fs.fstatSync(this.fd);
    this.fileSize = stats.size;
    this.totalBytesRead = 0;
};


/**
 * Reads and pushes chunk to stream pipe.
 * @override
 */
FileReadStream.prototype._read = function() {
    if (this.totalBytesRead >= this.fileSize) {
        // File is finished.
        fs.closeSync(this.fd);
        this.push(null);
        return;
    }

    var bytesRead = fs.readSync(this.fd, this.buffer, 0, this.chunkSize, this.totalBytesRead);

    this.totalBytesRead += bytesRead;
    this.push(this.buffer);
};


module.exports = FileReadStream;
