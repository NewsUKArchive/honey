import initialState from './initialState';
import { GITHUB_FETCH_ISSUES } from '../actions/githubActions';

export default function github(state = initialState.github, action) {
  const { payload } = action;

  switch (action.type) {
    case GITHUB_FETCH_ISSUES:
      console.log(payload)
      return payload;
    default:
      return state;
  }
}
