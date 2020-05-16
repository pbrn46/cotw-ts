import { genCastle, make2dArray, fillRemaining, tilesToLayer, mergeLayers } from "../lib/mapUtil"
import { getTilemapInfoByKey } from "../assets/tilemap"


const mapSize: Size = { width: 80, height: 40 }

const castle = genCastle(mapSize, { x: 10, y: 2 }, { width: 9, height: 9 }, "bottom")

const spritesTiles: LayerTile[] = [
  { tileId: 263, pos: { x: 2, y: 2 }, impassable: true },
]
let spritesLayer = tilesToLayer(spritesTiles, mapSize)

let terrainTiles: TerrainLayerTile[] = [
  { tileId: 290, pos: { x: 14, y: 11 }, },
  { tileId: 290, pos: { x: 14, y: 12 }, },
  { tileId: 290, pos: { x: 14, y: 13 }, },
  { tileId: 290, pos: { x: 14, y: 14 }, },
  { tileId: 290, pos: { x: 14, y: 15 }, },

  { tileId: 305, pos: { x: 12, y: 13 }, impassable: true, },
  { tileId: 306, pos: { x: 13, y: 13 }, impassable: true, },
  { tileId: 321, pos: { x: 12, y: 14 }, impassable: true, },
  { tileId: 322, pos: { x: 13, y: 14 }, impassable: true, },
  // ...castle.terrain,
]
let terrainLayer = mergeLayers(
  mapSize,
  tilesToLayer(terrainTiles, mapSize),
  castle.terrain,
)
terrainLayer = fillRemaining(mapSize, terrainLayer, {
  tileId: getTilemapInfoByKey("GRASS").tileId
})

const itemsTiles: LayerTile[] = [
  { tileId: 85, pos: { x: 2, y: 3 }, shouldStopOnTop: true }
]
let itemsLayer = tilesToLayer(itemsTiles, mapSize)

const structureTiles: LayerTile[] = [
  //Stairs Down
  { tileId: 5, pos: { x: 14, y: 4 }, },
]
let structureLayer = mergeLayers(mapSize,
  tilesToLayer(structureTiles, mapSize),
  castle.structure,
)


export default {
  size: mapSize,
  layers: {
    terrain: terrainLayer,
    structure: structureLayer,
    traps: [],
    items: itemsLayer,
    sprites: spritesLayer,
    projectiles: [],
  },
  discovered: make2dArray(mapSize, false),
} as MapState