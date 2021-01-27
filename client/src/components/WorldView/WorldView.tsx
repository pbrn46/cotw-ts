import React, { useRef, useMemo } from 'react'
import './WorldView.css'
import { useScrollWatcher } from '../../lib/scroll'
import CanvasLayer from '../CanvasLayer'
import { useAppSelector } from '../../redux/store'
import { make2dArray, isSamePos, Pos, makeTileByKey } from '../../lib/mapUtil'
import ClickLayer from '../ClickLayer'

export default function WorldView() {
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const terrainLayer = useAppSelector(state => state.currentMap.layers.terrain)
  const structureLayer = useAppSelector(state => state.currentMap.layers.structure)
  const itemsLayer = useAppSelector(state => state.currentMap.layers.items)
  const spritesLayer = useAppSelector(state => state.currentMap.layers.sprites)

  const heroPos = useAppSelector(state => state.hero.pos)

  const mapSize = useAppSelector(state => state.currentMap.size)
  const heroLayer = useMemo(() => {
    return make2dArray(mapSize, (x, y) => isSamePos(Pos(x, y), heroPos)
      ? [makeTileByKey("HERO_MALE", heroPos)]
      : []
    )
  }, [heroPos, mapSize])

  useScrollWatcher(scrollRef)

  return <div className="WorldView">
    <div className="WorldView-Inner" ref={scrollRef} >
      <ClickLayer>
        <CanvasLayer layer={terrainLayer} />
        <CanvasLayer layer={structureLayer} />
        <CanvasLayer layer={itemsLayer} />
        <CanvasLayer layer={spritesLayer} />
        <CanvasLayer layer={heroLayer} />
      </ClickLayer>
    </div>
  </div>
}