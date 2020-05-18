type Side = "top" | "bottom" | "left" | "right"

type Direction = "up" | "down" | "left" | "right" | "upperRight" | "upperLeft" | "lowerRight" | "lowerLeft" | "none"

type Size = {
  width: number,
  height: number,
}

type Pos = {
  x: number,
  y: number,
}

type TileId = number

type TilemapData = {
  tileId: number
  label: string
}

type LayerTile = TilemapData & {
  tileListKey: string,
  pos: Pos,
  impassable?: boolean
  shouldStopBefore?: boolean
  shouldStopOnTop?: boolean
}

type TerrainLayerTile = LayerTile & {
  isLit?: boolean
  isRoom?: boolean
}

type ItemLayerTile = LayerTile & {
  itemData?: InventoryItemData
}

type Layers = {
  terrain: TerrainLayerTile[][][]
  structure: LayerTile[][][]
  traps: LayerTile[][][]
  items: ItemLayerTile[][][]
  sprites: LayerTile[][][]
  projectiles: LayerTile[][][]
}

type Discovered = boolean[][]

type MapState = {
  size: Size,
  layers: Layers,
  discovered: Discovered,
}

type Severity = "normal" | "warning" | "danger"
type Message = {
  message: string
  severity: Severity
}


type SpriteStats = {
  hp: number,
  hpMax: number,
  mp: number,
  mpMax: number,
  speed: number,
  speedMax: number,
  time: number,
}

type ShroudMode = "hidden" | "visible" | "alpha"

type EquippableType =
  "armor" | "neckwear" | "overgarment" | "helmet" | "shield"
  | "bracers" | "gauntlets"
  | "weapon" | "freeHand"
  | "rightRing" | "leftRing"
  | "belt" | "boots"
  | "pack" | "purse"

type ItemType = Exclude<EquippableType, "rightRing" | "leftRing" | "freeHand">
  | "potion" | "scroll" | "ring" | "wand" | "container"

type InventoryItemData = {
  tileId: TileId,
  itemListKey: string,
  weight: number,
  bulk: number,
  sellValue: number,
  buyValue: number,
  label: string,
  charges?: number,
  isJunk?: boolean,
  itemType: ItemType,
  contents?: InventoryItemData[]
}