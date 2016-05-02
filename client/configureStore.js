import {createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/reducers';
import thunkMiddleware from 'redux-thunk'

export default function configureStore() {
    const store =  createStore(rootReducer, applyMiddleware(thunkMiddleware));

    //if (module.hot) {
    //    // Enable Webpack hot module replacement for reducers
    //    module.hot.accept('./reducers/reducerss', () => {
    //        console.log('----------------');
    //        const nextRootReducer = require('./reducers/reducers/index');
    //        console.log(nextRootReducer);
    //        store.replaceReducer(nextRootReducer);
    //    });
    //}

    return store;
}