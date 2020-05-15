import _ from 'lodash'
import { getTilemapInfoByKey } from '../assets/tilemap'


export function Pos(x: number, y: number): Pos {
  return { x, y }
}

export function Size(width: number, height: number): Size {
  return { width, height }
}

export function make2dArray<T extends any>(size: Size, defaultValue: T): T[][] {
  return Array(size.width).fill(null).map(() => Array(size.height).fill(defaultValue));
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

export function getTilesAt(pos: Pos, tiles: LayerTile[]): LayerTile[] {
  return tiles.filter(tile => isSamePos(pos, tile.pos))
}

export function isPassable(pos: Pos, currentMap: MapState): boolean {
  if (!inBounds(pos, currentMap.size)) return false
  if (
    currentMap.layers.terrain.some(tile => tile.impassable && isSamePos(tile.pos, pos))
    || currentMap.layers.structure.some(tile => tile.impassable && isSamePos(tile.pos, pos))
    || currentMap.layers.sprites.some(tile => tile.impassable && isSamePos(tile.pos, pos))
  ) {
    return false
  }
  return true
}

export function isStopBefore(pos: Pos, currentMap: MapState): boolean {
  if (!inBounds(pos, currentMap.size)) return false
  if (
    currentMap.layers.terrain.some(tile => tile.shouldStopBefore && isSamePos(tile.pos, pos))
    || currentMap.layers.structure.some(tile => tile.shouldStopBefore && isSamePos(tile.pos, pos))
    || currentMap.layers.sprites.some(tile => tile.shouldStopBefore && isSamePos(tile.pos, pos))
  ) {
    return true
  }
  return false
}

export function isStopOnTop(pos: Pos, currentMap: MapState): boolean {
  if (!inBounds(pos, currentMap.size)) return false
  if (
    currentMap.layers.terrain.some(tile => tile.shouldStopOnTop && isSamePos(tile.pos, pos))
    || currentMap.layers.structure.some(tile => tile.shouldStopOnTop && isSamePos(tile.pos, pos))
    || currentMap.layers.sprites.some(tile => tile.shouldStopOnTop && isSamePos(tile.pos, pos))
  ) {
    return true
  }
  return false
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

export function getBlankMapState(): MapState {
  return _.cloneDeep(blankMapState)
}

export function genDungeonRoom(pos: Pos, size: Size, isLit: boolean = false): TerrainLayerTile[] {
  const terrain: TerrainLayerTile[] = []
  const floorTileId = getTilemapInfoByKey("DUNGEON_FLOOR")?.tileId
  if (!floorTileId) throw new Error("Invalid tile key")
  for (let y = pos.y; y < pos.y + size.height; y++) {
    for (let x = pos.x; x < pos.x + size.width; x++) {
      terrain.push({ tileId: floorTileId, pos: { x, y }, isRoom: true, isLit })
    }
  }
  return terrain
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

export function genDungeonRooms(mapSize: Size, rooms: number): TerrainLayerTile[][] {
  let newLayers: TerrainLayerTile[][] = []

  const roomTouched = make2dArray(mapSize, false)
  const terrainTouched = make2dArray(mapSize, false)

  let roomCount = 0
  let tryCount = 0
  while (roomCount < rooms && tryCount < rooms * 10) {
    tryCount++
    const roomSize = randomSize(Size(4, 4), Size(10, 10))
    const roomPos = randomPos(
      Pos(1, 1),
      Pos(mapSize.width - roomSize.width - 1, mapSize.height - roomSize.height - 1))
    const roomLayer = genDungeonRoom(roomPos, roomSize)
    // If room overlaps
    if (roomLayer.some(tile => roomTouched[tile.pos.x][tile.pos.y])) continue
    roomLayer.forEach(tile => {
      roomTouched[tile.pos.x][tile.pos.y] = true
      terrainTouched[tile.pos.x][tile.pos.y] = true
    })
    getSurroundingPosesArray(roomLayer, mapSize).forEach(pos => roomTouched[pos.x][pos.y] = true)
    newLayers.push(roomLayer)
    // newLayer = [...newLayer, ...roomLayer]
    roomCount++
  }

  return newLayers
}

export function genDungeonPaths(mapSize: Size, dungeonRooms: TerrainLayerTile[][]): TerrainLayerTile[] {
  let newLayer: TerrainLayerTile[] = []
  const terrainTouched = make2dArray(mapSize, false)
  let pathTouched = make2dArray(mapSize, false)
  dungeonRooms.forEach(room => room.forEach(tile => terrainTouched[tile.pos.x][tile.pos.y] = true))

  // Create a path for each room
  for (let i = 0; i < dungeonRooms.length; i++) {
    const newPathTouched = _.cloneDeep(pathTouched)
    const room = dungeonRooms[i]
    const roomSurrounding = getSurroundingPosesArray(room, mapSize, false)
    const startPos = roomSurrounding[Math.floor(Math.random() * roomSurrounding.length)]
    let targetRoomIndex = Math.floor(Math.random() * (dungeonRooms.length - 1))
    if (targetRoomIndex >= i) targetRoomIndex++
    // const targetRoom = dungeonRooms[targetRoomIndex]
    // const targetPos = targetRoom[Math.floor(Math.random() * targetRoom.length)].pos

    const floorTile = getTilemapInfoByKey("DUNGEON_FLOOR")
    const doorClosedTile = getTilemapInfoByKey("DOOR_CLOSED")

    const roomStartPos = getSurroundingPoses(startPos, false)
      .find(pos => inBounds(pos, mapSize) && terrainTouched[pos.x][pos.y])
    const startDirection = roomStartPos ? getDirection(roomStartPos, startPos) : "none"

    let newPath = []
    const doorChance = 0.35
    const doorOrFloorTile = Math.random() < doorChance
      ? { tileId: doorClosedTile.tileId, pos: startPos, shouldStopOnTop: true, shouldStopBefore: true }
      : { tileId: floorTile.tileId, pos: startPos, shouldStopOnTop: true }
    newPath.push(doorOrFloorTile)
    let curPos = incrementPosByDirection(startPos, startDirection)
    let brokenByPath = false
    while (inBounds(
      Pos(curPos.x - 1, curPos.y - 1),
      Size(mapSize.width - 2, mapSize.height - 2))
      && !terrainTouched[curPos.x][curPos.y]
      && !pathTouched[curPos.x][curPos.y]
    ) {
      newPath.push({ tileId: floorTile.tileId, pos: curPos })
      newPathTouched[curPos.x][curPos.y] = true

      const surroundingPoses = getSurroundingPoses(curPos, false, false)
      const prevPathTouched = pathTouched
      if (surroundingPoses.some(pos => prevPathTouched[pos.x][pos.y])) {
        brokenByPath = true
        break
      }
      if (surroundingPoses.some(pos => terrainTouched[pos.x][pos.y])) {
        break
      }
      curPos = incrementPosByDirection(curPos, startDirection)
    }
    if (newPath.length === 1 || (newPath.length > 0 && !brokenByPath)) {
      newPath[newPath.length - 1] = { ...newPath[newPath.length - 1], shouldStopOnTop: true }
    }
    pathTouched = newPathTouched
    newLayer = [...newLayer, ...newPath]
  }
  return newLayer
}

export function genStairsUp(map: MapState, stairsCount: number): LayerTile[] {
  const poses = getPosesFromSize(map.size)
  const stairs: LayerTile[] = []
  let stairsMade = 0
  const stairsUpTile = getTilemapInfoByKey("STAIRS_UP")
  const floorTile = getTilemapInfoByKey("DUNGEON_FLOOR")
  const floorLitTile = getTilemapInfoByKey("DUNGEON_FLOOR_LIT")
  while (poses.length > 0 && stairsMade < stairsCount) {
    const pos = poses.splice(Math.floor(Math.random() * poses.length), 1)[0]
    const tiles = getTilesAt(pos, map.layers.terrain)
    if (tiles.length === 1 && (
      tiles[0].tileId === floorTile.tileId
      || tiles[0].tileId === floorLitTile.tileId)) {
      stairs.push({ tileId: stairsUpTile.tileId, pos, shouldStopOnTop: true })
      stairsMade++
    }
  }
  return stairs
}

export function genStairsDown(map: MapState, stairsCount: number): LayerTile[] {
  const poses = getPosesFromSize(map.size)
  const stairs: LayerTile[] = []
  let stairsMade = 0
  const stairsDownTile = getTilemapInfoByKey("STAIRS_DOWN")
  const floorTile = getTilemapInfoByKey("DUNGEON_FLOOR")
  const floorLitTile = getTilemapInfoByKey("DUNGEON_FLOOR_LIT")
  while (poses.length > 0 && stairsMade < stairsCount) {
    const pos = poses.splice(Math.floor(Math.random() * poses.length), 1)[0]
    const tiles = getTilesAt(pos, map.layers.terrain)
    if (tiles.length === 1 && (
      tiles[0].tileId === floorTile.tileId
      || tiles[0].tileId === floorLitTile.tileId)) {
      stairs.push({ tileId: stairsDownTile.tileId, pos, shouldStopOnTop: true })
      stairsMade++
    }
  }
  return stairs
}

export function genMap(mapSize: Size, roomCount: number): MapState {
  const newMap: MapState = getBlankMapState()
  newMap.size = { ...mapSize }

  const dungeonRooms = genDungeonRooms(mapSize, roomCount)
  newMap.layers.terrain = dungeonRooms.flat()

  const dungeonPaths = genDungeonPaths(mapSize, dungeonRooms)
  newMap.layers.terrain = [...newMap.layers.terrain, ...dungeonPaths]

  const stairsUp = genStairsUp(newMap, 3)
  newMap.layers.terrain = [...newMap.layers.terrain, ...stairsUp]

  const stairsDown = genStairsDown(newMap, 3)
  newMap.layers.terrain = [...newMap.layers.terrain, ...stairsDown]

  newMap.layers.terrain = fillRemaining(mapSize, newMap.layers.terrain, {
    tileId: getTilemapInfoByKey("DUNGEON_WALL").tileId,
    impassable: true,
  })
  return newMap
}

export function tilesAtPos<T extends LayerTile>(layerTiles: T[], pos: Pos): T[] {
  return layerTiles.filter(tile => isSamePos(tile.pos, pos))
}

/** Check whether pos is in bounds of [0, 0] to size */
export function inBounds(pos: Pos, size: Size): boolean {
  return pos.x >= 0
    && pos.y >= 0
    && pos.x < size.width
    && pos.y < size.height
}

/** Fill empty positions with tile, and returns new layer array */
export function fillRemaining(size: Size, layer: LayerTile[], tile: Omit<LayerTile, "pos">) {
  const touched = make2dArray(size, false)
  const newLayer = [...layer]

  layer.forEach(tile => touched[tile.pos.x][tile.pos.y] = true)

  for (let y = 0; y < size.height; y++) {
    for (let x = 0; x < size.width; x++) {
      if (!touched[x][y]) {
        newLayer.push({
          ...tile,
          pos: Pos(x, y),
        })
      }
    }
  }
  return newLayer
}

// Returns all possible poses from specific size
export function getPosesFromSize(size: Size): Pos[] {
  const poses: Pos[] = []
  for (let y = 0; y < size.height; y++) {
    for (let x = 0; x < size.width; x++) {
      poses.push(Pos(x, y))
    }
  }
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