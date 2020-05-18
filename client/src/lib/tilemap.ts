import tilemapPng from '../assets/png/tilemap.png'
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

// Helper function for Typescript to create keys properly
const createTilemapInfoByKey = <T extends Record<keyof T, TilemapInfo>>(obj: T): Record<keyof T, TilemapInfo> => {
  return obj
}
// Map keys to tileId
const tilemapInfoByKey = createTilemapInfoByKey({
  "CASTLE": { tileId: 1, label: "Castle" },
  "DOOR_CLOSED": { tileId: 2, label: "Door, Closed" },
  "DOOR_OPENED": { tileId: 3, label: "Door, Opened" },
  "STAIRS_UP": { tileId: 4, label: "Stairs, Up" },
  "STAIRS_DOWN": { tileId: 5, label: "Stairs, Down" },
  "PORTCULLIS": { tileId: 7, label: "Portcullis" },
  "CASTLE_WALL_TOP_RIGHT": { tileId: 41, label: "Castle Wall" },
  "CASTLE_WALL_BOTTOM_RIGHT": { tileId: 42, label: "Castle Wall" },
  "CASTLE_WALL_BOTTOM_LEFT": { tileId: 43, label: "Castle Wall" },
  "CASTLE_WALL_TOP_LEFT": { tileId: 44, label: "Castle Wall" },
  "CASTLE_WALL_TOP": { tileId: 45, label: "Castle Wall" },
  "CASTLE_WALL_RIGHT": { tileId: 46, label: "Castle Wall" },
  "CASTLE_WALL_BOTTOM": { tileId: 47, label: "Castle Wall" },
  "CASTLE_WALL_LEFT": { tileId: 48, label: "Castle Wall" },
  "BAG": { tileId: 81, label: "Bag" },
  "CHEST": { tileId: 82, label: "Chest" },
  "PACK": { tileId: 83, label: "Pack" },
  "ITEM_STASH": { tileId: 85, label: "ITEM_STASH" },
  "HERO_MALE": { tileId: 231, label: "Hero (Male)" },
  "HERO_FEMALE": { tileId: 232, label: "Hero (Female)" },
  "OGRE_KING": { tileId: 264, label: "Ogre King" },  // What's his name?!
  "GRASS": { tileId: 289, label: "Grass" },
  "PATH": { tileId: 290, label: "Path" },
  "DUNGEON_FLOOR": { tileId: 293, label: "Dungeon Floor" },
  "DUNGEON_FLOOR_LIT": { tileId: 294, label: "Dungeon Floor, Lit" },
  "DUNGEON_WALL": { tileId: 295, label: "Dungeon Wall" },
})

export type TilemapKeys = keyof typeof tilemapInfoByKey

const tilemapInfoById = Object.keys(tilemapInfoByKey)
  .reduce<Record<number, TilemapInfo>>((acc, key) => {
    acc[tilemapInfoByKey[key as TilemapKeys].tileId] = tilemapInfoByKey[key as TilemapKeys]
    return acc
  }, {})

export function getTilemapInfoByKey(key: TilemapKeys): TilemapInfo {
  const tile = tilemapInfoByKey[key]
  if (!tile) throw new Error("Invalid tile key")
  return tile
}

export function getTilemapInfoById(tileId: number): TilemapInfo {
  const tile = tilemapInfoById[tileId]
  if (!tile) throw new Error(`Invalid tile id ${tileId}`)
  return tile
}

export function getTileIdByKey(key: TilemapKeys): number {
  return getTilemapInfoByKey(key).tileId
}
