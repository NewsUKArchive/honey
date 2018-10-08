export const RELEASE_NOTE_COLLAPSED = 'RELEASE_NOTE_COLLAPSED';

export function isCollapsed(className, collapsed) {
  return (dispatch) => {
    const key = className;
    const collapsedState = {};
    collapsedState[key] = collapsed;

    dispatch({ type: RELEASE_NOTE_COLLAPSED, collapsedState });
  };
}
