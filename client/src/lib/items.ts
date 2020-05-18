import { getTileIdByKey } from "./tilemap"
import { uniqueKey } from "./mapUtil"


type ItemDataItem = Omit<InventoryItemData, "itemListKey">

const createItemDataByKey = <T extends Record<keyof T, ItemDataItem>>(obj: T): T => {
  return obj
}

export const itemDataByKey = createItemDataByKey({
  "BAG_SMALL": {
    tileId: getTileIdByKey("BAG"),
    weight: 5,
    bulk: 5,
    sellValue: 25,
    buyValue: 100,
    label: "Small Bag",
    contents: [],
    itemType: "container",
  },
  "PACK_SMALL": {
    tileId: getTileIdByKey("PACK"),
    weight: 5,
    bulk: 5,
    sellValue: 25,
    buyValue: 25,
    label: "Small Pack",
    contents: [],
    itemType: "container",
  }
})

export type ItemKeys = keyof typeof itemDataByKey

export function getItemByKey(key: ItemKeys): ItemDataItem {
  const item = itemDataByKey[key]
  if (!item) throw new Error("Invalid item key")
  return item
}

export function makeItemByKey(key: ItemKeys): InventoryItemData {
  const item: InventoryItemData = {
    ...getItemByKey(key),
    itemListKey: uniqueKey(),
  }
  return item
}