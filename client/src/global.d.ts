
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
}

type StructureLayerTile = LayerTile & {
  passable: boolean
}


interface Layers {
  terrain: LayerTile[]
  structure: StructureLayerTile[]
  items: LayerTile[]
  sprites: LayerTile[]
  projectiles: LayerTile[]
}

type MapState = {
  size: Size,
  layers: Layers,
}