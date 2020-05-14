import React, { useRef, useEffect } from 'react'
import { useSelector } from '../../redux/store'
import { currentMapPxSizeSelector } from '../../redux/reducers/currentMap'
import { useDrawTile } from '../../lib/drawUtil'
import { inBounds } from '../../lib/mapUtil'


type CanvasLayerProps = {
  layer: LayerTile[]
}
export default React.memo(function CanvasLayer({ layer }: CanvasLayerProps) {
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

    for (let layerTile of layer) {
      if (!inBounds(layerTile.pos, mapSize)) continue
      const { x, y } = layerTile.pos
      if (!shrouded || discovered[x]?.[y]) {
        draw(layerTile.tileId, layerTile.pos)
      }
    }
  }, [discovered, draw, layer, mapPxSize.height, mapPxSize.width, mapSize, shrouded])

  return <canvas ref={canvasRef} width={mapPxSize.width} height={mapPxSize.height} />
})