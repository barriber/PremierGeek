const winston = require('winston');
const path = require('path');
const logFilePath = path.join(__dirname, '..', '..','logs', 'premierApp.log');
const mongoConnectionString = require('./globals').MONGO_CONNECTION;

const logger = new winston.Logger({
    transports: [
        new winston.transports.File({
            level: 'info',
            filename: logFilePath,
            handleException: true,
            maxsize: 5242880,
            maxFiles: 5,
            colorize: true,
            json: true
        })
        // new(winston.transports.MongoDB)({
        //     db: mongoConnectionString,
        //     collection: 'LogApp',
        //     level: 'info',
        //     capped: true,
        //     handleExceptions: true
        // })
    ],
    exitOnError: false
});

module.exports = logger;