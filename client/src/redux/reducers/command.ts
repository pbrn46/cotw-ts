import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { CommandType, getCommandLabel } from "../../lib/commands"
import { centerOfTilePx, tilePosToPx } from "../../lib/mapUtil"
import { AppThunk } from "../store"
import { setCursorPos } from "./cursor"
import { addMessage } from "./messages"


type CommandState = {
  pendingCommand: CommandType | null
}
const initialState: CommandState = {
  pendingCommand: null
}

const slice = createSlice({
  name: "command",
  initialState,
  reducers: {
    setPendingCommand: (state, action: PayloadAction<CommandType | null>) => {
      state.pendingCommand = action.payload
    }
  },
})

export default slice.reducer


// export const { setPendingCommand } = slice.actions


export const startCommand = (command: CommandType): AppThunk => (dispatch, getState) => {
  dispatch(addMessage({ message: `Pending command: ${getCommandLabel(command)}`, severity: "normal" }))
  dispatch(slice.actions.setPendingCommand(command))

  const state = getState()
  const heroPos = state.hero.pos
  const heroCenterPosPx = centerOfTilePx(tilePosToPx(heroPos, state.config.tilePxSize), state.config.tilePxSize)

  dispatch(setCursorPos(heroCenterPosPx))
}

export const cancelPendingCommand = (): AppThunk => (dispatch) => {
  dispatch(addMessage({ message: `Command cancelled.`, severity: "normal" }))
  dispatch(slice.actions.setPendingCommand(null))
}