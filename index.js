const fs = require('fs');
const m3u8stream = require('m3u8stream')

m3u8stream('https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8')
    .pipe(fs.createWriteStream('demo.mp4'));

