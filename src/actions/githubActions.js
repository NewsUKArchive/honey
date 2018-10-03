import repositories from '../config/repositories.json';
import github from '../provider/github';

export const GITHUB_FETCH_TOTAL_ISSUES = 'GITHUB_FETCH_TOTAL_ISSUES';
export const GITHUB_FETCH_OPEN_ISSUES = 'GITHUB_FETCH_OPEN_ISSUES';
export const GITHUB_FETCH_RELEASES = 'GITHUB_FETCH_RELEASES';

export function fetchTotalIssues() {
  return (dispatch) => {
    Promise.all(github.getTotalIssueCountFor(repositories))
      .then(payload => dispatch({ type: GITHUB_FETCH_TOTAL_ISSUES, payload }))
      .catch(error => dispatch({ type: GITHUB_FETCH_TOTAL_ISSUES, payload: error, error: true }));
  };
}

export function fetchOpenIssues() {
  return (dispatch) => {
    Promise.all(github.getOpenIssueCountFor(repositories))
      .then(payload => dispatch({ type: GITHUB_FETCH_OPEN_ISSUES, payload }))
      .catch(error => dispatch({ type: GITHUB_FETCH_OPEN_ISSUES, payload: error, error: true }));
  };
}

export function fetchReleases() {
  return (dispatch) => {
    Promise.all(github.getLatestPreReleaseCountFor(repositories))
      .then(payload => dispatch({ type: GITHUB_FETCH_RELEASES, payload}))
      .catch(error => dispatch({type: GITHUB_FETCH_RELEASES, payload: error, error: true}));
  };
}