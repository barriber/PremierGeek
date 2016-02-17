var guid = require('guid');
var listeners = {};


module.exports = {
    register: function(cb) {
        var id = guid.raw();
        listeners[id] = callback;

        return id;
    },
    dispatcher: function(playload) {
        console.info('patching....', playload);
        for(var id in listeners) {
            var listener = listeners[id];
            listener(playload);
        }
    }
}