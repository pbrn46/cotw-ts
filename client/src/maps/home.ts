import { make2dArray, fillRemaining, tilesToLayer, mergeLayers, makeTile, Pos, makeTileByKey } from "../lib/mapUtil"
import { genCastle } from "../lib/generators"
import { makeItemByKey } from "../lib/items"


const mapSize: Size = { width: 80, height: 40 }

const castle = genCastle(mapSize, { x: 10, y: 2 }, { width: 9, height: 9 }, "bottom")

const spritesTiles: LayerTile[] = [
  makeTile(264, Pos(2, 2), { impassable: true }),
]
let spritesLayer = tilesToLayer(mapSize, spritesTiles)

let terrainTiles: TerrainLayerTile[] = [
  makeTileByKey("PATH", Pos(14, 11)),
  makeTileByKey("PATH", Pos(14, 12)),
  makeTileByKey("PATH", Pos(14, 13)),
  makeTileByKey("PATH", Pos(14, 14)),
  makeTileByKey("PATH", Pos(14, 15)),

  // House
  // makeTile(305, Pos(12, 13), { impassable: true, }),
  // makeTile(306, Pos(13, 13), { impassable: true, }),
  // makeTile(321, Pos(12, 14), { impassable: true, }),
  // makeTile(322, Pos(13, 14), { impassable: true, }),
  // ...castle.terrain,
]
let terrainLayer = mergeLayers(
  mapSize,
  tilesToLayer(mapSize, terrainTiles),
  castle.terrain,
)
terrainLayer = fillRemaining(mapSize, terrainLayer, makeTileByKey("GRASS", Pos(-1, -1)))

const itemsTiles: ItemLayerTile[] = [
  makeTile<ItemLayerTile>(85, Pos(2, 3), {
    shouldStopOnTop: true,
    itemData: makeItemByKey("BAG_SMALL"),
  })
]
let itemsLayer = tilesToLayer(mapSize, itemsTiles)

const structureTiles: LayerTile[] = [
  //Stairs Down
  makeTile(5, Pos(14, 4)),
]
let structureLayer = mergeLayers(mapSize,
  tilesToLayer(mapSize, structureTiles),
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