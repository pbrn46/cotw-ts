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

type LayerTile = {
  tileId: TileId,
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
  itemProps?: InventoryItem
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

type ItemType = Omit<EquippableType, "rightRing" | "leftRing" | "freeHand">
  | "potion" | "scroll" | "ring" | "wand" | "container"

type InventoryItem = {
  tileId: TileId
  weight: number,
  bulk: number,
  sellValue: number,
  buyValue: number,
  itemType: ItemType,
  contents?: InventoryItem[]
  charges?: number,
  isJunk?: boolean,
}