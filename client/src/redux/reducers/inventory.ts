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
    },
    addItemToContainerByListKey: (state, action: PayloadAction<{ containerListKey: string, item: InventoryItem }>) => {
      if (state.pack) {
        recurseAddItemToContainerByListKey(
          state.pack, action.payload.containerListKey, action.payload.item)
      }
      if (state.freeHand) {
        recurseAddItemToContainerByListKey(
          state.freeHand, action.payload.containerListKey, action.payload.item)
      }
    },
    removeItemFromContainerByListKey: (state, action: PayloadAction<string>) => {
      if (state.pack) {
        recurseRemoveItemFromContainerByListKey(state.pack, action.payload)
      }
      if (state.freeHand) {
        recurseRemoveItemFromContainerByListKey(state.freeHand, action.payload)
      }
    },
  }
})

// Add item to container by container list key
function recurseAddItemToContainerByListKey(container: InventoryItem, containerListKey: string, item: InventoryItem): boolean {
  if (!container.contents) return false
  if (container.itemListKey === containerListKey) {
    container.contents.push({ ...item })
    return true
  }
  for (let containerItem of container.contents) {
    if (recurseAddItemToContainerByListKey(containerItem, containerListKey, item)) {
      return true
    }
  }
  return false
}
/** Remove item from container by item list key */
function recurseRemoveItemFromContainerByListKey(container: InventoryItem, itemListKey: string): boolean {
  if (!container.contents) return false
  for (let i = 0; i < container.contents.length; i++) {
    const containerItem = container.contents[i]
    if (containerItem.itemListKey === itemListKey) {
      container.contents.splice(i, 1)
      return true
    }
    if (recurseRemoveItemFromContainerByListKey(containerItem, itemListKey)) {
      return true
    }
  }
  return false
}

export const { setInventory, addItemToPack, addItemToContainerByListKey, removeItemFromContainerByListKey } = slice.actions

export default slice.reducer
