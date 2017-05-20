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
      state.log.push(action.text)
      return {
        ...state,
        log: state.log
      }
    default:
      return state
  }
}
