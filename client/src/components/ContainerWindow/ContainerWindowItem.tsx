import React from 'react'
import CanvasTileSingle from '../CanvasTileSingle'


type ContainerWindowItemProps = {
  item: InventoryItem
  onMouseDown: (item: InventoryItem) => void
  selected?: boolean
  onItemDragStart: InventoryItemDragStartHandler
}
export default React.memo(function ContainerWindowItem
  ({ item, onMouseDown, selected, onItemDragStart }: ContainerWindowItemProps) {
  return <div
    className={`ContainerWindow-Item${selected ? " selected" : ""}`}
    onMouseDown={e => onMouseDown(item)}
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