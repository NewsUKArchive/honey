export const GITHUB_FETCH_ISSUES = 'GITHUB_ISSUES_FETCH';

export function fetchIssues() {
    return (dispatch) => {
        dispatch({
            type: GITHUB_FETCH_ISSUES,
            payload: {
                issues: [{
                    issue: "issue 1"
                }]
            }
        });
    };
}