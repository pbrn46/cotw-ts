import React, { useRef, useEffect } from 'react'
import { useSelector } from '../../../redux/store'
import { currentMapPxSizeSelector } from '../../../redux/reducers/currentMap'
import { useDrawTile } from '../../../lib/drawUtil'


export default function Terrain() {
  const mapSize = useSelector(state => state.currentMap.size)
  const mapPxSize = useSelector(currentMapPxSizeSelector)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const terrainLayer = useSelector(state => state.currentMap.layers.terrain)
  const discovered = useSelector(state => state.currentMap.discovered)

  const draw = useDrawTile(canvasRef.current)

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, mapPxSize.width, mapPxSize.height)

    // Don't draw default tile on touched positions
    const touched: boolean[][] = Array(mapSize.width).fill(null).map(() => Array(mapSize.height).fill(false));

    for (let layerTile of terrainLayer) {
      const { x, y } = layerTile.pos
      touched[x][y] = true
      if (discovered[x]?.[y]) {
        draw(layerTile.tileId, layerTile.pos)
      }
    }

    // Default green
    for (let y = 0; y < mapSize.height; y++) {
      for (let x = 0; x < mapSize.width; x++) {
        if (!touched[x][y]) {
          if (discovered[x]?.[y]) {
            draw(289, { x, y })
          }
        }
      }
    }
  }, [discovered, draw, mapPxSize.height, mapPxSize.width, mapSize.height, mapSize.width, terrainLayer])

  return <canvas ref={canvasRef} width={mapPxSize.width} height={mapPxSize.height} />
}