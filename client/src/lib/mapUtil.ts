import _ from 'lodash'
import { getTilemapInfoByKey } from '../assets/tilemap'


export function Pos(x: number, y: number): Pos {
  return { x, y }
}

export function Size(width: number, height: number): Size {
  return { width, height }
}

export const blankMapState: MapState = {
  size: { width: 1, height: 1 },
  layers: {
    terrain: [],
    structure: [],
    traps: [],
    items: [],
    sprites: [],
    projectiles: [],
  },
  discovered: [],
}

export function tilePosToPx(pos: Pos, tileSize: Size): Pos {
  return {
    x: pos.x * tileSize.width,
    y: pos.y * tileSize.height,
  }
}

export function tileSizeToPx(size: Size, tileSize: Size): Size {
  return {
    width: size.width * tileSize.width,
    height: size.height * tileSize.height,
  }
}

/** Returns true if positions are the same */
export function isSamePos(a: Pos, b: Pos) {
  return a.x === b.x && a.y === b.y
}

export function isPassable(pos: Pos, currentMap: MapState): boolean {
  if (!inBounds(pos, currentMap.size)) return false
  for (let tile of currentMap.layers.terrain) {
    if (tile.impassable && isSamePos(tile.pos, pos)) {
      return false
    }
  }
  for (let tile of currentMap.layers.structure) {
    if (tile.impassable && isSamePos(tile.pos, pos)) {
      return false
    }
  }
  return true
}


export function genCastle(pos: Pos, size: Size, gateSide?: Side): Pick<Layers, "terrain" | "structure"> {
  let structure: LayerTile[] = []

  // TR corner
  structure.push({ tileId: 41, pos: { x: pos.x + size.width - 1, y: pos.y }, impassable: true, })
  // BR corner
  structure.push({ tileId: 42, pos: { x: pos.x + size.width - 1, y: pos.y + size.height - 1 }, impassable: true, })
  // BL corner
  structure.push({ tileId: 43, pos: { x: pos.x, y: pos.y + size.height - 1 }, impassable: true, })
  // TL corner
  structure.push({ tileId: 44, pos: { x: pos.x, y: pos.y }, impassable: true, })


  for (let x = pos.x + 1; x < pos.x + size.width - 1; x++) {
    structure.push({ tileId: 45, pos: { x, y: pos.y }, impassable: true, })
    // Bottom wall
    structure.push({ tileId: 47, pos: { x, y: pos.y + size.height - 1 }, impassable: true, })
  }

  for (let y = pos.y + 1; y < pos.y + size.height - 1; y++) {
    // Left wall
    structure.push({ tileId: 48, pos: { x: pos.x, y }, impassable: true, })
    // Right wall
    structure.push({ tileId: 46, pos: { x: pos.x + size.width - 1, y }, impassable: true, })
  }

  // Replace wall with gate
  if (gateSide) {
    let gatePos: Pos = { x: -1, y: -1 }
    const midX = Math.floor(((pos.x * 2) + size.width) / 2)
    const midY = Math.floor(((pos.y * 2) + size.height) / 2)
    switch (gateSide) {
      case "top":
        gatePos = { x: midX, y: pos.y }
        break
      case "bottom":
        gatePos = { x: midX, y: pos.y + size.height - 1 }
        break
      case "left":
        gatePos = { x: pos.x, y: midY }
        break
      case "right":
        gatePos = { x: pos.x + size.height - 1, y: midY }
        break
    }
    structure = [
      ...structure.filter(tile => !isSamePos(tile.pos, gatePos)),
      { tileId: 7, pos: gatePos, }, // Gate
    ]
  }

  const terrain = genRect<TerrainLayerTile>(
    Pos(pos.x + 1, pos.y + 1),
    Size(size.width - 2, size.height - 2),
    { tileId: 294, isLit: true, isRoom: true, })

  return { structure, terrain }
}

/** Generate array of tiles to fill a rectangle */
export function genRect<T extends LayerTile>(pos: Pos, size: Size, tileData: Omit<T, "pos">): T[] {
  let out: T[] = []
  for (let y = pos.y; y < pos.y + size.height; y++) {
    for (let x = pos.x; x < pos.x + size.width; x++) {
      out.push({ ...tileData, pos: { x, y } } as T)
    }
  }
  return out
}

export function getSurroundingPoses(pos: Pos, includeSelf: boolean): Pos[] {
  return [
    { x: pos.x, y: pos.y - 1 },
    { x: pos.x + 1, y: pos.y - 1 },
    { x: pos.x + 1, y: pos.y },
    { x: pos.x + 1, y: pos.y + 1 },
    { x: pos.x, y: pos.y + 1 },
    { x: pos.x - 1, y: pos.y + 1 },
    { x: pos.x - 1, y: pos.y },
    { x: pos.x - 1, y: pos.y - 1 },
    ...(includeSelf ? [{ x: pos.x, y: pos.y }] : []),
  ]
}

export function getBlankMapState(): MapState {
  return _.cloneDeep(blankMapState)
}


export function genDungeonRoom(pos: Pos, size: Size, isLit: boolean = false): Pick<Layers, "terrain"> {
  const terrain: TerrainLayerTile[] = []
  const floorTileId = getTilemapInfoByKey("DUNGEON_FLOOR")?.tileId
  if (!floorTileId) throw new Error("Invalid tile key")
  for (let y = pos.y; y < pos.y + size.height; y++) {
    for (let x = pos.x; x < pos.x + size.width; x++) {
      terrain.push({ tileId: floorTileId, pos: { x, y }, isRoom: true, isLit })
    }
  }

  return { terrain }
}

export function genMap(size: Size): MapState {
  // const { width, height } = size
  const newMap: MapState = getBlankMapState()
  newMap.size = { ...size }
  // const terrainTileIds: (number | null)[][] = Array(width).fill(null).map(() => Array(height).fill(null));
  const room1 = genDungeonRoom(Pos(2, 2), Size(20, 20))
  newMap.layers.terrain = room1.terrain

  return newMap
}


export function make2dArray<T extends any>(size: Size, defaultValue: T): T[][] {
  return Array(size.width).fill(null).map(() => Array(size.height).fill(defaultValue));
}


export function tilesAtPos<T extends LayerTile>(layerTiles: T[], pos: Pos): T[] {
  return layerTiles.filter(tile => isSamePos(tile.pos, pos))
}

// Check whether pos is in bounds of 0,0 to size
export function inBounds(pos: Pos, size: Size): boolean {
  return pos.x >= 0
    && pos.y >= 0
    && pos.x < size.width
    && pos.y < size.width
}