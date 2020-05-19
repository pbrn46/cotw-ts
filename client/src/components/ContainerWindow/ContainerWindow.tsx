import React, { useState, useCallback } from 'react'
import './ContainerWindow.css'
import ContainerWindowItem from './ContainerWindowItem'
import { useInventoryDragDropHandlers } from '../../lib/inventoryDragDrop'


type ContainerWindowProps = {
  label: string
  items: InventoryItem[]
  isFloor: true
  container?: never
} | {
  label: string
  items: InventoryItem[]
  isFloor?: false
  container: InventoryItem
}
export default function ContainerWindow({ label, items, container, isFloor = false }: ContainerWindowProps) {
  const [selectedItemListKey, setSelectedItemListKey] = useState<string | null>(null)
  const handleItemClick = useCallback((item: InventoryItem) => {
    setSelectedItemListKey(item.itemListKey)
  }, [])

  const { dragStartHandler, dragOverHandler, dropHandler } =
    useInventoryDragDropHandlers(isFloor ? "floor" : "container", container?.itemListKey)

  return <div className="ContainerWindow">
    <div className="ContainerWindow-Title">{label}</div>
    <div className="ContainerWindow-Items"
      onDrop={dropHandler}
      onDragOver={dragOverHandler}
    >
      {items.map(item =>
        <ContainerWindowItem
          item={item}
          onClick={handleItemClick}
          key={item.itemListKey}
          selected={item.itemListKey === selectedItemListKey}
          onItemDragStart={dragStartHandler}
        />
      )}
    </div>
  </div>
}