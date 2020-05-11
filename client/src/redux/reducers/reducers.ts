import { combineReducers } from '@reduxjs/toolkit'

import currentMap from './currentMap'
import config from './config'
import hero from './hero'
import messages from './messages'


const rootReducer = combineReducers({
  config,
  currentMap,
  hero,
  messages,
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer