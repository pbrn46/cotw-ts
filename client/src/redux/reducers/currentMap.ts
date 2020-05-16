import { PayloadAction, createSlice, createSelector } from '@reduxjs/toolkit'
import { RootState } from './reducers'
import { tilePxSizeSelector } from './config'
import { home } from '../../maps'
import { getSurroundingPoses, getBlankMapState, make2dArray, tilesAtPos, inBounds, Size, forXY, isSamePos } from '../../lib/mapUtil'
import { AppThunk } from '../store'
import { getTilemapInfoByKey } from '../../assets/tilemap'


const initialState: MapState = getBlankMapState(Size(1, 1))

const slice = createSlice({
  name: 'currentMap',
  initialState: initialState as MapState,
  reducers: {
    setCurrentMap: (state, action: PayloadAction<MapState>) => {
      return action.payload
    },
    setDiscovered: (state, action: PayloadAction<Discovered>) => {
      state.discovered = action.payload
    },
    discoverAtPos: (state, action: PayloadAction<Pos>) => {
      let surroundingPoses = getSurroundingPoses(action.payload, true)
      for (let pos of surroundingPoses) {
        if (pos.x < 0 || pos.y < 0) continue
        if (!state.discovered[pos.x]) state.discovered[pos.x] = []
        state.discovered[pos.x][pos.y] = true
      }
    },
    openDoorAtPos: (state, action: PayloadAction<Pos>) => {
      // const newTerrain = state.layers.terrain.
      const { x, y } = action.payload
      const doorClosedTile = getTilemapInfoByKey("DOOR_CLOSED")
      const doorOpenedTile = getTilemapInfoByKey("DOOR_OPENED")
      const index = state.layers.terrain[x][y].findIndex(tile =>
        tile.tileId === doorClosedTile.tileId)
      if (index >= 0) {
        state.layers.terrain[x][y][index] = { tileId: doorOpenedTile.tileId, pos: action.payload, shouldStopOnTop: true }
      }
    },
    removeItem: (state, action: PayloadAction<ItemLayerTile>) => {
      forXY(state.size, (x, y) => {
        const index = state.layers.items[x][y].findIndex(item => isSamePos(item.pos, action.payload.pos))
        if (index >= 0) {
          state.layers.items[x][y].splice(index, 1)
        }
      })
    }
  },
})

export const { setCurrentMap, setDiscovered, discoverAtPos, openDoorAtPos, removeItem } = slice.actions

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

export const discoverSurroundings = (centerPos?: Pos): AppThunk => (dispatch, getState) => {
  const curPos = centerPos ?? getState().hero.pos
  dispatch(discoverAtPos(curPos))
  dispatch(discoverRoom(curPos))
}

export const discoverRoom = (pos: Pos): AppThunk => (dispatch, getState) => {
  const state = getState()
  const touched = make2dArray(state.currentMap.size, false)
  const discoverablePoses: Pos[] = []
  // const discovered = [...state.currentMap.discovered]
  let posesToCheck = [pos]
  let hasDiscovered = false
  while (posesToCheck.length > 0) {
    let curPos = posesToCheck.shift()
    if (!curPos || !inBounds(curPos, state.currentMap.size)) break
    const tiles = tilesAtPos(state.currentMap.layers.terrain, curPos)
    if (!tiles.some(tile => tile.isRoom && tile.isLit)) continue
    const surrounding = getSurroundingPoses(curPos, false)
    for (let surroundingPos of surrounding) {
      if (!inBounds(surroundingPos, state.currentMap.size)) continue
      if (!touched[surroundingPos.x][surroundingPos.y]) {
        touched[surroundingPos.x][surroundingPos.y] = true
        posesToCheck.push(surroundingPos)
        if (!state.currentMap.discovered?.[surroundingPos.x]?.[surroundingPos.y]) {
          discoverablePoses.push(surroundingPos)
          hasDiscovered = true
        }
      }
    }
  }
  if (hasDiscovered) {
    const newDiscovered = [...state.currentMap.discovered]
    for (let curPos of discoverablePoses) {
      if (!newDiscovered[curPos.x]) newDiscovered[curPos.x] = []
      else newDiscovered[curPos.x] = [...newDiscovered[curPos.x]]
      newDiscovered[curPos.x][curPos.y] = true
    }
    dispatch(setDiscovered(newDiscovered))
  }
}

export const loadMap = (): AppThunk => (dispatch) => {
  dispatch(setCurrentMap(home))
}
