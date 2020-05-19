import { useCallback } from "react"
import { useDispatch, useSelector } from "../redux/store"
import { removeItemAtPos, addItemAtPos } from "../redux/reducers/currentMap"
import { addItemToContainerByListKey, removeItemFromContainerByListKey } from "../redux/reducers/inventory"


export function useInventoryDragDropHandlers(
  containerType: DragDropItemContainerType,
  targetListKey: string = "",
) {
  if (containerType === "container" && targetListKey === "") throw new Error("targetListKey required when source is a container")
  const dispatch = useDispatch()
  const heroPos = useSelector(state => state.hero.pos)

  const dragStartHandler: InventoryItemDragStartHandler = useCallback((e, item) => {
    const dragDropInventoryItem: DragDropInventoryItem = {
      source: containerType,
      itemData: item
    }
    e.dataTransfer.setData('inventoryItem', JSON.stringify(dragDropInventoryItem))
  }, [containerType])

  const dropHandler = useCallback((e: React.DragEvent) => {
    e.dataTransfer.types.includes("inventoryItem")
    e.preventDefault()
    const dragDropInventoryItem: DragDropInventoryItem =
      JSON.parse(e.dataTransfer.getData("inventoryItem"))
    // Remove from source
    switch (dragDropInventoryItem.source) {
      case "container":
        dispatch(removeItemFromContainerByListKey(dragDropInventoryItem.itemData.itemListKey))
        break
      case "floor":
        dispatch(removeItemAtPos({ pos: heroPos, item: dragDropInventoryItem.itemData }))
        break
    }

    // Add to target
    switch (containerType) {
      case "container":
        dispatch(addItemToContainerByListKey({
          containerListKey: targetListKey,
          item: dragDropInventoryItem.itemData,
        }))
        break
      case "floor":
        dispatch(addItemAtPos({
          pos: heroPos,
          item: dragDropInventoryItem.itemData,
        }))
        break
    }
    console.log("drop", dragDropInventoryItem)
  }, [containerType, dispatch, heroPos, targetListKey])

  const dragOverHandler = useCallback((e: React.DragEvent) => {
    e.dataTransfer.types.includes("inventoryItem")
    e.preventDefault()
  }, [])

  return { dragStartHandler, dropHandler, dragOverHandler }
}