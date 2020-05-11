import React, { useRef, useEffect } from 'react'
import { useSelector } from '../../../redux/store'
import { currentMapPxSizeSelector } from '../../../redux/reducers/currentMap'
import { useDrawTile } from '../../../lib/drawUtil'


export default function Items() {
  const mapPxSize = useSelector(currentMapPxSizeSelector)
  const itemsLayer = useSelector(state => state.currentMap.layers.items)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const discovered = useSelector(state => state.currentMap.discovered)

  const draw = useDrawTile(canvasRef.current)

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, mapPxSize.width, mapPxSize.height)
    for (let layerTile of itemsLayer) {
      const { x, y } = layerTile.pos
      if (discovered[x]?.[y]) {
        draw(layerTile.tileId, layerTile.pos)
      }
    }

  }, [discovered, draw, itemsLayer, mapPxSize.height, mapPxSize.width])

  return <canvas ref={canvasRef} width={mapPxSize.width} height={mapPxSize.height} />
}