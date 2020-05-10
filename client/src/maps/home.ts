
const spritesLayer: LayerTile[] = [
  // { tileId: 263, pos: { x: 2, y: 2 }, },
]

const terrainLayer: LayerTile[] = [
  { tileId: 2, pos: { x: 13, y: 16 }, },
  { tileId: 2, pos: { x: 13, y: 17 }, },
  { tileId: 2, pos: { x: 13, y: 18 }, },
  { tileId: 2, pos: { x: 13, y: 19 }, },
  { tileId: 2, pos: { x: 13, y: 20 }, },

  { tileId: 17, pos: { x: 11, y: 17 }, },
  { tileId: 18, pos: { x: 12, y: 17 }, },
  { tileId: 33, pos: { x: 11, y: 18 }, },
  { tileId: 34, pos: { x: 12, y: 18 }, },
]

const structureLayer: StructureLayerTile[] = [
  { tileId: 41, pos: { x: 16, y: 9 }, passable: false, }, // TR corner
  { tileId: 42, pos: { x: 16, y: 15 }, passable: false, }, // BR corner
  { tileId: 43, pos: { x: 10, y: 15 }, passable: false, }, // BL corner
  { tileId: 44, pos: { x: 10, y: 9 }, passable: false, }, // TL corner

  // Top wall
  { tileId: 45, pos: { x: 11, y: 9 }, passable: false, },
  { tileId: 45, pos: { x: 12, y: 9 }, passable: false, },
  { tileId: 45, pos: { x: 13, y: 9 }, passable: false, },
  { tileId: 45, pos: { x: 14, y: 9 }, passable: false, },
  { tileId: 45, pos: { x: 15, y: 9 }, passable: false, },

  // Left wall
  { tileId: 48, pos: { x: 10, y: 10 }, passable: false, },
  { tileId: 48, pos: { x: 10, y: 11 }, passable: false, },
  { tileId: 48, pos: { x: 10, y: 12 }, passable: false, },
  { tileId: 48, pos: { x: 10, y: 13 }, passable: false, },
  { tileId: 48, pos: { x: 10, y: 14 }, passable: false, },

  // Bottom wall
  { tileId: 47, pos: { x: 11, y: 15 }, passable: false, },
  { tileId: 47, pos: { x: 12, y: 15 }, passable: false, },
  { tileId: 7, pos: { x: 13, y: 15 }, passable: true, },
  { tileId: 47, pos: { x: 14, y: 15 }, passable: false, },
  { tileId: 47, pos: { x: 15, y: 15 }, passable: false, },

  // Right wall
  { tileId: 46, pos: { x: 16, y: 10 }, passable: false, },
  { tileId: 46, pos: { x: 16, y: 11 }, passable: false, },
  { tileId: 46, pos: { x: 16, y: 12 }, passable: false, },
  { tileId: 46, pos: { x: 16, y: 13 }, passable: false, },
  { tileId: 46, pos: { x: 16, y: 14 }, passable: false, },

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