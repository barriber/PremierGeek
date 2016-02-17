var React = require('react');
//var Provider = require('react-redux').Provider;
var TeamList = require('../components/TeamList');
var configureStore = require('../configureStore');

//const store = configureStore();
/* <Provider store={store}>
 <TeamList/>
 </Provider> */
module.exports = React.createClass({
    render: function () {
        return (
            <div>
                <TeamList/>
            </div>);
    }
});