# nodeshout

Native libshout bindings for node.js.

> Libshout allows applications to easily communicate and broadcast to an Icecast streaming media server. It handles the socket connections, metadata communication, and data streaming for the calling application, and lets developers focus on feature sets instead of implementation details.

More detail: http://icecast.org

Original libshout docs: http://www.aelius.com/njh/libshout-doc/libshout.html (a copy of this page can be also found at `/docs/libshout2.html`)

## Node version compability

Since this project heavily depends on [ffi-napi](https://github.com/node-ffi-napi/node-ffi-napi) project, there can be compability issues.

My tests for the current version (2.0.0):

| node | npm | result |
| -- | -- | -- |
| v18.13.0 | 8.19.3 | :white_check_mark: |
| 16.16.0 | 8.11.0 | :white_check_mark: |
| 14.20.1 | 6.14.17 | :white_check_mark: (`python` required to install) |
| 12.22.12 | 6.14.16 | :white_check_mark: (`python` required to install) |
| 11.15.0 | 6.7.0 | :x: Use version `0.1.3` |
| 10.16.0 | 6.9.0 | :x: Use version `0.1.3` |
| 9.11.1 | 5.6.0 | :x: Use version `0.1.3` |
| 8.11.4 | 5.6.0 | :x: Use version `0.1.3` |

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

> If you're gonna stream multiple files, beware that Icecast requires stable bitrate & sample rate for the whole stream. So all of your music files should have the exact bitrate & sample rate.

## Examples

Check the `/demos` folder.

## Metadata

```js
// Create a metadata instance
const metadata = nodeshout.createMetadata();

// Set currently playing song.
metadata.add('song', 'Led Zeppelin - I can\'t quit you baby');

// Apply metadata to shout
shout.setMetadata(metadata);
```

## Developing
Below is a short guild to the development in this repository

- Clone repository
- Verify that your node version and NPM version are compatible with the repository. [NVM](https://github.com/nvm-sh/nvm) is useful here.
- Verify that you have the libshout dependency installed, for Mac OSX you can install with `brew install libshout` on a linux distribution like Ubuntu you need to download the source or binary and build it. Typically after building it will install to a directory like `/usr/local/lib/libshout`
- Install dependencies: `npm i`
- Start icecast server
- Run `npm test` and see it's working

### Debuging

#### Libshout install issue
If you get the below error its likely that the `libshout` dependency is installed incorrectly
`Error: ENOENT: no such file or directory, open 'libshout.so'`

The install for the libshout dependency on non-mac systems can be a bit annoying. I found it easiest to install it on linux via building from source. https://icecast.org/download/
If you scroll down to the bottom of that page you can get the `libshout` source download `tar.gz` link.

After downloading the dependency, follow the `INSTALL` instructions for installing it locally. The `libshout` library should be installed to `/usr/local/lib/libshout` (At least it was on Ubuntu based distributions). This file must be passed into the `FFI.Library` function. Either you can pass in the fully qualifed path, or make the `/usr/local/lib/libshout` available to the system to reference without a path name.
