import React from 'react'
import { Typography } from '@material-ui/core'
import CanvasTileSingle from '../CanvasTileSingle'
import './ContainerWindow.css'


type ContainerWindowProps = {
  label: string
  items: InventoryItem[]
}
export default function ContainerWindow({ label, items }: ContainerWindowProps) {
  return <div>
    <Typography>{label}</Typography>
    {items.map(item => <div className="ContainerWindow-Item" key={item.itemListKey}>
      <div className="ContainerWindow-Item-Image">
        <CanvasTileSingle tileId={item.tileId} />
      </div>
      <div className="ContainerWindow-Item-Label">
        {item.label}
      </div>
    </div>)}
  </div>
}