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
const createTilemapDataByKey = <T extends Record<keyof T, TilemapData>>(obj: T): Record<keyof T, TilemapData> => {
  return obj
}
// Map keys to tileId
const tilemapDataByKey = createTilemapDataByKey({
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
  "RING": { tileId: 78, label: "Ring" },
  "BAG": { tileId: 81, label: "Bag" },
  "CHEST": { tileId: 82, label: "Chest" },
  "PACK": { tileId: 83, label: "Pack" },
  "ITEM_STASH": { tileId: 85, label: "Item Stash" },
  "POTION": { tileId: 147, label: "Potion" },
  "RING_ENCHANTED": { tileId: 131, label: "Enchanted Ring" },
  "RING_CURSED": { tileId: 132, label: "Cursed Ring" },
  "SHIELD_BROKEN": { tileId: 148, label: "Broken Shield" },
  "HELMET_BROKEN": { tileId: 149, label: "Broken Helmet" },
  "HERO_MALE": { tileId: 231, label: "Hero (Male)" },
  "HERO_FEMALE": { tileId: 232, label: "Hero (Female)" },
  "OGRE_KING": { tileId: 264, label: "Ogre King" },  // What's his name?!
  "GRASS": { tileId: 289, label: "Grass" },
  "PATH": { tileId: 290, label: "Path" },
  "DUNGEON_FLOOR": { tileId: 293, label: "Dungeon Floor" },
  "DUNGEON_FLOOR_LIT": { tileId: 294, label: "Dungeon Floor, Lit" },
  "DUNGEON_WALL": { tileId: 295, label: "Dungeon Wall" },
})

export type TilemapKeys = keyof typeof tilemapDataByKey

const tilemapDataById = Object.keys(tilemapDataByKey)
  .reduce<Record<number, TilemapData>>((acc, key) => {
    acc[tilemapDataByKey[key as TilemapKeys].tileId] = tilemapDataByKey[key as TilemapKeys]
    return acc
  }, {})

export function getTilemapDataByKey(key: TilemapKeys): TilemapData {
  const tile = tilemapDataByKey[key]
  if (!tile) throw new Error("Invalid tile key")
  return tile
}

export function getTilemapDataById(tileId: number): TilemapData {
  const tile = tilemapDataById[tileId]
  if (!tile) throw new Error(`Invalid tile id ${tileId}`)
  return tile
}

export function getTileIdByKey(key: TilemapKeys): number {
  return getTilemapDataByKey(key).tileId
}
