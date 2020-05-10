import { PayloadAction, createSlice, createSelector } from '@reduxjs/toolkit'
import { RootState } from './reducers'
import { tilePxSizeSelector } from './config'
import { home } from '../../maps'


const initialState = home

const slice = createSlice({
  name: 'currentMap',
  initialState: initialState as MapState,
  reducers: {
    setCurrentMap: (state, action: PayloadAction<MapState>) => {
      return action.payload
    },
  },
})

export const { setCurrentMap } = slice.actions

export default slice.reducer

export const currentMapSelector = (state: RootState) => state.currentMap
export const currentMapSizeSelector = (state: RootState) => state.currentMap.size

export const currentMapPxSizeSelector = createSelector(
  currentMapSizeSelector,
  tilePxSizeSelector,
  (currentMapSize, tilePxSize) => {
    return {
      width: currentMapSize.width * tilePxSize.width,
      height: currentMapSize.height * tilePxSize.height,
    } as Size
  }
)
