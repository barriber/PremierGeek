console.log('=====enter deploy.js ==========')
if (process.env.NODE_ENV === 'production') {
    console.log('=====PRODUCTION MODE ==========')
    var child_process = require('child_process');
    child_process.exec("webpack -p --config webpack.production.config.js", function (error, stdout, stderr) {
        if (error !== null) {
            console.log('exec error: ' + error);
        }
    });
}