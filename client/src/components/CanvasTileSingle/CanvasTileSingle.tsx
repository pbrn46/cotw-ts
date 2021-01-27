import React, { useRef, useEffect } from 'react'
import { useAppSelector } from '../../redux/store'
import { useDrawTile } from '../../lib/drawUtil'
import { Pos } from '../../lib/mapUtil'


type CanvasTileSingleProps = {
  tileId: number
}
export default function CanvasTileSingle({ tileId }: CanvasTileSingleProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const tilePxSize = useAppSelector(state => state.config.tilePxSize)

  const draw = useDrawTile(canvasRef.current)

  useEffect(() => {
    draw(tileId, Pos(0, 0))
  }, [draw, tileId])

  return <canvas
    width={tilePxSize.width}
    height={tilePxSize.height}
    ref={canvasRef}
  />
}