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
  const shroudMode = useSelector(state => state.config.srhoudMode)

  const draw = useDrawTile(canvasRef.current)

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, mapPxSize.width, mapPxSize.height)

    for (let layerTile of layer) {
      if (!inBounds(layerTile.pos, mapSize)) continue
      const { x, y } = layerTile.pos
      if (shroudMode === "visible" || discovered[x]?.[y]) {
        draw(layerTile.tileId, layerTile.pos)
      } else {
        if (shroudMode === "alpha") {
          ctx.save()
          ctx.globalAlpha = 0.3
          draw(layerTile.tileId, layerTile.pos)
          ctx.restore()
        }
      }
    }
  }, [discovered, draw, layer, mapPxSize.height, mapPxSize.width, mapSize, shroudMode])

  return <canvas ref={canvasRef} width={mapPxSize.width} height={mapPxSize.height} />
})