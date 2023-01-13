const libshout = require('./libshout');


/**
 * Base class for metadata_t structure.
 */
class MetadataT {
    constructor() {
        this.ptr = libshout.shout_metadata_new();
    }


    /**
     * Free allocated memory.
     * @return {void}
     */
    free() {
        libshout.shout_metadata_free(this.ptr);
    };


    /**
     * Add metadata value value to self, under the key name. You'll
     * probably want to set name to "song", though "url" may also be useful.
     * @param {string} name
     * @param {string} value
     * @return {number}
     */
    add(name, value) {
        return libshout.shout_metadata_add(this.ptr, name, value);
    };
}


module.exports = MetadataT;
