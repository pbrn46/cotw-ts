import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid'
import { TilemapKeys, getTilemapDataByKey, getTilemapDataById } from './tilemap'
import { ItemKeys, makeItemByKey } from './items'


export function Pos(x: number, y: number): Pos {
  return { x, y }
}

export function Size(width: number, height: number): Size {
  return { width, height }
}

/** Creates 2d array of `fillValue`.
 * 
 * `fillValue` can also be a callback in the form of `(xPos, yPos) => fillValue` */
export function make2dArray<R extends any>(size: Size, fillValue: (xPos: number, yPos: number) => R): R[][]
export function make2dArray<T extends any>(size: Size, fillValue: T): T[][]
export function make2dArray(size: Size, fillValue: any): any[][] {
  if (typeof fillValue === "function") {
    return Array(size.width)
      .fill(null)
      .map((xItem, xPos) => Array(size.height)
        .fill(null)
        .map((yItem, yPos) => fillValue(xPos, yPos)
        ))
  } else {
    return Array(size.width).fill(null).map(() => Array(size.height).fill(fillValue))
  }
}

// Execute callback through all x,y of size
export function forXY(size: Size, cb: (xPos: number, yPos: number) => void) {
  for (let y = 0; y < size.height; y++) {
    for (let x = 0; x < size.width; x++) {
      cb(x, y)
    }
  }
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

export function uniqueKey() {
  return uuidv4()
}

/** Converts array of tiles into 2d array of tile arrays, in their resective positions */
export function tilesToLayer<T extends LayerTile>(mapSize: Size, tiles: T[]): T[][][] {
  const ret: T[][][] = make2dArray(mapSize, () => [])
  for (let tile of tiles) {
    ret[tile.pos.x][tile.pos.y].push(tile)
  }
  return ret
}

export function mergeLayers<T extends LayerTile>(mapSize: Size, a: T[][][], b: T[][][]): T[][][] {
  const newLayer = make2dArray<T[]>(mapSize, (x, y) => [])
  forXY(mapSize, (x, y) => {
    newLayer[x][y] = [
      ...getTilesAt(a, Pos(x, y)),
      ...getTilesAt(b, Pos(x, y)),
    ]
  })
  return newLayer
}

export function mergeTilesToLayer<T extends LayerTile>(layer: T[][][], tiles: T[]): T[][][] {
  const newLayer = _.cloneDeep(layer)
  for (let tile of tiles) {
    newLayer[tile.pos.x][tile.pos.y].push(tile)
  }
  return newLayer
}

export function tilesAtPos<T extends LayerTile>(layerTiles: T[][][], pos: Pos): T[] {
  return getTilesAt(layerTiles, pos)
}
export function getTilesAt<T extends LayerTile>(layerTiles: T[][][], pos: Pos): T[] {
  return layerTiles[pos.x][pos.y]
}

export function isPassable(pos: Pos, currentMap: MapState): boolean {
  if (!inBounds(pos, currentMap.size)) return false
  if (
    currentMap.layers.terrain[pos.x][pos.y].some(tile => tile.impassable)
    || currentMap.layers.structure[pos.x][pos.y].some(tile => tile.impassable)
    || currentMap.layers.sprites[pos.x][pos.y].some(tile => tile.impassable)
  ) {
    return false
  }
  return true
}

export function isStopBefore(pos: Pos, currentMap: MapState): boolean {
  if (!inBounds(pos, currentMap.size)) return false
  const stopBeforeCheck = (tile: LayerTile) => tile.shouldStopBefore
  for (let layer of Object.values(currentMap.layers)) {
    if (layer[pos.x][pos.y].some(stopBeforeCheck)) return true
  }
  return false
}

export function isStopOnTop(pos: Pos, currentMap: MapState): boolean {
  if (!inBounds(pos, currentMap.size)) return false
  const stopOnTopCheck = (tile: LayerTile) => tile.shouldStopOnTop
  for (let layer of Object.values(currentMap.layers)) {
    if (layer[pos.x][pos.y].some(stopOnTopCheck)) return true
  }
  return false
}

export function makeTile<T extends LayerTile>
  (tileId: number, pos: Pos,
    otherProps?: Partial<Omit<T, "tileId" | "pos" | "tileListKey">>): T {
  return {
    ...getTilemapDataById(tileId),
    pos, tileListKey: uniqueKey(), ...otherProps
  } as T
}

export function makeTileByKey<T extends LayerTile>
  (tilemapKey: TilemapKeys, pos: Pos,
    otherProps?: Partial<Omit<T, "tileId" | "pos" | "tileListKey">>): T {
  return {
    ...getTilemapDataByKey(tilemapKey),
    pos, tileListKey: uniqueKey(), ...otherProps
  } as T
}

export function makeItemTile(pos: Pos,
  itemData: InventoryItem,
  otherProps?: Partial<Omit<ItemLayerTile, "tileId" | "pos" | "tileListKey">>): ItemLayerTile {
  return {
    tileId: itemData.tileId,
    label: itemData.label,
    pos,
    tileListKey: uniqueKey(),
    itemData,
    shouldStopOnTop: true, ...otherProps
  }
}

export function makeItemTileByKey
  (itemKey: ItemKeys, pos: Pos,
    otherProps?: Partial<Omit<ItemLayerTile, "tileId" | "pos" | "tileListKey">>): ItemLayerTile {
  const item = makeItemByKey(itemKey)
  return makeItemTile(pos, item, otherProps)
}

export function getSurroundingPoses(pos: Pos, includeSelf: boolean, includeDiagonals: boolean = true): Pos[] {
  return [
    { x: pos.x, y: pos.y - 1 },
    { x: pos.x + 1, y: pos.y },
    { x: pos.x, y: pos.y + 1 },
    { x: pos.x - 1, y: pos.y },
    ...(includeDiagonals ? [
      { x: pos.x + 1, y: pos.y - 1 },
      { x: pos.x + 1, y: pos.y + 1 },
      { x: pos.x - 1, y: pos.y + 1 },
      { x: pos.x - 1, y: pos.y - 1 },
    ] : []),
    ...(includeSelf ? [{ x: pos.x, y: pos.y }] : []),
  ]
}

export function getBlankMapState(mapSize: Size): MapState {
  return {
    size: { width: mapSize.width, height: mapSize.height },
    layers: {
      terrain: make2dArray(mapSize, () => []),
      structure: make2dArray(mapSize, () => []),
      traps: make2dArray(mapSize, () => []),
      items: make2dArray(mapSize, () => []),
      sprites: make2dArray(mapSize, () => []),
      projectiles: make2dArray(mapSize, () => []),
    },
    discovered: make2dArray(mapSize, false),
  }
}

export function randomSize(minSize: Size, maxSize: Size): Size {
  return Size(
    Math.floor((Math.random() * (maxSize.width - minSize.width + 1)) + minSize.width),
    Math.floor((Math.random() * (maxSize.height - minSize.height + 1)) + minSize.height),
  )
}

export function randomPos(minPos: Pos, maxPos: Pos): Pos {
  return Pos(
    Math.floor((Math.random() * (maxPos.x - minPos.x + 1)) + minPos.x),
    Math.floor((Math.random() * (maxPos.y - minPos.y + 1)) + minPos.y),
  )
}

export function isPosTouched(pos: Pos, touched: boolean[][]) {
  return touched[pos.x][pos.y]
}

export function getSurroundingPosesArray(layer: LayerTile[], size: Size, includeDiagonals: boolean = true) {
  const touched = make2dArray(size, false)
  layer.forEach(tile => touched[tile.pos.x][tile.pos.y] = true)

  return layer.reduce<Pos[]>((acc, tile) => {
    const surroundingPoses = getSurroundingPoses(tile.pos, false, includeDiagonals)
    for (let surroundingPos of surroundingPoses) {
      if (touched[surroundingPos.x][surroundingPos.y]) continue
      touched[surroundingPos.x][surroundingPos.y] = true
      acc.push(surroundingPos)
    }
    return acc
  }, [])
}

/** Check whether pos is in bounds of [0, 0] to size */
export function inBounds(pos: Pos, size: Size): boolean {
  return pos.x >= 0
    && pos.y >= 0
    && pos.x < size.width
    && pos.y < size.height
}

/** Fill empty positions with tile, and returns new layer array */
export function fillRemaining<T extends LayerTile>(size: Size, layer: T[][][], tile: T) {
  // const touched = make2dArray(size, false)
  const newLayer = _.cloneDeep(layer)
  forXY(size, (x, y) => {
    if (layer[x][y].length === 0) {
      newLayer[x][y].push(
        { ...tile, pos: Pos(x, y) }
      )
    }
  })
  return newLayer
}

// Returns all possible poses from specific size
export function getPosesFromSize(size: Size): Pos[] {
  const poses: Pos[] = []
  forXY(size, (x, y) => {
    poses.push(Pos(x, y))
  })
  return poses
}

// Gets random passable position or -1, -1 if no positions possible
export function getRandomPassablePos(map: MapState) {
  const poses = getPosesFromSize(map.size)
  while (poses.length > 0) {
    const pos = poses.splice(Math.floor(Math.random() * poses.length), 1)[0]
    if (isPassable(pos, map)) {
      return pos
    }
  }
  return Pos(-1, -1)
}

export function getDirection(startPos: Pos, endPos: Pos): Direction {
  if (startPos.x === endPos.x) {
    if (startPos.y > endPos.y) return "up"
    if (startPos.y < endPos.y) return "down"
    return "none"
  }
  if (startPos.y === endPos.y) {
    if (startPos.x > endPos.x) return "left"
    if (startPos.x < endPos.x) return "right"
  }
  if (startPos.x > endPos.x) {
    if (startPos.y > endPos.y) return "upperLeft"
    if (startPos.y < endPos.y) return "lowerLeft"
  }
  if (startPos.x < endPos.x) {
    if (startPos.y < endPos.y) return "lowerRight"
    if (startPos.y > endPos.y) return "upperRight"
  }
  return "none"
}

export function incrementPosByDirection(pos: Pos, direction: Direction, incrementBy: number = 1) {
  let dx = 0
  let dy = 0
  switch (direction) {
    case "left":
    case "upperLeft":
    case "lowerLeft":
      dx = 0 - incrementBy
      break
    case "right":
    case "upperRight":
    case "lowerRight":
      dx = incrementBy
      break
  }
  switch (direction) {
    case "up":
    case "upperLeft":
    case "upperRight":
      dy = 0 - incrementBy
      break
    case "down":
    case "lowerLeft":
    case "lowerRight":
      dy = incrementBy
      break
  }
  return Pos(
    pos.x + dx,
    pos.y + dy
  )
}