import { combineReducers } from '@reduxjs/toolkit'

import currentMap from './currentMap'
import config from './config'
import hero from './hero'


const rootReducer = combineReducers({
  config,
  currentMap,
  hero,
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer