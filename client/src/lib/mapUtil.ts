
export function tilePosToPx(pos: Pos, tileSize: Size): Pos {
  return {
    x: pos.x * tileSize.width,
    y: pos.y * tileSize.height,
  }
}

export function tileSizeToPx(size: Size, tileSize: Size): Size {
  return {
    width: size.width * tileSize.width,
    height: size.height * tileSize.height,
  }
}

/** Returns true if positions are the same */
export function isSamePos(a: Pos, b: Pos) {
  return a.x === b.x && a.y === b.y
}

export function isPassable(pos: Pos, currentMap: MapState): boolean {
  for (let tile of currentMap.layers.terrain) {
    if (tile.impassable && isSamePos(tile.pos, pos)) {
      return false
    }
  }
  for (let tile of currentMap.layers.structure) {
    if (tile.impassable && isSamePos(tile.pos, pos)) {
      return false
    }
  }
  return true
}


export function genCastle(pos: Pos, size: Size, gateSide?: Side): Pick<Layers, "terrain" | "structure"> {
  let structure: LayerTile[] = []

  // TR corner
  structure.push({ tileId: 41, pos: { x: pos.x + size.width - 1, y: pos.y }, impassable: true, })
  // BR corner
  structure.push({ tileId: 42, pos: { x: pos.x + size.width - 1, y: pos.y + size.height - 1 }, impassable: true, })
  // BL corner
  structure.push({ tileId: 43, pos: { x: pos.x, y: pos.y + size.height - 1 }, impassable: true, })
  // TL corner
  structure.push({ tileId: 44, pos: { x: pos.x, y: pos.y }, impassable: true, })


  for (let x = pos.x + 1; x < pos.x + size.width - 1; x++) {
    structure.push({ tileId: 45, pos: { x, y: pos.y }, impassable: true, })
    // Bottom wall
    structure.push({ tileId: 47, pos: { x, y: pos.y + size.height - 1 }, impassable: true, })
  }

  for (let y = pos.y + 1; y < pos.y + size.height - 1; y++) {
    // Left wall
    structure.push({ tileId: 48, pos: { x: pos.x, y }, impassable: true, })
    // Right wall
    structure.push({ tileId: 46, pos: { x: pos.x + size.width - 1, y }, impassable: true, })
  }

  // Replace wall with gate
  if (gateSide) {
    let gatePos: Pos = { x: -1, y: -1 }
    const midX = Math.floor(((pos.x * 2) + size.width) / 2)
    const midY = Math.floor(((pos.y * 2) + size.height) / 2)
    console.log(midX, midY)
    switch (gateSide) {
      case "top":
        gatePos = { x: midX, y: pos.y }
        break
      case "bottom":
        gatePos = { x: midX, y: pos.y + size.height - 1 }
        break
      case "left":
        gatePos = { x: pos.x, y: midY }
        break
      case "right":
        gatePos = { x: pos.x + size.height - 1, y: midY }
        break
    }
    structure = [
      ...structure.filter(tile => !isSamePos(tile.pos, gatePos)),
      { tileId: 7, pos: gatePos, }, // Gate
    ]
  }

  const terrain = genRect({ x: pos.x + 1, y: pos.y + 1 }, { width: size.width - 2, height: size.height - 2 }, { tileId: 294 })

  return { structure, terrain }
}

/** Generate array of tiles to fill a rectangle */
export function genRect(pos: Pos, size: Size, tileData: Omit<LayerTile, "pos">): LayerTile[] {
  let out: LayerTile[] = []
  for (let y = pos.y; y < pos.y + size.height; y++) {
    for (let x = pos.x; x < pos.x + size.width; x++) {
      out.push({ ...tileData, pos: { x, y } })
    }
  }
  console.log(out)
  return out
}

export function getSurroundingPoses(pos: Pos, includeSelf: boolean): Pos[] {
  return [
    { x: pos.x, y: pos.y - 1 },
    { x: pos.x + 1, y: pos.y - 1 },
    { x: pos.x + 1, y: pos.y },
    { x: pos.x + 1, y: pos.y + 1 },
    { x: pos.x, y: pos.y + 1 },
    { x: pos.x - 1, y: pos.y + 1 },
    { x: pos.x - 1, y: pos.y },
    { x: pos.x - 1, y: pos.y - 1 },
    ...(includeSelf ? [{ x: pos.x, y: pos.y }] : []),
  ]
}