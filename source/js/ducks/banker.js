import { addLogEntry } from './logger'

const CREATE_PROCESS = 'banker/CREATE_PROCESS'
const RESOLVE_PROCESS = 'banker/RESOLVE_PROCESS'
const ALLOCATE_RESOURCES = 'banker/ALLOCATE_RESOURCES'
const WITHDRAW_RESOURCES = 'banker/WITHDRAW_RESOURCES'

export function Tick () {
  return (dispatch, getState) => {
    dispatch(generateNewTask())

    const availRes = getState().banker.resources.available
    const currProcs = getState().banker.processes.current

    if (currProcs.length) {
      const minRemProc = currProcs.reduce((p, c) => (p.rem < c.rem) ? p : c)

      if (minRemProc.rem === 0) {
        dispatch(resolveProcess(minRemProc.id))
        dispatch(addLogEntry('Resolved process ' + minRemProc.id))
      } else if (availRes >= minRemProc.rem) {
        dispatch(allocateResources(minRemProc.id, minRemProc.rem))
        dispatch(addLogEntry('Allocated resources for process ' + minRemProc.id))
      } else {
        const minAllocProc = currProcs.filter((proc) => proc.alloc > 0)
          .reduce((p, c) => (p.alloc < c.alloc) ? p : c)
        dispatch(withdrawResources(minAllocProc.id, minAllocProc.alloc))
        dispatch(addLogEntry('Deadlock! Withdrawing resources from process ' + minAllocProc.id))
      }
    }
  }
}

function generateNewTask () {
  const thresholdToSpawn = 0.5
  const chance = Math.random()

  return (dispatch, getState) => {
    const available = getState().banker.resources.available
    const allocated = getState().banker.resources.allocated
    const resources = available + allocated

    // generate a number between 1 and resources
    const newMax = Math.floor(Math.random() * resources) + 1
    // generate a number between 0 and available
    const newAlloc = Math.floor(Math.random() * available)

    const newId = getState().banker.processes.lastId + 1

    if (chance <= thresholdToSpawn) {
      dispatch(createProcess(newId, newMax, newAlloc))
      dispatch(addLogEntry('Created new task ' + newId + ' with [' + newMax + ', ' + newAlloc + ']'))
    }
  }
}

function createProcess (id, max, alloc) {
  return {
    type: CREATE_PROCESS,
    id,
    max,
    alloc
  }
}

function allocateResources (id, amount) {
  return {
    type: ALLOCATE_RESOURCES,
    id,
    amount
  }
}

function withdrawResources (id, amount) {
  return {
    type: WITHDRAW_RESOURCES,
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
    available: 1,
    allocated: 9
  },
  processes: {
    lastId: 2,
    current: [
      {id: 0, max: 4, alloc: 2, rem: 2},
      {id: 1, max: 7, alloc: 3, rem: 4},
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
      state.processes.current.push({
        id: action.id,
        max: action.max,
        alloc: action.alloc,
        rem: action.max - action.alloc
      })
      return {
        ...state,
        resources: {
          available: state.resources.available - action.alloc,
          allocated: state.resources.allocated + action.alloc
        },
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
    case WITHDRAW_RESOURCES:
      index = state.processes.current.findIndex(x => x.id === action.id)
      proc = state.processes.current[index]
      proc.alloc -= action.amount
      proc.rem += action.amount

      return {
        ...state,
        resources: {
          available: state.resources.available + action.amount,
          allocated: state.resources.allocated - action.amount
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
