import { combineReducers } from 'redux'
import banker from './banker'
import timer from './timer'
import logger from './logger'

const rootReducer = combineReducers({
  banker,
  timer,
  logger
})

export default rootReducer
