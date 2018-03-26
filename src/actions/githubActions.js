import timesComponentIssues from  './../data/mockgithubissuesTimesComponent.json';
import dextroseIssues from  './../data/mockgithubissuesDextrose.json';

export const GITHUB_FETCH_ISSUES = 'GITHUB_ISSUES_FETCH';

export function fetchIssues() {
    return (dispatch) => {
        dispatch({
            type: GITHUB_FETCH_ISSUES,
            payload: {
                timescomponents: timesComponentIssues,
                dextrose: dextroseIssues
            }
        });
    };
}