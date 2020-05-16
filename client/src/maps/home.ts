import { genCastle, make2dArray, fillRemaining, tilesToLayer, mergeLayers, uniqueKey, makeTile, Pos } from "../lib/mapUtil"
import { getTilemapInfoByKey } from "../assets/tilemap"


const mapSize: Size = { width: 80, height: 40 }

const castle = genCastle(mapSize, { x: 10, y: 2 }, { width: 9, height: 9 }, "bottom")

const spritesTiles: LayerTile[] = [
  makeTile(264, Pos(2, 2), { impassable: true }),
]
let spritesLayer = tilesToLayer(mapSize, spritesTiles)

let terrainTiles: TerrainLayerTile[] = [
  makeTile(290, Pos(14, 11)),
  makeTile(290, Pos(14, 12)),
  makeTile(290, Pos(14, 13)),
  makeTile(290, Pos(14, 14)),
  makeTile(290, Pos(14, 15)),

  makeTile(305, Pos(12, 13), { impassable: true, }),
  makeTile(306, Pos(13, 13), { impassable: true, }),
  makeTile(321, Pos(12, 14), { impassable: true, }),
  makeTile(322, Pos(13, 14), { impassable: true, }),
  // ...castle.terrain,
]
let terrainLayer = mergeLayers(
  mapSize,
  tilesToLayer(mapSize, terrainTiles),
  castle.terrain,
)
terrainLayer = fillRemaining(mapSize, terrainLayer, {
  tileId: getTilemapInfoByKey("GRASS").tileId
})

const itemsTiles: ItemLayerTile[] = [
  makeTile<ItemLayerTile>(85, Pos(2, 3), {
    shouldStopOnTop: true, itemProps: {
      itemKey: uniqueKey(),
      bulk: 500,
      weight: 500,
      tileId: 85,
      sellValue: 50,
      buyValue: 100,
      itemType: "container"
    }
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