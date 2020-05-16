import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { getTilemapInfoByKey } from '../../assets/tilemap'
import { uniqueKey } from '../../lib/mapUtil'


type EquippedItem = InventoryItem | null


type InventoryState = Record<EquippableType, EquippedItem>

const initialState: InventoryState = {
  armor: null,
  neckwear: null,
  overgarment: null,
  helmet: null,
  shield: null,
  bracers: null,
  gauntlets: null,
  weapon: null,
  freeHand: null,
  rightRing: null,
  leftRing: null,
  belt: null,
  boots: null,
  pack: {
    itemKey: uniqueKey(),
    tileId: getTilemapInfoByKey("PACK").tileId,
    itemType: "container",
    contents: [],
    weight: 500,
    bulk: 500,
    sellValue: 50,
    buyValue: 100
  },
  purse: null,
}
const slice = createSlice({
  name: 'inventory',
  initialState: initialState as InventoryState,
  reducers: {
    setInventory: (state, action: PayloadAction<InventoryState>) => {
      return action.payload
    },
  },
})

export const { setInventory } = slice.actions

export default slice.reducer
