import React, { useRef, useEffect } from 'react'
import { useSelector } from '../../redux/store'
import { currentMapPxSizeSelector } from '../../redux/reducers/currentMap'
import { useDrawTile } from '../../lib/drawUtil'
import { inBounds } from '../../lib/mapUtil'


type CanvasLayerProps = {
  layer: LayerTile[]
  baseTile?: Omit<LayerTile, "pos">
}
export default React.memo(function CanvasLayer({ layer, baseTile }: CanvasLayerProps) {
  const mapSize = useSelector(state => state.currentMap.size)
  const mapPxSize = useSelector(currentMapPxSizeSelector)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const discovered = useSelector(state => state.currentMap.discovered)
  const shrouded = useSelector(state => state.config.shrouded)

  const draw = useDrawTile(canvasRef.current)

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, mapPxSize.width, mapPxSize.height)

    // Don't draw base tile on touched positions
    const touched: boolean[][] = Array(mapSize.width).fill(null).map(() => Array(mapSize.height).fill(false))

    for (let layerTile of layer) {
      if (!inBounds(layerTile.pos, mapSize)) continue
      const { x, y } = layerTile.pos
      touched[x][y] = true
      if (!shrouded || discovered[x]?.[y]) {
        draw(layerTile.tileId, layerTile.pos)
      }
    }

    if (baseTile) {
      for (let y = 0; y < mapSize.height; y++) {
        for (let x = 0; x < mapSize.width; x++) {
          if (!touched[x][y]) {
            if (!shrouded || discovered[x]?.[y]) {
              draw(baseTile.tileId, { x, y })
            }
          }
        }
      }
    }
  }, [baseTile, discovered, draw, layer, mapPxSize.height, mapPxSize.width, mapSize, shrouded])

  return <canvas ref={canvasRef} width={mapPxSize.width} height={mapPxSize.height} />
})