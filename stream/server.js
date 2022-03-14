const NodeMediaServer = require('node-media-server');
const config = {
    rtmp: {
        port: 1935,
        chunk_size: 60000,
        gop_cache: true,
        ping: 60,
        ping_timeout: 30
    },
    http: {
        port: 8001,
        mediaroot: './stream/media/', // 建议写
        allow_origin: '*',
    },
    trans: { // 这里参数是trans参数，不是relay参数，relay参数中配置hls无效
        ffmpeg: './stream/ffmpeg/bin/ffmpeg.exe',
        tasks: [
            {
                app: 'live',
                ac: 'copy',
                vc: 'libx264',
                hls: true,
                hlsFlags: '[hls_time=2:hls_list_size=5:hls_flags=delete_segments]',
                dash: true,
                dashFlags: '[f=dash:window_size=5:extra_window_size=10]'
            }
        ]
    }
};

var nms = new NodeMediaServer(config)
nms.run();