import { genCastle } from "../lib/mapUtil"

const spritesLayer: LayerTile[] = [
  // { tileId: 263, pos: { x: 2, y: 2 }, },
]

const terrainLayer: LayerTile[] = [
  { tileId: 2, pos: { x: 14, y: 6 }, },
  { tileId: 2, pos: { x: 14, y: 7 }, },
  { tileId: 2, pos: { x: 14, y: 8 }, },
  { tileId: 2, pos: { x: 14, y: 9 }, },
  { tileId: 2, pos: { x: 14, y: 10 }, },
  { tileId: 2, pos: { x: 14, y: 11 }, },
  { tileId: 2, pos: { x: 14, y: 12 }, },
  { tileId: 2, pos: { x: 14, y: 13 }, },
  { tileId: 2, pos: { x: 14, y: 14 }, },
  { tileId: 2, pos: { x: 14, y: 15 }, },

  { tileId: 17, pos: { x: 12, y: 13 }, impassable: true, },
  { tileId: 18, pos: { x: 13, y: 13 }, impassable: true, },
  { tileId: 33, pos: { x: 12, y: 14 }, impassable: true, },
  { tileId: 34, pos: { x: 13, y: 14 }, impassable: true, },
]

const structureLayer: LayerTile[] = [
  ...genCastle({ x: 10, y: 2 }, { width: 9, height: 9 }, "bottom")
]

export default {
  size: { width: 80, height: 40 },
  layers: {
    terrain: terrainLayer,
    structure: structureLayer,
    items: [],
    sprites: spritesLayer,
    projectiles: [],
  },
} as MapState