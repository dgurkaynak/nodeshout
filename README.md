nodeshout
===================
Native libshout bindings for node.js. 

> Libshout allows applications to easily communicate and broadcast to an Icecast streaming media server. It handles the socket connections, metadata communication, and data streaming for the calling application, and lets developers focus on feature sets instead of implementation details.

More detail: http://icecast.org

Usage
-------------
You have to install libshout library before using nodeshout. If you work on OS X, you can install via homebrew.

    brew install libshout

Then, install nodeshout via npm.
    
    npm install nodeshout

Initalize nodeshout library, create a `Shout` instance and configure it.

    // Initalize
    nodeshout.init();
    
    // Create a shout instance
    var shout = nodeshout.create();
    
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
    
Open the connection.
    
    shout.open();

If connection is successful, above function will return `nodeshout.ErrorTypes.SUCCESS` which is integer `0`. After successful connection, you can send audio file chunks via `shout.send` method.

    shout.send(buffer, bytesRead);

For the synchronization, there is 2 method provided. First one is `shout.sync()` method, this method blocks current thread. Second one is `shout.delay()` method, this method returns how many milliseconds you should wait to send next audio chunk.

Example
-------------
Check the example in examples folder for simple usage.
