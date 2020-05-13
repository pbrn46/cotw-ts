import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from './reducers'
import { AppThunk } from '../store'

type ConfigState = {
  tilePxSize: Size,
  shrouded: boolean,
}

const initialState: ConfigState = {
  tilePxSize: { width: 32, height: 32 },
  shrouded: true,
}

const slice = createSlice({
  name: 'config',
  initialState: initialState as ConfigState,
  reducers: {
    setConfig: (state, action: PayloadAction<ConfigState>) => {
      return action.payload
    },
    setShrouded: (state, action: PayloadAction<boolean>) => {
      state.shrouded = action.payload
    }
  },
})

export const { setConfig, setShrouded } = slice.actions

export default slice.reducer

export const tilePxSizeSelector = (state: RootState) => state.config.tilePxSize

export const toggleShroud = (): AppThunk => (dispatch, getState) => {
  dispatch(setShrouded(!getState().config.shrouded))
}