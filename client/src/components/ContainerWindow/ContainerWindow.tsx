import React, { useState, useCallback } from 'react'
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

  return <div className="border border-black flex flex-col h-full">
    <div className="text-white bg-[#000080] p-0.5 flex-shrink">{label}</div>
    <div className="h-full overflow-y-scroll flex-grow bg-white"
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