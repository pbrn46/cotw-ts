import React from 'react'
import { useAppSelector } from '../../redux/store'
import { getTilesAt, inBounds } from '../../lib/mapUtil'
import ContainerWindow from '../ContainerWindow'


export default function InventoryContainers() {
  const pack = useAppSelector(state => state.inventory.pack)
  const heroPos = useAppSelector(state => state.hero.pos)
  const floorItemTiles = useAppSelector(state =>
    inBounds(heroPos, state.currentMap.size)
      ? getTilesAt(state.currentMap.layers.items, heroPos)
      : [])
  const floorItems = floorItemTiles.map(itemTile => itemTile.contents).flat(1)
  return <div className="flex min-h-0 h-full flex-col items-stretch">
    <div className="flex-grow min-h-0">
      <ContainerWindow items={floorItems} isFloor />
    </div>
    {pack && pack.contents && (
      <div className="flex-grow min-h-0">
        <ContainerWindow container={pack} items={pack.contents} />
      </div>
    )}
  </div>
}