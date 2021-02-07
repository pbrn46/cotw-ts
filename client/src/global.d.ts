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

type ItemContainer = {
  contents: InventoryItem[]
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

type ItemLayerTile = LayerTile & ItemContainer

type Layers = {
  terrain: TerrainLayerTile[][][]
  structure: LayerTile[][][]
  traps: LayerTile[][][]
  items: ItemLayerTile[][][] // We only use the first index for itemTiles. Items go into itemTile.contents
  sprites: LayerTile[][][]
  projectiles: LayerTile[][][]
}

type Discovered = boolean[][]

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

type InventoryItem = ItemContainer & {
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
}

type DragDropItemContainerType = "container" | "floor" | "equipment"

type DragDropInventoryItem = {
  source: DragDropItemContainerType
  item: InventoryItem
}

type InventoryItemDragStartHandler = (e: React.DragEvent, item: InventoryItem) => void