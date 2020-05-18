import React from 'react'
import { Typography } from '@material-ui/core'
import { useSelector } from '../../redux/store'
import CanvasTileSingle from '../CanvasTileSingle'
import './InventoryBags.css'
import { getTilesAt } from '../../lib/mapUtil'


export default function InventoryBags() {
  const pack = useSelector(state => state.inventory.pack)
  const heroPos = useSelector(state => state.hero.pos)
  const floorItems = useSelector(state => getTilesAt(state.currentMap.layers.items, heroPos))
  return <div className="InventoryBags-Wrapper">
    <div>
      <Typography>Floor</Typography>
      {floorItems.map(itemTile => <span key={itemTile.itemData.itemListKey}>
        <CanvasTileSingle tileId={itemTile.itemData.tileId} />
        {itemTile.itemData.label}
      </span>)}
    </div>
    {pack && (
      <div>
        <Typography>{pack.label}</Typography>
        {pack.contents && pack.contents.map(item => <span key={item.itemListKey}>
          <CanvasTileSingle tileId={item.tileId} />
          {item.label}
        </span>)}
      </div>
    )}
  </div>
}