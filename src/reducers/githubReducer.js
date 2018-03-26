import initialState from './initialState';
import { GITHUB_FETCH_ISSUES } from '../actions/githubActions';


export default function github(state = initialState.github, action) {
  const payload = action.payload;

  switch (action.type) {
    case GITHUB_FETCH_ISSUES:
      return Object.keys(action.payload).reduce((objectToReturn, currentValue) => {
        if (!objectToReturn[currentValue]) {
          objectToReturn[currentValue] = payload[currentValue];
          objectToReturn[currentValue].issueCount = payload[currentValue].length;
        }
        return objectToReturn;
      }, {});

    default:
      return state;
  }
}
