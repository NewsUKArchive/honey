import initialState from './initialState';
import { GITHUB_FETCH_TOTAL_ISSUES, GITHUB_FETCH_OPEN_ISSUES, GITHUB_FETCH_RELEASES } from '../actions/githubActions';

export default function github(state = initialState.github, action) {
  const { payload } = action;

  return {
    [GITHUB_FETCH_TOTAL_ISSUES]: Object.assign({}, state, { totalIssues: payload }),
    [GITHUB_FETCH_OPEN_ISSUES]: Object.assign({}, state, { openIssues: payload }),
    [GITHUB_FETCH_RELEASES]: Object.assign({}, state, { totalReleases: payload })
  }[action.type] || state;
}
