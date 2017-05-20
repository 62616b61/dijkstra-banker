const ADD_ENTRY = 'logger/ADD_ENTRY'

export function addLogEntry (text) {
  return {
    type: ADD_ENTRY,
    text
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
          ...state.log,
          action.text
        ]
      }
    default:
      return state
  }
}
