import { tilePosToPx } from "./mapUtil"
import { getTilemapPosById, useTilemap } from "./tilemap"
import { useCallback, useMemo } from "react"
import { useSelector } from "../redux/store"


export function drawTile(
  ctx: CanvasRenderingContext2D, tilemap: HTMLImageElement,
  tilePxSize: Size, tileId: number, mapPos: Pos) {
  const sPos = tilePosToPx(getTilemapPosById(tileId), tilePxSize)
  const dPos = tilePosToPx(mapPos, tilePxSize)
  ctx.drawImage(
    tilemap,
    sPos.x, sPos.y, tilePxSize.width, tilePxSize.height,
    dPos.x, dPos.y, tilePxSize.width, tilePxSize.height)
}

export function useDrawTile(canvas: HTMLCanvasElement | null) {
  const tilemap = useTilemap()
  const tilePxSize = useSelector(state => state.config.tilePxSize)

  const ctx = useMemo(() => {
    return canvas?.getContext('2d')
  }, [canvas])

  const draw = useCallback((tileId: number, mapPos: Pos) => {
    if (!tilemap) return
    if (!ctx) return
    drawTile(ctx, tilemap, tilePxSize, tileId, mapPos)
  }, [ctx, tilePxSize, tilemap])
  return draw
}