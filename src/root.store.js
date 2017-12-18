import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './root.reducer';

const middleware = [];
middleware.push(thunk);

// eslint-disable-next-line no-undef
if (__DEV__) {
    const logger = createLogger({ collapsed: true });
    middleware.push(logger);
}

export default function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        compose(applyMiddleware(...middleware))
    );
}
