const bunyan = require('bunyan');
const path = require('path');
const filePath = path.join(__dirname, '..', '..', 'logs', 'foo.log')
const logger = bunyan.createLogger({
    name: 'logger',
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