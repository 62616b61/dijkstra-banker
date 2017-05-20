import { addLogEntry } from './logger'

const CREATE_PROCESS = 'banker/CREATE_PROCESS'
const RESOLVE_PROCESS = 'banker/RESOLVE_PROCESS'
const ALLOCATE_RESOURCES = 'banker/ALLOCATE_RESOURCES'

export function Tick () {
  return (dispatch, getState) => {
    const newId = getState().banker.processes.lastId + 1
    dispatch(createProcess(newId, 8))
    dispatch(addLogEntry('Created new task ' + newId))

    const availRes = getState().banker.resources.available
    const currProcs = getState().banker.processes.current
    const minRemProc = currProcs.reduce((p, c) => (p.rem < c.rem) ? p : c)

    if (minRemProc.rem === 0) {
      dispatch(resolveProcess(minRemProc.id))
    } else if (availRes > minRemProc.rem) {
      dispatch(allocateResources(minRemProc.id, minRemProc.rem))
    }
  }
}

function createProcess (id, max) {
  return {
    type: CREATE_PROCESS,
    id,
    max
  }
}

function allocateResources (id, amount) {
  return {
    type: ALLOCATE_RESOURCES,
    id,
    amount
  }
}

function resolveProcess (id) {
  return {
    type: RESOLVE_PROCESS,
    id
  }
}

const INITIAL_STATE = {
  resources: {
    available: 10,
    allocated: 9
  },
  processes: {
    lastId: 2,
    current: [
      {id: 0, max: 4, alloc: 2, rem: 2},
      {id: 1, max: 6, alloc: 3, rem: 3},
      {id: 2, max: 8, alloc: 4, rem: 4}
    ],
    resolved: []
  }
}

export default function bankerReducer (state = INITIAL_STATE, action) {
  let index, proc

  switch (action.type) {
    case CREATE_PROCESS:
      state.processes.lastId++
      state.processes.current.push({id: action.id, max: action.max, alloc: 0, rem: action.max})
      return {
        ...state,
        processes: state.processes
      }
    case ALLOCATE_RESOURCES:
      index = state.processes.current.findIndex(x => x.id === action.id)
      proc = state.processes.current[index]
      proc.alloc += action.amount
      proc.rem -= action.amount

      return {
        ...state,
        resources: {
          available: state.resources.available - action.amount,
          allocated: state.resources.allocated + action.amount
        },
        processes: state.processes
      }
    case RESOLVE_PROCESS:
      index = state.processes.current.findIndex(x => x.id === action.id)
      proc = state.processes.current[index]
      state.processes.current.splice(index, 1)
      state.processes.resolved.push(proc)

      return {
        ...state,
        resources: {
          available: state.resources.available + proc.alloc,
          allocated: state.resources.allocated - proc.alloc
        },
        processes: state.processes
      }
    default:
      return state
  }
}
