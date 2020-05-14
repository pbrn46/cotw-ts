import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from './reducers'
import { AppThunk } from '../store'

type ConfigState = {
  tilePxSize: Size,
  srhoudMode: ShroudMode,
}

const initialState: ConfigState = {
  tilePxSize: { width: 32, height: 32 },
  srhoudMode: "hidden",
}

const slice = createSlice({
  name: 'config',
  initialState: initialState as ConfigState,
  reducers: {
    setConfig: (state, action: PayloadAction<ConfigState>) => {
      return action.payload
    },
    setShroudMode: (state, action: PayloadAction<ShroudMode>) => {
      state.srhoudMode = action.payload
    }
  },
})

export const { setConfig, setShroudMode } = slice.actions

export default slice.reducer

export const tilePxSizeSelector = (state: RootState) => state.config.tilePxSize

export const cycleShroudMode = (): AppThunk => (dispatch, getState) => {
  let nextMode: ShroudMode
  switch (getState().config.srhoudMode) {
    case "alpha":
      nextMode = "hidden"
      break
    case "hidden":
      nextMode = "visible"
      break
    case "visible":
    default:
      nextMode = "alpha"
      break
  }
  dispatch(setShroudMode(nextMode))
}