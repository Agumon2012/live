const fs = require('fs');
const m3u8stream = require('m3u8stream')

const streamName = "dev";
const url = `http://localhost:8000/live/${streamName}/index.m3u8`;
// const url = `https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8`;

// m3u8stream(url)
//     .pipe(fs.createWriteStream('dev.txt'));


