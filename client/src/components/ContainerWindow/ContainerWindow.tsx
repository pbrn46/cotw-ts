import React, { useState, useCallback } from 'react'
import './ContainerWindow.css'
import ContainerWindowItem from './ContainerWindowItem'
import { useInventoryDragDropHandlers } from '../../lib/inventoryDragDrop'


type ContainerFloorWindowProps = {
  items: InventoryItem[]
  isFloor: true
  container?: undefined
}
type ContainerPackWindowProps = {
  items: InventoryItem[]
  isFloor?: false
  container: InventoryItem
}

type ContainerWindowProps = ContainerFloorWindowProps | ContainerPackWindowProps
export default function ContainerWindow({ items, container, isFloor = false }: ContainerWindowProps) {
  const [selectedItemListKey, setSelectedItemListKey] = useState<string | null>(null)
  const handleItemMouseDown = useCallback((item: InventoryItem) => {
    setSelectedItemListKey(item.itemListKey)
  }, [])

  const { dragStartHandler, dragOverHandler, dropHandler } =
    useInventoryDragDropHandlers(isFloor ? "floor" : "container", container?.itemListKey)

  const label = isFloor ? "Floor" : container?.label ?? ""

  return <div className="ContainerWindow">
    <div className="ContainerWindow-Title">{label}</div>
    <div className="ContainerWindow-Items"
      onDrop={dropHandler}
      onDragOver={dragOverHandler}
    >
      {items.map(item =>
        <ContainerWindowItem
          item={item}
          onMouseDown={handleItemMouseDown}
          key={item.itemListKey}
          selected={item.itemListKey === selectedItemListKey}
          onItemDragStart={dragStartHandler}
        />
      )}
    </div>
  </div>
}