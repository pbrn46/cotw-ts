type Side = "top" | "bottom" | "left" | "right"

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

interface Layers {
  terrain: LayerTile[]
  structure: LayerTile[]
  traps: LayerTile[]
  items: LayerTile[]
  sprites: LayerTile[]
  projectiles: LayerTile[]
}

type MapState = {
  size: Size,
  layers: Layers,
}

type Severity = "normal" | "warning" | "danger"
type Message = {
  message: string
  severity: Severity
}