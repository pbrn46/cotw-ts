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

type LayerTile = {
  tileId: number,
  pos: Pos,
  impassable?: boolean
}

type TerrainLayerTile = LayerTile & {
  isLit?: boolean
  isRoom?: boolean
}

interface Layers {
  terrain: TerrainLayerTile[]
  structure: LayerTile[]
  traps: LayerTile[]
  items: LayerTile[]
  sprites: LayerTile[]
  projectiles: LayerTile[]
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