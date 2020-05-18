import { makeTile, Pos, tilesToLayer, Size, uniqueKey, isSamePos, make2dArray, randomSize, randomPos, getSurroundingPosesArray, getSurroundingPoses, inBounds, getDirection, incrementPosByDirection, getPosesFromSize, getTilesAt, isPassable, getBlankMapState, mergeTilesToLayer, fillRemaining, makeTileByKey, makeItemTileByKey } from "./mapUtil"
import { getTilemapInfoByKey  } from "./tilemap"
import _ from "lodash"


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

export function genCastle(mapSize: Size, pos: Pos, castleSize: Size, gateSide?: Side): Pick<Layers, "terrain" | "structure"> {
  let structureTiles: LayerTile[] = []

  // TR corner
  structureTiles.push(makeTile(
    41,
    Pos(pos.x + castleSize.width - 1, pos.y),
    { impassable: true },
  ))
  // BR corner
  structureTiles.push(makeTile(
    42,
    Pos(pos.x + castleSize.width - 1, pos.y + castleSize.height - 1),
    { impassable: true },
  ))
  // BL corner
  structureTiles.push(makeTile(
    43,
    Pos(pos.x, pos.y + castleSize.height - 1),
    { impassable: true },
  ))
  // TL corner
  structureTiles.push(makeTile(
    44,
    Pos(pos.x, pos.y),
    { impassable: true },
  ))

  for (let x = pos.x + 1; x < pos.x + castleSize.width - 1; x++) {
    structureTiles.push(makeTile(
      45,
      Pos(x, pos.y),
      { impassable: true },
    ))
    // Bottom wall
    structureTiles.push(makeTile(
      47,
      Pos(x, pos.y + castleSize.height - 1),
      { impassable: true },
    ))
  }

  for (let y = pos.y + 1; y < pos.y + castleSize.height - 1; y++) {
    // Left wall
    structureTiles.push(makeTile(
      48,
      Pos(pos.x, y),
      { impassable: true },
    ))
    // Right wall
    structureTiles.push(makeTile(
      46,
      Pos(pos.x + castleSize.width - 1, y),
      { impassable: true },
    ))
  }

  // Replace wall with gate
  if (gateSide) {
    let gatePos: Pos = { x: -1, y: -1 }
    const midX = Math.floor(((pos.x * 2) + castleSize.width) / 2)
    const midY = Math.floor(((pos.y * 2) + castleSize.height) / 2)
    switch (gateSide) {
      case "top":
        gatePos = { x: midX, y: pos.y }
        break
      case "bottom":
        gatePos = { x: midX, y: pos.y + castleSize.height - 1 }
        break
      case "left":
        gatePos = { x: pos.x, y: midY }
        break
      case "right":
        gatePos = { x: pos.x + castleSize.height - 1, y: midY }
        break
    }
    structureTiles = [
      ...structureTiles.filter(tile => !isSamePos(tile.pos, gatePos)),
      makeTile(7, gatePos, { shouldStopOnTop: true }), // Gate
    ]
  }

  const terrain = genRect<TerrainLayerTile>(
    Pos(pos.x + 1, pos.y + 1),
    Size(castleSize.width - 2, castleSize.height - 2),
    {
      ...getTilemapInfoByKey("DUNGEON_FLOOR_LIT"),
      isLit: true,
      isRoom: true,
      tileKey: uniqueKey(),
    })

  return {
    structure: tilesToLayer(mapSize, structureTiles),
    terrain: tilesToLayer(mapSize, terrain),
  }
}

export function genDungeonRoom(pos: Pos, size: Size, isLit: boolean = false): TerrainLayerTile[] {
  const terrain: TerrainLayerTile[] = []
  const floorTileId = getTilemapInfoByKey("DUNGEON_FLOOR")?.tileId
  if (!floorTileId) throw new Error("Invalid tile key")
  for (let y = pos.y; y < pos.y + size.height; y++) {
    for (let x = pos.x; x < pos.x + size.width; x++) {
      terrain.push(makeTile(floorTileId, Pos(x, y), { isRoom: true, isLit }))
    }
  }
  return terrain
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

    const roomStartPos = getSurroundingPoses(startPos, false)
      .find(pos => inBounds(pos, mapSize) && terrainTouched[pos.x][pos.y])
    const startDirection = roomStartPos ? getDirection(roomStartPos, startPos) : "none"

    let newPath: TerrainLayerTile[] = []
    const doorChance = 0.5
    const doorOrFloorTile = Math.random() < doorChance
      ? makeTileByKey("DOOR_CLOSED", startPos, { shouldStopOnTop: true, shouldStopBefore: true, })
      : makeTileByKey("DUNGEON_FLOOR", startPos, { shouldStopOnTop: true })
    newPath.push(doorOrFloorTile)
    let curPos = incrementPosByDirection(startPos, startDirection)
    let brokenByPath = false
    while (inBounds(
      Pos(curPos.x - 1, curPos.y - 1),
      Size(mapSize.width - 2, mapSize.height - 2))
      && !terrainTouched[curPos.x][curPos.y]
      && !pathTouched[curPos.x][curPos.y]
    ) {
      newPath.push(makeTileByKey("DUNGEON_FLOOR", curPos))
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
    const tiles = getTilesAt(map.layers.terrain, pos)
    if (tiles.length === 1 && (
      tiles[0].tileId === floorTile.tileId
      || tiles[0].tileId === floorLitTile.tileId)) {
      stairs.push(
        makeTile(stairsUpTile.tileId, pos, { shouldStopOnTop: true }))
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
    const tiles = getTilesAt(map.layers.terrain, pos)
    if (tiles.length === 1 && (
      tiles[0].tileId === floorTile.tileId
      || tiles[0].tileId === floorLitTile.tileId)) {
      stairs.push(makeTile(stairsDownTile.tileId, pos, { shouldStopOnTop: true }))
      stairsMade++
    }
  }
  return stairs
}

export function genItems(map: MapState, itemsCount: number): ItemLayerTile[] {
  const items: ItemLayerTile[] = []

  const poses = getPosesFromSize(map.size)
  const floorTile = getTilemapInfoByKey("DUNGEON_FLOOR")
  const floorLitTile = getTilemapInfoByKey("DUNGEON_FLOOR_LIT")
  let itemsMade = 0
  while (poses.length > 0 && itemsMade < itemsCount) {
    const pos = poses.splice(Math.floor(Math.random() * poses.length), 1)[0]
    if (!isPassable(pos, map)) continue
    const terrainTiles = getTilesAt(map.layers.terrain, pos)
    const itemsTiles = getTilesAt(map.layers.items, pos)
    if (terrainTiles.length === 1
      && itemsTiles.length === 0
      && (terrainTiles[0].tileId === floorTile.tileId
        || terrainTiles[0].tileId === floorLitTile.tileId)) {
      items.push(makeItemTileByKey(
        "BAG_SMALL",
        pos,
        {
          shouldStopOnTop: true,
        }
      ))
      itemsMade++
    }
  }
  return items
}

export function genDungeonMap(mapSize: Size, roomCount: number): MapState {
  const newMap: MapState = getBlankMapState(mapSize)

  const dungeonRooms = genDungeonRooms(mapSize, roomCount)
  newMap.layers.terrain = mergeTilesToLayer(newMap.layers.terrain, dungeonRooms.flat())

  const dungeonPaths = genDungeonPaths(mapSize, dungeonRooms)
  newMap.layers.terrain = mergeTilesToLayer(newMap.layers.terrain, dungeonPaths)

  const stairsUp = genStairsUp(newMap, 3)
  newMap.layers.terrain = mergeTilesToLayer(newMap.layers.terrain, stairsUp)

  const stairsDown = genStairsDown(newMap, 3)
  newMap.layers.terrain = mergeTilesToLayer(newMap.layers.terrain, stairsDown)

  const items = genItems(newMap, 25)
  newMap.layers.items = mergeTilesToLayer(newMap.layers.items, items)

  newMap.layers.terrain = fillRemaining(
    mapSize,
    newMap.layers.terrain,
    makeTileByKey("DUNGEON_WALL", Pos(-1, -1), { impassable: true })
  )
  return newMap
}