import React, { useState, useCallback } from 'react'
import './ContainerWindow.css'
import ContainerWindowItem from './ContainerWindowItem'


type ContainerWindowProps = {
  label: string
  items: InventoryItem[]
}
export default function ContainerWindow({ label, items }: ContainerWindowProps) {
  const [selectedItemListKey, setSelectedItemListKey] = useState<string | null>(null)
  const handleItemClick = useCallback((item: InventoryItem) => {
    setSelectedItemListKey(item.itemListKey)
  }, [])
  return <div className="ContainerWindow">
    <div className="ContainerWindow-Title">{label}</div>
    <div className="ContainerWindow-Items">
      {items.map(item =>
        <ContainerWindowItem
          item={item}
          onClick={handleItemClick}
          key={item.itemListKey}
          selected={item.itemListKey === selectedItemListKey}
        />
      )}
    </div>
  </div>
}