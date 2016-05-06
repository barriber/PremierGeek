import React from 'react';
import {Provider} from 'react-redux';
import configureStore from '../configureStore';
import router from '../router';

const store = configureStore();

export default class Root extends React.Component {
    render() {
        return (
            <Provider store={store}>
                {router}
            </Provider>
        );
    }
}