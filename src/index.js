const libshout = require('./libshout');
const ShoutT = require('./shout_t');
const MetadataT = require('./metadata_t');


const nodeshout = {};


/**
 * Initializes the shout library. This function must always be called before
 * any other libshout function.
 */
nodeshout.init = function() {
    libshout.shout_init();
};


/**
 * Releases any resources which may have been allocated by a call to shout_init.
 * An application should call this function after it has finished using libshout.
 */
nodeshout.shutdown = function() {
    libshout.shout_shutdown();
};


/**
 * Gets libshout version.
 * @return {string}
 */
nodeshout.getVersion = function() {
    // Dummy buffers
    const buff1 = Buffer.alloc(100);
    const buff2 = Buffer.alloc(100);
    const buff3 = Buffer.alloc(100);

    return libshout.shout_version(buff1, buff2, buff3);
};


/**
 * Allocates a new shout_t structure. May return NULL if no memory is available.
 * The result should be disposed of with free when you are finished with it.
 * @return {ShoutT}
 */
nodeshout.create = function() {
    return new ShoutT();
};


/**
 * Allocates a new medata_t structure. May return NULL if no memory is available.
 * The result should be disposed of with free when you are finished with it.
 * @return {MetadataT}
 */
nodeshout.createMetadata = function() {
    return new MetadataT();
};


/**
 * Error constant of libshout.
 * @enum {number}
 */
nodeshout.ErrorTypes = {
    SUCCESS: 0,
    INSANE: -1,
    NOCONNECT: -2,
    NOLOGIN: -3,
    SOCKET: -4,
    MALLOC: -5,
    METADATA: -6,
    CONNECTED: -7,
    UNCONNECTED: -8,
    UNSUPPORTED: -9,
    BUSY: -10
};


module.exports = nodeshout;
