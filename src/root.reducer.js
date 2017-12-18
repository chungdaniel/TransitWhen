import { combineReducers } from 'redux';
import { busReducer } from 'bus/bus.reducer';

const rootReducer = combineReducers({
    bus: busReducer
});

export default rootReducer;
