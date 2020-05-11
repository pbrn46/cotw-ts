import tilemapPng from './png/tilemap.png'
import { useEffect, useState } from 'react'

export type TilemapType = "original" | "terrain"

export function useTilemap() {
  const [tilemapImage, setTilemapImage] = useState<HTMLImageElement | null>(null)
  useEffect(() => {
    const tmpTilemapImage = new Image()
    tmpTilemapImage.src = tilemapPng
    const imageLoadHandler = () => {
      setTilemapImage(tmpTilemapImage)
    }
    tmpTilemapImage.addEventListener('load', imageLoadHandler)
    return () => {
      tmpTilemapImage.removeEventListener('load', imageLoadHandler)
      setTilemapImage(null)
    }
  }, [])
  return tilemapImage
}

// tilemap is 16 wide, id starts at 1
export function getTilemapPosById(id: number): Pos {
  const x = ((id - 1) % 16)
  const y = Math.floor((id - 1) / 16)
  return { x, y }
}