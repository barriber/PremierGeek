const bunyan = require('bunyan');
const path = require('path');
const filePath = path.join(__dirname, '..', '..', 'logs', 'foo.log')
function reqSerializer(req) {
    return {
        method: req.method,
        url: req.url,
        headers: req.headers,
        body: req.body
    };
}

const logger = bunyan.createLogger({
    name: 'logger',
    serializers: {
        req: reqSerializer
    },
    streams: [{
        level: 'info',
        stream: process.stdout
    }, {
        level: 'info',
        path: filePath
    }]
});

logger.on('error', (err, stream) => {
    console.log(err);
    console.log(stream);
});

module.exports = logger;