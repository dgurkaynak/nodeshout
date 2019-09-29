# nodeshout

Native libshout bindings for node.js.

> Libshout allows applications to easily communicate and broadcast to an Icecast streaming media server. It handles the socket connections, metadata communication, and data streaming for the calling application, and lets developers focus on feature sets instead of implementation details.

More detail: http://icecast.org

Original libshout docs: http://www.aelius.com/njh/libshout-doc/libshout.html (a copy of this page can be also found at `/docs/libshout2.html`)

## Node version compability

Since this project heavily depends on [node-ffi](https://github.com/node-ffi/node-ffi/) project, there can be compability issues.

My tests for the current version (0.1.3):

| node | npm | result |
| -- | -- | -- |
| 12.11.0 | 6.11.3 | :x: [node-ffi does not support node 12 yet](https://github.com/node-ffi/node-ffi/pull/544) |
| 11.15.0 | 6.7.0 | :white_check_mark: |
| 10.16.0 | 6.9.0 | :white_check_mark: |
| 9.11.1 | 5.6.0 | :white_check_mark: |
| 8.11.4 | 5.6.0 | :white_check_mark: |
| 6.14.1 | 3.10.10 | :x: |

## Usage

You have to install libshout library before using nodeshout. If you work on OS X, you can install via homebrew.

```
brew install libshout
```

Then, install nodeshout via npm.

```
npm i nodeshout
```

Initalize nodeshout library, create a `Shout` instance and configure it.

```js
// Initalize
nodeshout.init();

// Create a shout instance
const shout = nodeshout.create();

// Configure it
shout.setHost('localhost');
shout.setPort(8000);
shout.setUser('source');
shout.setPassword('password');
shout.setMount('mount');
shout.setFormat(1); // 0=ogg, 1=mp3
shout.setAudioInfo('bitrate', '192');
shout.setAudioInfo('samplerate', '44100');
shout.setAudioInfo('channels', '2');
```

Open the connection.

```js
shout.open();
```

If connection is successful, above function will return `nodeshout.ErrorTypes.SUCCESS` which is integer `0`. After successful connection, you can send audio file chunks via `shout.send` method.

```js
shout.send(buffer, bytesRead);
```

For the synchronization, there is 2 method provided. First one is `shout.sync()` method, this method blocks current thread. Second one is `shout.delay()` method, this method returns how many milliseconds you should wait to send next audio chunk.

## Metadata

```js
// Create a metadata instance
const metadata = nodeshout.createMetadata();

// Set currently playing song.
metadata.add('song', 'Led Zeppelin - I can\'t quit you baby');

// Apply metadata to shout
shout.setMetadata(metadata);
```

## Streams

Helper streams make all the things super-easy. You don't have to deal with reading and syncing stuff. They're avaliable `>= 0.1.1`.

Include helper stream classes.

```js
const { FileReadStream, ShoutStream } = require('nodeshout');
```

and then pipe them together. That's all!

```js
const fileStream = new FileReadStream('./some/music.mp3', 65536);
const shoutStream = fileStream.pipe(new ShoutStream(shout));

shoutStream.on('finish', () => {
    // Finished playing, you can create
    // another stream for next song
});
```

## Example

Check the `/demos` folder.
