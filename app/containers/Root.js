import React, {Component} from 'react';
import {Provider} from 'react-redux';
import configureStore from '../configureStore';
import TeamList from './../components/TeamList';

//const store = configureStore();

export default class Root extends Component {
    render() {
        return (
            <div>
                <TeamList/>
            </div>

        );
    }
}


//<Provider store={store}>
//    <TeamList/>
//</Provider>