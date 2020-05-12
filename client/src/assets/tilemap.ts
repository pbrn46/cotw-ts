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

// Map keys to tileId
const tilemapInfoByKey = {
  "CASTLE": { tileId: 1, label: "Castle" },
  "DOOR_CLOSED": { tileId: 2, label: "Door, Closed" },
  "DOOR_OPENED": { tileId: 3, label: "Door, Opened" },
  "DUNGEON_FLOOR": { tileId: 293, label: "Dungeon Floor" },
  "DUNGEON_FLOOR_LIT": { tileId: 294, label: "Dungeon Floor, Lit" },
}

export type TilemapKeys = keyof typeof tilemapInfoByKey

export type TilemapInfoItem = {
  tileId: number
  label: string
}

export function getTilemapInfoByKey(key: TilemapKeys): TilemapInfoItem | null {
  return tilemapInfoByKey[key] || null
}
