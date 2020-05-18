import { getTilemapPosById } from "./tilemap"

describe('tilemap', () => {
  it('should return the corect position by id', () => {
    expect(getTilemapPosById(1)).toEqual({ x: 0, y: 0 })
    expect(getTilemapPosById(2)).toEqual({ x: 1, y: 0 })
    expect(getTilemapPosById(16)).toEqual({ x: 15, y: 0 })
    expect(getTilemapPosById(17)).toEqual({ x: 0, y: 1 })
  })
})