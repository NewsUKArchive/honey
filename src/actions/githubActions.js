import axios from 'axios';
import repositories from '../config/repositories';
import timesComponentIssues from './../data/mockgithubissuesTimesComponent.json';
import dextroseIssues from './../data/mockgithubissuesDextrose.json';

export const GITHUB_FETCH_ISSUES = 'GITHUB_ISSUES_FETCH';

export function fetchIssues() {
    return (dispatch) => {

        const fetchRequests = [];

        Object
            .keys(repositories)
            .forEach(key => {
                const value = repositories[key];
                console.log(`Key: ${key} Value: ${value}`);

                fetchRequests.push(new Promise(resolve => {
                    axios
                        .get(`https://api.github.com/repos/${value}/issues?state=all`)
                        .then((result) => {
                            resolve({project: key, issues: result.data});
                        })
                        .catch((error) => {
                            resolve({project: key, issues: []});
                        })
                }));

            });

        Promise
            .all(fetchRequests)
            .then((results) => {
                return results.reduce((object, currentValue) => {
                    object = Object.assign(object, {
                        [currentValue.project]: currentValue.issues
                    });

                    return object;
                }, {});
            })
            .then(payload => {
                console.log('payload:', payload)
                dispatch({type: GITHUB_FETCH_ISSUES, payload});
            })
            .catch((error) => {
                dispatch({type: GITHUB_FETCH_ISSUES, payload: error, error: true});
            })
    };
}