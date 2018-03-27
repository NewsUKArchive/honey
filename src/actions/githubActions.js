import repositories from '../config/repositories';
import requestBuilder from '../helpers/requestBuilder';

export const GITHUB_FETCH_ISSUES = 'GITHUB_FETCH_ISSUES';

export function fetchIssues() {
    return (dispatch) => {

        Promise
            .all(requestBuilder.buildIssueRequests(repositories))
            .then((results) => {
                return results.reduce((object, currentValue) => {
                    return Object.assign(object, {
                        [currentValue.project]: currentValue.issues
                    });
                }, {});
            })
            .then(payload => dispatch({type: GITHUB_FETCH_ISSUES, payload}))
            .catch((error) => dispatch({type: GITHUB_FETCH_ISSUES, payload: error, error: true}));
    };
}