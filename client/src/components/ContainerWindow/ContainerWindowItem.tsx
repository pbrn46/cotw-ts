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
    className={`p-0 inline-block w-20 h-20 text-center text-sm border border-dashed border-white ${selected ? "!border-red-600" : ""} hover:border-[#c0c0c0] `}
    onMouseDown={e => onMouseDown(item)}
    draggable
    onDragStart={e => onItemDragStart(e, item)}
    key={item.itemListKey}>
    <div className="flex flex-col items-center justify-center h-full">
      <CanvasTileSingle tileId={item.tileId} />
      {item.label}
    </div>
  </div>
})