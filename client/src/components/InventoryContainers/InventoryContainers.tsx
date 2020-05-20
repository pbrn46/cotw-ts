import React from 'react'
import { useSelector } from '../../redux/store'
import './InventoryContainers.css'
import { getTilesAt, inBounds } from '../../lib/mapUtil'
import ContainerWindow from '../ContainerWindow'


export default function InventoryBags() {
  const pack = useSelector(state => state.inventory.pack)
  const heroPos = useSelector(state => state.hero.pos)
  const floorItemTiles = useSelector(state =>
    inBounds(heroPos, state.currentMap.size)
      ? getTilesAt(state.currentMap.layers.items, heroPos)
      : [])
  const floorItems = floorItemTiles.map(itemTile => itemTile.contents).flat(1)
  return <div className="InventoryBags-Wrapper">
    <div className="InventoryBags-Child">
      <ContainerWindow items={floorItems} isFloor />
    </div>
    {pack && pack.contents && (
      <div className="InventoryBags-Child">
        <ContainerWindow container={pack} items={pack.contents} />
      </div>
    )}
  </div>
}