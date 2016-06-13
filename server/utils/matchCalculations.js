const _ = require('lodash');

module.exports = {
    getSide(homeScore, awayScore) {
        if (_.isInteger(homeScore) && _.isInteger(awayScore)) {
            if (homeScore === awayScore) {
                return 0;
            } else {
                return homeScore > awayScore ? 1 : 2;
            }
        }

        return null;
    }
};