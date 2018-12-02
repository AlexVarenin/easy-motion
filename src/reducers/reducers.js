import { combineReducers } from 'redux';
import formReducer from "./form-reducer";
import portfolioReducer from "./portfolio-reducer";

const reducers = combineReducers({
    formState: formReducer,
    portfolioState: portfolioReducer
});

export default reducers;