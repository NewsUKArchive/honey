import initialState from './initialState';
import { GITHUB_FETCH_TOTAL_ISSUES, GITHUB_FETCH_OPEN_ISSUES, GITHUB_FETCH_RELEASES } from '../actions/githubActions';

export default function github(state = initialState.github, action) {
  const { payload } = action;

  switch (action.type) {
    case GITHUB_FETCH_TOTAL_ISSUES:
      return Object.assign({}, state, {totalIssues: payload});
    case GITHUB_FETCH_OPEN_ISSUES:
      return Object.assign({}, state, {openIssues: payload});
    case GITHUB_FETCH_RELEASES:
      return Object.assign({}, state, { totalReleases: payload });
    default:
      return state;
  }
}
