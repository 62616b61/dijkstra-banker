const CREATE_PROCESS = 'banker/CREATE_PROCESS'
const RESOLVE_PROCESS = 'banker/RESOLVE_PROCESS'
const ALLOCATE_RESOURCES = 'banker/ALLOCATE_RESOURCES'

const INITIAL_STATE = {
  resources: {
    available: 10,
    allocated: 9
  },
  processes: {
    current: [
      {max: 4, alloc: 2, rem: 2},
      {max: 6, alloc: 3, rem: 3},
      {max: 8, alloc: 4, rem: 4}
    ],
    resolved: []
  }
}

export default function bankerReducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case CREATE_PROCESS:
      return {
        ...state,
        processes: [
          ...state.processes,
          {max: action.max, alloc: 0, rem: action.max}
        ]
      }
    case ALLOCATE_RESOURCES:
    case RESOLVE_PROCESS:
      console.log('kekz')
      return state
    default:
      return state
  }
}
