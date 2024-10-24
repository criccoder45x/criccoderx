const http = require('http');

const streams = {
    '1': 'https://prod-sports-hin-cf.jiocinema.com/hls/live/2100320/uhd_akamai_ctv_avc_hin_indvsnz_201024/index.m3u8',
    '2': 'http://example.com/stream2.m3u8',
};

const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const id = url.searchParams.get('id');

    if (req.method === 'GET' && url.pathname === '/getStream') {
        const streamUrl = streams[id];

        if (streamUrl) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ url: streamUrl }));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Stream not found' }));
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not Found' }));
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
