import React from 'react'
import CanvasTileSingle from '../CanvasTileSingle'
import './ContainerWindow.css'


type ContainerWindowProps = {
  label: string
  items: InventoryItem[]
}
export default function ContainerWindow({ label, items }: ContainerWindowProps) {
  return <div className="ContainerWindow">
    <div className="ContainerWindow-Title">{label}</div>
    <div className="ContainerWindow-Items">
      {items.map(item => <div className="ContainerWindow-Item" key={item.itemListKey}>
        <div className="ContainerWindow-Item-Image">
          <CanvasTileSingle tileId={item.tileId} />
        </div>
        <div className="ContainerWindow-Item-Label">
          {item.label}
        </div>
      </div>)}
    </div>
  </div>
}