import repositories from '../config/repositories.json';
import requestBuilder from '../helpers/requestBuilder';
import getIssueCount from '../provider/github';

export const GITHUB_FETCH_ISSUES = 'GITHUB_FETCH_ISSUES';

export function fetchIssues() {
  return (dispatch) => {
    getIssueCount(repositories)
      .then(payload => dispatch({ type: GITHUB_FETCH_ISSUES, payload }))
      .catch(error => dispatch({ type: GITHUB_FETCH_ISSUES, payload: error, error: true }));
  };
};
