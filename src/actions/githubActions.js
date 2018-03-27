import repositories from '../config/repositories';
import requestBuilder from '../helpers/requestBuilder';
import timesComponentIssues from './../data/mockgithubissuesTimesComponent.json';
import dextroseIssues from './../data/mockgithubissuesDextrose.json';

export const GITHUB_FETCH_ISSUES = 'GITHUB_ISSUES_FETCH';

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