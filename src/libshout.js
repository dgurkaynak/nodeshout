const FFI = require('ffi-napi');
const ref = require('ref-napi');

const void_ptr = ref.refType(ref.types.void);

const shout_t = exports.shout_t = void_ptr;
const shout_t_ptr = exports.shout_t_ptr = ref.refType(shout_t);
const shout_metadata_t = exports.shout_metadata_t = void_ptr;
const shout_metadata_t_ptr = exports.shout_metadata_t_ptr = ref.refType(shout_metadata_t);

module.exports =  FFI.Library('libshout', {
    shout_init: [ref.types.void, []],
    shout_shutdown: [ref.types.void, []],
    shout_version: [ref.types.CString, [
        ref.refType(ref.types.int32),
        ref.refType(ref.types.int32),
        ref.refType(ref.types.int32),
    ]],
    shout_new: [shout_t, []],
    shout_free: [ref.types.void, [shout_t_ptr]],
    shout_get_error: [ref.types.CString, [shout_t_ptr]],
    shout_get_errno: [ref.types.int32, [shout_t_ptr]],
    shout_get_connected: [ref.types.int32, [shout_t_ptr]],
    shout_set_host: [ref.types.int32, [shout_t_ptr, ref.types.CString]],
    shout_get_host: [ref.types.CString, [shout_t_ptr]],
    shout_set_port: [ref.types.int32, [shout_t_ptr, ref.types.ushort]],
    shout_get_port: [ref.types.ushort, [shout_t_ptr]],
    shout_set_password: [ref.types.int32, [shout_t_ptr, ref.types.CString]],
    shout_get_password: [ref.types.CString, [shout_t_ptr]],
    shout_set_mount: [ref.types.int32, [shout_t_ptr, ref.types.CString]],
    shout_get_mount: [ref.types.CString, [shout_t_ptr]],
    shout_set_name: [ref.types.int32, [shout_t_ptr, ref.types.CString]],
    shout_get_name: [ref.types.CString, [shout_t_ptr]],
    shout_set_url: [ref.types.int32, [shout_t_ptr, ref.types.CString]],
    shout_get_url: [ref.types.CString, [shout_t_ptr]],
    shout_set_genre: [ref.types.int32, [shout_t_ptr, ref.types.CString]],
    shout_get_genre: [ref.types.CString, [shout_t_ptr]],
    shout_set_user: [ref.types.int32, [shout_t_ptr, ref.types.CString]],
    shout_get_user: [ref.types.CString, [shout_t_ptr]],
    shout_set_agent: [ref.types.int32, [shout_t_ptr, ref.types.CString]],
    shout_get_agent: [ref.types.CString, [shout_t_ptr]],
    shout_set_description: [ref.types.int32, [shout_t_ptr, ref.types.CString]],
    shout_get_description: [ref.types.CString, [shout_t_ptr]],
    shout_set_dumpfile: [ref.types.int32, [shout_t_ptr, ref.types.CString]],
    shout_get_dumpfile: [ref.types.CString, [shout_t_ptr]],
    shout_set_audio_info: [ref.types.int32, [shout_t_ptr, ref.types.CString, ref.types.CString]],
    shout_get_audio_info: [ref.types.CString, [shout_t_ptr, ref.types.CString]],
    shout_set_public: [ref.types.int32, [shout_t_ptr, ref.types.uint32]],
    shout_get_public: [ref.types.uint32, [shout_t_ptr]],
    shout_set_format: [ref.types.int32, [shout_t_ptr, ref.types.uint32]],
    shout_get_format: [ref.types.uint32, [shout_t_ptr]],
    shout_set_protocol: [ref.types.int32, [shout_t_ptr, ref.types.uint32]],
    shout_get_protocol: [ref.types.uint32, [shout_t_ptr]],
    shout_set_nonblocking: [ref.types.int32, [shout_t_ptr, ref.types.uint32]],
    shout_get_nonblocking: [ref.types.uint32, [shout_t_ptr]],
    shout_open: [ref.types.int32, [shout_t_ptr]],
    shout_close: [ref.types.int32, [shout_t_ptr]],
    shout_send: [ref.types.int32, [shout_t_ptr, ref.refType(ref.types.uchar), ref.types.int32]],
    shout_send_raw: [ref.types.int32, [shout_t_ptr, ref.refType(ref.types.uchar),  ref.types.int32]],
    shout_queuelen: [ref.types.int32, [shout_t_ptr]],
    shout_sync: [ref.types.void, [shout_t_ptr]],
    shout_delay: [ref.types.int32, [shout_t_ptr]],
    shout_set_metadata: [ref.types.int32, [shout_t_ptr, shout_metadata_t]],
    shout_metadata_new: [shout_metadata_t_ptr, []],
    shout_metadata_free: [ref.types.void, [shout_metadata_t_ptr]],
    shout_metadata_add: [ref.types.int32, [shout_metadata_t_ptr, ref.types.CString, ref.types.CString]],
});
