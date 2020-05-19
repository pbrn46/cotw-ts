import React from 'react'
import CanvasTileSingle from '../CanvasTileSingle'


type ContainerWindowItemProps = {
  item: InventoryItem
  onClick: (item: InventoryItem) => void
  selected?: boolean
}
export default function ContainerWindowItem({ item, onClick, selected }: ContainerWindowItemProps) {
  return <div
    className={`ContainerWindow-Item${selected ? " selected" : ""}`}
    onClick={e => onClick(item)}
    key={item.itemListKey}>
    <div className="ContainerWindow-Item-Image">
      <CanvasTileSingle tileId={item.tileId} />
    </div>
    <div className="ContainerWindow-Item-Label">
      {item.label}
    </div>
  </div>
}