import initialState from './initialState';
import { RELEASE_NOTE_COLLAPSED} from '../actions/collapsedActions';

export default function github(state = initialState.github, action) {
  switch (action.type) {
    case RELEASE_NOTE_COLLAPSED:
      return Object.assign({}, state, action.collapsedState);    
    default:
      return state;
  }
}
