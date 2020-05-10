import tilemapOriginal from './png/tilemap-original.png'
import tilemapTerrain from './png/tilemap-terrain.png'
import { useEffect, useState } from 'react'

export type TilemapType = "original" | "terrain"

const tilemapSrcs: Record<TilemapType, string> = {
  'original': tilemapOriginal,
  'terrain': tilemapTerrain,
}

export function useTilemap(type: TilemapType = "original") {
  const [tilemapImage, setTilemapImage] = useState<HTMLImageElement | null>(null)
  useEffect(() => {
    const tmpTilemapImage = new Image()
    tmpTilemapImage.src = tilemapSrcs[type]
    const imageLoadHandler = () => {
      setTilemapImage(tmpTilemapImage)
    }
    tmpTilemapImage.addEventListener('load', imageLoadHandler)
    return () => {
      tmpTilemapImage.removeEventListener('load', imageLoadHandler)
      setTilemapImage(null)
    }
  }, [type])
  return tilemapImage
}

// tilemap is 16 wide, id starts at 1
export function getTilemapPosById(id: number): Pos {
  const x = ((id - 1) % 16)
  const y = Math.floor((id - 1) / 16)
  return { x, y }
}