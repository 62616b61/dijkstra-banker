const ADD_ENTRY = 'logger/ADD_ENTRY'

export function addLogEntry (text) {
  return (dispatch, getState) => {
    const tick = getState().timer.ticks
    dispatch({
      type: ADD_ENTRY,
      tick,
      text
    })
  }
}

const INITIAL_STATE = {
  log: []
}

export default function loggerReducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_ENTRY:
      return {
        ...state,
        log: [
          action.tick + ': ' + action.text,
          ...state.log
        ]
      }
    default:
      return state
  }
}
