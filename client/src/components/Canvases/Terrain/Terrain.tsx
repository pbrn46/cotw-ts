import React, { useRef, useEffect } from 'react'
import { useSelector } from '../../../redux/store'
import { currentMapPxSizeSelector } from '../../../redux/reducers/currentMap'
import { useDrawTile } from '../../../lib/drawUtil'


export default function Terrain() {
  const mapSize = useSelector(state => state.currentMap.size)
  const mapPxSize = useSelector(currentMapPxSizeSelector)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const terrainLayer = useSelector(state => state.currentMap.layers.terrain)

  const draw = useDrawTile(canvasRef.current, "terrain")

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, mapPxSize.width, mapPxSize.height)

    // Default green
    for (let y = 0; y < mapSize.height; y++) {
      for (let x = 0; x < mapSize.width; x++) {
        draw(1, { x, y })
      }
    }

    for (let layerTile of terrainLayer) {
      draw(layerTile.tileId, layerTile.pos)
    }
  }, [draw, mapPxSize.height, mapPxSize.width, mapSize.height, mapSize.width, terrainLayer])

  return <canvas ref={canvasRef} width={mapPxSize.width} height={mapPxSize.height} />
}