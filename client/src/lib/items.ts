import { getTileIdByKey } from "./tilemap"
import { uniqueKey } from "./mapUtil"


type ItemData = Omit<InventoryItem, "itemListKey">

const createItemDataByKey = <T extends Record<keyof T, ItemData>>(obj: T): T => {
  return obj
}

const testItemProps: Omit<ItemData, "tileId" | "itemType" | "label"> = {
  weight: 5,
  bulk: 5,
  sellValue: 25,
  buyValue: 100,
}
export const itemDataByKey = createItemDataByKey({
  "BAG_SMALL": {
    tileId: getTileIdByKey("BAG"),
    label: "Small Bag",
    contents: [],
    itemType: "container",
    ...testItemProps,
  },
  "CHEST_SMALL": {
    tileId: getTileIdByKey("CHEST"),
    label: "Small Chest",
    contents: [],
    itemType: "container",
    ...testItemProps,
  },
  "PACK_SMALL": {
    tileId: getTileIdByKey("PACK"),
    label: "Small Pack",
    contents: [],
    itemType: "container",
    ...testItemProps,
  },
  "POTION1": {
    tileId: getTileIdByKey("POTION"),
    label: "Potion 1",
    itemType: "potion",
    ...testItemProps,
  },
  "RING1": {
    tileId: getTileIdByKey("RING"),
    label: "Ring 1",
    itemType: "ring",
    ...testItemProps,
  }
})

export type ItemKeys = keyof typeof itemDataByKey
export const itemKeys = Object.keys(itemDataByKey) as ItemKeys[]

export function getItemDataByKey(key: ItemKeys): ItemData {
  const item = itemDataByKey[key]
  if (!item) throw new Error("Invalid item key")
  return item
}

export function makeItemByKey(key: ItemKeys, otherProps?: Partial<Omit<InventoryItem, "itemlistKey">>): InventoryItem {
  const item: InventoryItem = {
    ...getItemDataByKey(key),
    itemListKey: uniqueKey(),
    ...otherProps,
  }
  return item
}

export function randomItemKey(): ItemKeys {
  return itemKeys[Math.floor(Math.random() * itemKeys.length)]
}