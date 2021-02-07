import { combineReducers } from "@reduxjs/toolkit"

import command from "./command"
import config from "./config"
import currentMap from "./currentMap"
import cursor from "./cursor"
import hero from "./hero"
import messages from "./messages"
import inventory from "./inventory"


const rootReducer = combineReducers({
  command,
  config,
  currentMap,
  cursor,
  hero,
  messages,
  inventory,
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer