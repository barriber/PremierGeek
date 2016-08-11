const bunyan = require('bunyan');
const path = require('path');
const filePath = path.join(__dirname, '..', '..', 'logs', 'premierLogger.log')
function reqSerializer(req) {
    return {
        url: req.url,
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