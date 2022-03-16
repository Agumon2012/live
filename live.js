const fs = require('fs');
const m3u8stream = require('m3u8stream')
const m3u8 = require('m3u8');
const redis = require('redis');
const { count } = require('console');


const client = redis.createClient({
    url: 'redis://:password@127.0.0.1:6379'
})

client.on('error', (err) => console.log('Redis Client Error', err));

(async () => {
    await client.connect();
})();

// const streamName = "dev";
// const url = `http://localhost:8001/live/${streamName}/index.m3u8`;
// const url = `https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8`;
// const url = `https://stream.video.gettr.com/1a80102r1x8xuKT3aU7ohW00ZbBQ8j4uwfB44V00WWRZfkA.m3u8`;

// const hls = m3u8stream(url)
// .pipe(fs.createWriteStream('dev.txt'))
// hls.on('readable', () => {
//     let chunk;
//     while ((chunk = hls.read()) !== null) {
//         console.log(chunk);  //.toString('utf8')
//     }
// });


function checkStream() {
    const parser = m3u8.createStream();
    const file = fs.createReadStream('./stream/media/live/dev/index.m3u8');
    file.pipe(parser);
    // parser.on('item', function (item) {
    //     // emits PlaylistItem, MediaItem, StreamItem, and IframeStreamItem
    //     currentItem = item.toString().split('\n').pop();
    // });
    parser.on('m3u', function (m3u) {
        // fully parsed m3u file
        const tsName = m3u.toString().split('\n').slice(-2)[0];
        (async () => {
            // await client.connect();
            const lastTs = await client.get('currentTs');
            if (lastTs == tsName) {
                const counts = await client.get('counts');
                await client.set('counts', counts ? parseInt(counts) + 1: 1);
                if (counts && counts > 3) {
                    await client.set('status', 'stop');
                }
            } else {
                await client.set('currentTs', tsName);
                await client.set('counts', 1);
                await client.set('status', 'live');
            }
        })();
    });

}

const asyncFunc = setInterval(() => {
    checkStream();
}, 4000);








