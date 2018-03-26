import initialState from './initialState';
import {GITHUB_FETCH_ISSUES} from '../actions/githubActions';

export default function github(state = initialState.github, action) {
  switch (action.type) {
    case GITHUB_FETCH_ISSUES:
      console.log('GITHUB_FETCH_ISSUES Action');
      return Object.assign({}, action.payload);
    default:
      return state;
  }
}