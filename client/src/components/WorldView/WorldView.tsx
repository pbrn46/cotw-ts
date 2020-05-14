import React, { useRef } from 'react'
import './WorldView.css'
import { useScrollWatcher } from '../../lib/scroll'
import { useKeyHandler } from '../../lib/keyHandler'
import CanvasLayer from '../CanvasLayer'
import { useSelector } from '../../redux/store'
import { getTilemapInfoByKey } from '../../assets/tilemap'

export default function WorldView() {
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const absoluteRef = useRef<HTMLDivElement | null>(null)
  const terrainLayer = useSelector(state => state.currentMap.layers.terrain)
  const structureLayer = useSelector(state => state.currentMap.layers.structure)
  const itemsLayer = useSelector(state => state.currentMap.layers.items)
  const spritesLayer = useSelector(state => state.currentMap.layers.sprites)

  const heroPos = useSelector(state => state.hero.pos)

  useKeyHandler()

  useScrollWatcher(scrollRef, absoluteRef)

  return <div className="WorldView">
    <div className="WorldView-Inner" ref={scrollRef}>
      <div
        className="WorldView-Absolute"
        ref={absoluteRef} />
      <CanvasLayer layer={terrainLayer} />
      <CanvasLayer layer={structureLayer} />
      <CanvasLayer layer={itemsLayer} />
      <CanvasLayer layer={spritesLayer} />
      <CanvasLayer layer={[{ tileId: 231, pos: heroPos }]} />
    </div>
  </div>
}