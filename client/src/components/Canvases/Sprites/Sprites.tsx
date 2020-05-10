import React, { useRef, useEffect } from 'react'
import { useSelector } from '../../../redux/store'
import { currentMapPxSizeSelector } from '../../../redux/reducers/currentMap'
import { useDrawTile } from '../../../lib/drawUtil'


export default function Structures() {
  const mapPxSize = useSelector(currentMapPxSizeSelector)
  const spritesLayer = useSelector(state => state.currentMap.layers.sprites)
  const heroPos = useSelector(state => state.hero.pos)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const draw = useDrawTile(canvasRef.current, "original")

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, mapPxSize.width, mapPxSize.height)
    for (let layerTile of spritesLayer) {
      draw(layerTile.tileId, layerTile.pos)
    }
    // Draw hero
    draw(231, heroPos)

  }, [draw, heroPos, mapPxSize.height, mapPxSize.width, spritesLayer])

  return <canvas ref={canvasRef} width={mapPxSize.width} height={mapPxSize.height} />
}