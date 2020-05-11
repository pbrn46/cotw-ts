import { PayloadAction, createSlice, createSelector } from '@reduxjs/toolkit'
import { RootState } from './reducers'
import { tilePxSizeSelector } from './config'
import { home } from '../../maps'
import { getSurroundingPoses } from '../../lib/mapUtil'


const initialState = home

const slice = createSlice({
  name: 'currentMap',
  initialState: initialState as MapState,
  reducers: {
    setCurrentMap: (state, action: PayloadAction<MapState>) => {
      return action.payload
    },
    discoverSurroundings: (state, action: PayloadAction<Pos>) => {
      let surroundingPoses = getSurroundingPoses(action.payload, true)
      for (let pos of surroundingPoses) {
        if (pos.x < 0 || pos.y < 0) continue
        if (!state.discovered[pos.x]) state.discovered[pos.x] = []
        state.discovered[pos.x][pos.y] = true
      }
    }
  },
})

export const { setCurrentMap, discoverSurroundings } = slice.actions

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
