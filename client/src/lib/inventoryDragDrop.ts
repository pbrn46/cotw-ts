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
      item: item
    }
    e.dataTransfer.setData('text/inventoryitem', JSON.stringify(dragDropInventoryItem))
  }, [containerType])

  const dropHandler = useCallback((e: React.DragEvent) => {
    if (!e.dataTransfer.types.includes("text/inventoryitem")) return
    e.preventDefault()
    const dragDropInventoryItem: DragDropInventoryItem =
      JSON.parse(e.dataTransfer.getData("text/inventoryitem"))

    // Remove from source
    switch (dragDropInventoryItem.source) {
      case "container":
        dispatch(removeItemFromContainerByListKey(dragDropInventoryItem.item.itemListKey))
        break
      case "floor":
        dispatch(removeItemAtPos({ pos: heroPos, item: dragDropInventoryItem.item }))
        break
    }

    // Add to target
    switch (containerType) {
      case "container":
        dispatch(addItemToContainerByListKey({
          containerListKey: targetListKey,
          item: dragDropInventoryItem.item,
        }))
        break
      case "floor":
        dispatch(addItemAtPos({
          pos: heroPos,
          item: dragDropInventoryItem.item,
        }))
        break
    }
    // TODO: What if it's a container on the floor?

  }, [containerType, dispatch, heroPos, targetListKey])

  const dragOverHandler = useCallback((e: React.DragEvent) => {
    if (!e.dataTransfer.types.includes("text/inventoryitem")) return
    e.dataTransfer.dropEffect = "move"
    e.preventDefault()
  }, [])

  return { dragStartHandler, dropHandler, dragOverHandler }
}