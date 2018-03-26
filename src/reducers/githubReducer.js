import initialState from './initialState';
import { GITHUB_FETCH_ISSUES } from '../actions/githubActions';

export default function github(state = initialState.github, action) {
  const { payload } = action;

  switch (action.type) {
    case GITHUB_FETCH_ISSUES:
      return Object.keys(action.payload).reduce((objectToReturn, currentValue) => {
        if (!objectToReturn[currentValue]) {
          // eslint-disable-next-line no-param-reassign
          objectToReturn[currentValue] = payload[currentValue];
          // eslint-disable-next-line no-param-reassign
          objectToReturn[currentValue].issueCount = payload[currentValue].length;
        }
        return objectToReturn;
      }, {});

    default:
      return state;
  }
}
