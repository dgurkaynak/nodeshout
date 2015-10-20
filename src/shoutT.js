var libshout = require('./libshout');


/**
 * Base class for shout_t structure.
 * @constructor
 */
var shoutT = function() {
    this.ptr = libshout.shout_new();
};


/**
 * Free allocated memory.
 */
shoutT.prototype.free = function() {
    libshout.shout_free(this.ptr);
};


/**
 * Returns a statically allocated string describing the last shout error that occured in this connection.
 * Only valid until the next call affecting this connection.
 * @return {string}
 */
shoutT.prototype.getError = function() {
    return libshout.shout_get_error(this.ptr);
};


/**
 * Sets the server hostname or IP address. The default is localhost.
 * @param {string} host
 * @return {number}
 */
shoutT.prototype.setHost = function(host) {
    return libshout.shout_set_host(this.ptr, host);
};


/**
 * Sets the server port. The default is 8000.
 * @param {number} port
 * @return {number}
 */
shoutT.prototype.setPort = function(port) {
    return libshout.shout_set_port(this.ptr, port);
};


/**
 * Sets the user to authenticate as, for protocols that can use this parameter.
 * The default is source.
 * @param {string} user
 * @return {number}
 */
shoutT.prototype.setUser = function(user) {
    return libshout.shout_set_user(this.ptr, user);
};


/**
 * Sets the password to authenticate to the server with. This parameter must be set.
 * There is no default.
 * @param {string} password
 * @return {number}
 */
shoutT.prototype.setPassword = function(password) {
    return libshout.shout_set_password(this.ptr, password);
};


/**
 * Sets the mount point for this stream, for protocols that support this option (SHOUT_PROTOCOL_ICY doesn't).
 * @param {string} mount
 * @return {number}
 */
shoutT.prototype.setMount = function(mount) {
    return libshout.shout_set_mount(this.ptr, mount);
};


/**
 * Sets the name of the stream.
 * @param {string} name
 * @return {number}
 */
shoutT.prototype.setName = function(name) {
    return libshout.shout_set_name(this.ptr, name);
};


/**
 * Sets the URL of a site about this stream.
 * @param {string} url
 * @return {number}
 */
shoutT.prototype.setUrl = function(url) {
    return libshout.shout_set_url(this.ptr, url);
};


/**
 * Sets the genre (or genres) of the stream. This is usually a keyword list, eg "pop rock rap".
 * @param {string} genre
 * @return {number}
 */
shoutT.prototype.setGenre = function(genre) {
    return libshout.shout_set_genre(this.ptr, genre);
};


/**
 * Sets the user agent header. This is libshout/VERSION by default.
 * If you don't know what this function is for, don't use it.
 * @param {string} agent
 * @return {number}
 */
shoutT.prototype.setAgent = function(agent) {
    return libshout.shout_set_agent(this.ptr, agent);
};


/**
 * Sets the description of this stream.
 * @param {string} description
 * @return {number}
 */
shoutT.prototype.setDescription = function(description) {
    return libshout.shout_set_description(this.ptr, description);
};


/**
 * Sets a stream audio parameter (eg bitrate, samplerate, channels or quality). The currently defined parameters
 * are listed in the Audio Info Constants section, but you are free to add additional fields if your
 * directory server understands them.
 * @param {string} key
 * @param {string} value
 * @return {number}
 */
shoutT.prototype.setAudioInfo = function(key, value) {
    return libshout.shout_set_audio_info(this.ptr, key, value);
};


/**
 * Setting this to true asks the server to list the stream in any directories it knows about.
 * To suppress listing, set this to false. The default is false.
 * @param {boolean} isPublic
 * @return {number}
 */
shoutT.prototype.setPublic = function(isPublic) {
    return libshout.shout_set_public(this.ptr, isPublic ? 1 : 0);
};


/**
 * Sets the audio format of this stream. (0=ogg, 1=mp3)
 * The currently supported formats are listed in Format Constants. The default is SHOUT_FORMAT_VORBIS.
 * @param {number} format
 * @return {number}
 */
shoutT.prototype.setFormat = function(format) {
    return libshout.shout_set_format(this.ptr, format);
};


/**
 * Set the protocol with which to connect to the server. Supported protocols are listed in Protocol Constants.
 * The default is SHOUT_PROTOCOL_HTTP (compatible with Icecast 2).
 * @param {number} protocol
 * @return {number}
 */
shoutT.prototype.setProtocol = function(protocol) {
    return libshout.shout_set_protocol(this.ptr, protocol);
};


/**
 * Opens a connection to a server. All connection parameters must have been set prior to this call.
 * @return {number}
 */
shoutT.prototype.open = function() {
    return libshout.shout_open(this.ptr);
};


/**
 * Closes a connection to the server.
 * @return {number}
 */
shoutT.prototype.close = function() {
    return libshout.shout_close(this.ptr);
};


/**
 * Sends length bytes of audio data from the buffer pointed to by data to the server.
 * The connection must already have been established by a successful call to shout_open.
 * @param {Buffer} buff
 * @param {number} length
 * @return {number}
 */
shoutT.prototype.send = function(buff, length) {
    return libshout.shout_send(this.ptr, buff, length);
};


/**
 * Causes the caller to sleep for the amount of time necessary to play back audio sent since
 * the last call to shout_sync. Should be called before every call to shout_send to ensure
 * that audio data is sent to the server at the correct speed. Alternatively, the caller may
 * use shout_delay to determine the number of milliseconds to wait and delay itself.
 */
shoutT.prototype.sync = function() {
    return libshout.shout_sync(this.ptr);
};


/**
 * Returns the number of milliseconds the caller should wait before calling shout_send again.
 * This function is provided as an alternative to shout_sync for applications that may wish
 * to do other processing in the meantime.
 * @return {number}
 */
shoutT.prototype.delay = function() {
    return libshout.shout_delay(this.ptr);
};


/**
 * Sets metadata on the connection self to metadata. Only MP3 streams
 * support this type of metadata update. You may use this function on
 * defined but closed connections (this is useful if you simply want to
 * set the metadata for a stream provided by another process).
 * @param {metadataT} metadata
 * @return {number}
 */
shoutT.prototype.setMetadata = function(metadata) {
    return libshout.shout_set_metadata(this.ptr, metadata.ptr);
};



module.exports = shoutT;
