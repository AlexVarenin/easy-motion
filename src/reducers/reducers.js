import { combineReducers } from 'redux';
import portfolioReducer from "./portfolio-reducer";

const reducers = combineReducers({
    portfolioState: portfolioReducer
});

export default reducers;