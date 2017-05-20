import { combineReducers } from 'redux'
import banker from './banker'
import timer from './timer'

const rootReducer = combineReducers({
  banker,
  timer
})

export default rootReducer
