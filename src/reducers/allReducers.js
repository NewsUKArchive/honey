import { combineReducers } from 'redux';
import github from './githubReducer';
import collapsed from './collapsedReducer';

const rootReducer = combineReducers({
  github,
  collapsed,
});

export default rootReducer;
