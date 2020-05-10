import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from './reducers'

type ConfigState = {
  tilePxSize: Size,
}

const initialState: ConfigState = {
  tilePxSize: { width: 32, height: 32 },
}

const slice = createSlice({
  name: 'config',
  initialState: initialState as ConfigState,
  reducers: {
    setConfig: (state, action: PayloadAction<ConfigState>) => {
      return action.payload
    },
  },
})

export const { setConfig } = slice.actions

export default slice.reducer

export const tilePxSizeSelector = (state: RootState) => state.config.tilePxSize