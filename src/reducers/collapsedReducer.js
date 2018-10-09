import initialState from './initialState';
import { RELEASE_NOTE_COLLAPSED } from '../actions/collapsedActions';

export default function github(state = initialState.github, action) {
  return {
    [RELEASE_NOTE_COLLAPSED]: Object.assign({}, state, action.collapsedState)
  }[action.type] || state;
}
