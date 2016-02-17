var combineReducers = require('redux').combineReducers;

function basicReducer(state = {}, action) {
    switch (action.type) {

    }
}

const rootReducer = combineReducers({
    basicReducer
});

export  default rootReducer;