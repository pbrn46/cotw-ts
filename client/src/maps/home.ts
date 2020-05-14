import { genCastle, make2dArray, fillRemaining } from "../lib/mapUtil"
import { getTilemapInfoByKey } from "../assets/tilemap"


const mapSize: Size = { width: 80, height: 40 }

const castle = genCastle({ x: 10, y: 2 }, { width: 9, height: 9 }, "bottom")

const spritesLayer: LayerTile[] = [
  { tileId: 263, pos: { x: 2, y: 2 }, },
]

let terrainLayer: LayerTile[] = [
  { tileId: 290, pos: { x: 14, y: 11 }, },
  { tileId: 290, pos: { x: 14, y: 12 }, },
  { tileId: 290, pos: { x: 14, y: 13 }, },
  { tileId: 290, pos: { x: 14, y: 14 }, },
  { tileId: 290, pos: { x: 14, y: 15 }, },

  { tileId: 305, pos: { x: 12, y: 13 }, impassable: true, },
  { tileId: 306, pos: { x: 13, y: 13 }, impassable: true, },
  { tileId: 321, pos: { x: 12, y: 14 }, impassable: true, },
  { tileId: 322, pos: { x: 13, y: 14 }, impassable: true, },
  ...castle.terrain,
]
terrainLayer = fillRemaining(mapSize, terrainLayer, {
  tileId: getTilemapInfoByKey("GRASS").tileId
})

const itemsLayer: LayerTile[] = [
  { tileId: 85, pos: { x: 2, y: 3 }, }
]

const structureLayer: LayerTile[] = [
  ...castle.structure,
  //Stairs Down
  { tileId: 5, pos: { x: 14, y: 4 }, },
]

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
  discovered: make2dArray(mapSize, true),
} as MapState