import React, { useRef, useMemo } from 'react'
import './WorldView.css'
import { useScrollWatcher } from '../../lib/scroll'
import CanvasLayer from '../CanvasLayer'
import { useSelector } from '../../redux/store'
import { getTilemapInfoByKey } from '../../assets/tilemap'
import { make2dArray, isSamePos, Pos } from '../../lib/mapUtil'

export default function WorldView() {
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const absoluteRef = useRef<HTMLDivElement | null>(null)
  const terrainLayer = useSelector(state => state.currentMap.layers.terrain)
  const structureLayer = useSelector(state => state.currentMap.layers.structure)
  const itemsLayer = useSelector(state => state.currentMap.layers.items)
  const spritesLayer = useSelector(state => state.currentMap.layers.sprites)

  const heroPos = useSelector(state => state.hero.pos)

  const mapSize = useSelector(state => state.currentMap.size)
  const heroLayer = useMemo(() => {
    return make2dArray(mapSize, (x, y) => isSamePos(Pos(x, y), heroPos)
      ? [{ tileId: getTilemapInfoByKey("HERO_MALE").tileId, pos: heroPos }]
      : []
    )
  }, [heroPos, mapSize])

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
      <CanvasLayer layer={heroLayer} />
    </div>
  </div>
}