import React from 'react'
import CanvasTileSingle from '../CanvasTileSingle'


type ContainerWindowItemProps = {
  item: InventoryItem
  onClick: (item: InventoryItem) => void
  selected?: boolean
  onItemDragStart: InventoryItemDragStartHandler
}
export default React.memo(function ContainerWindowItem
  ({ item, onClick, selected, onItemDragStart }: ContainerWindowItemProps) {
  return <div
    className={`ContainerWindow-Item${selected ? " selected" : ""}`}
    onClick={e => onClick(item)}
    draggable
    onDragStart={e => onItemDragStart(e, item)}
    key={item.itemListKey}>
    <div className="ContainerWindow-Item-Image">
      <CanvasTileSingle tileId={item.tileId} />
    </div>
    <div className="ContainerWindow-Item-Label">
      {item.label}
    </div>
  </div>
})