import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { makeItemByKey } from '../../lib/items'


type EquippedItem = InventoryItemData | null


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
  pack: makeItemByKey("PACK_SMALL"),
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
