import React from 'react'
import './WorldView.css'
import { useKeyHandler } from '../../lib/keyHandler'
import CanvasLayer from '../CanvasLayer'
import { useSelector } from '../../redux/store'

export default function WorldView() {
  useKeyHandler()
  const terrainLayer = useSelector(state => state.currentMap.layers.terrain)
  const structureLayer = useSelector(state => state.currentMap.layers.structure)
  const itemsLayer = useSelector(state => state.currentMap.layers.items)
  const spritesLayer = useSelector(state => state.currentMap.layers.sprites)

  const heroPos = useSelector(state => state.hero.pos)

  return <div className="WorldView">
    <div className="WorldView-Inner">
      <CanvasLayer layer={terrainLayer} baseTile={{ tileId: 289 }} />
      <CanvasLayer layer={structureLayer} />
      <CanvasLayer layer={itemsLayer} />
      <CanvasLayer layer={spritesLayer} />
      <CanvasLayer layer={[{ tileId: 231, pos: heroPos }]} />
    </div>
  </div>
}