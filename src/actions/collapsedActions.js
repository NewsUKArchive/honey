export const RELEASE_NOTE_COLLAPSED = 'RELEASE_NOTE_COLLAPSED';

export function isCollapsed(className, isCollapsed) {
  return (dispatch) => {
    var key = className;
    var collapsedState = {};
    collapsedState[key] = isCollapsed;
    
    dispatch({ type: RELEASE_NOTE_COLLAPSED , collapsedState})
  } 
}