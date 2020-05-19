/** Add item to container by container list key. Mutates the array. */
export function recurseAddItemToContainerByListKey(container: InventoryItem, containerListKey: string, item: InventoryItem): boolean {
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
/** Remove item from container by item list key. Mutates the array. */
export function recurseRemoveItemFromContainerByListKey(container: InventoryItem, itemListKey: string): boolean {
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