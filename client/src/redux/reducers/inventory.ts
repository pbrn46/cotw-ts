import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { makeItemByKey } from '../../lib/items'


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
  freeHand: makeItemByKey("CHEST_SMALL", {
    contents: [
      makeItemByKey("BAG_SMALL")
    ]
  }),
  rightRing: null,
  leftRing: null,
  belt: null,
  boots: null,
  pack: makeItemByKey("PACK_SMALL", {
    contents: [
      makeItemByKey("POTION1"),
      makeItemByKey("BAG_SMALL"),
    ]
  }),
  purse: null,
}
const slice = createSlice({
  name: 'inventory',
  initialState: initialState as InventoryState,
  reducers: {
    setInventory: (state, action: PayloadAction<InventoryState>) => {
      return action.payload
    },
    addItemToPack: (state, action: PayloadAction<InventoryItem>) => {
      state.pack?.contents?.push(action.payload)
    }
  },
})

export const { setInventory, addItemToPack } = slice.actions

export default slice.reducer
