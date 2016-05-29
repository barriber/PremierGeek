import {createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/reducers';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {Iterable} from 'immutable';

const logger = createLogger({
    stateTransformer: (state) => {
        let newState = {};

        for (var i of Object.keys(state)) {
            if (Iterable.isIterable(state[i])) {
                newState[i] = state[i].toJS();
            } else {
                newState[i] = state[i];
            }
        };

        return newState;
    }
});
// const middlewares = [thunk];
// if (process.env.NODE_ENV === `development`) {
//     middlewares.push(logger);
// }
export default function configureStore() {
    const store =  createStore(rootReducer, applyMiddleware(thunkMiddleware, logger));

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