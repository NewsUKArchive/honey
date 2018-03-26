import {combineReducers} from 'redux';
import github from './githubReducer';

const rootReducer = combineReducers({
  github
});

export default rootReducer;