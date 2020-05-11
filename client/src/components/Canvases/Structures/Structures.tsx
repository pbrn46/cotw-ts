import React, { useRef, useEffect } from 'react'
import { useSelector } from '../../../redux/store'
import { currentMapPxSizeSelector } from '../../../redux/reducers/currentMap'
import { useDrawTile } from '../../../lib/drawUtil'


export default function Structures() {
  const mapPxSize = useSelector(currentMapPxSizeSelector)
  const structureLayer = useSelector(state => state.currentMap.layers.structure)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const draw = useDrawTile(canvasRef.current)

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, mapPxSize.width, mapPxSize.height)
    for (let layerTile of structureLayer) {
      draw(layerTile.tileId, layerTile.pos)
    }
  }, [draw, mapPxSize.height, mapPxSize.width, structureLayer])

  return <canvas ref={canvasRef} width={mapPxSize.width} height={mapPxSize.height} />
}