import { AppThunk } from "../store"
import { setCurrentMap, discoverSurroundings } from "./currentMap"
import { genMap, Size, Pos } from "../../lib/mapUtil"
import { setHeroPos } from "./hero"
import { setShrouded } from "./config"


export const debugTest1 = (): AppThunk => (dispatch, getState) => {
  dispatch(setShrouded(false))
  dispatch(setCurrentMap(genMap(Size(30, 30), 5)))
  dispatch(setHeroPos(Pos(10, 10)))
  const heroPos = getState().hero.pos
  dispatch(discoverSurroundings(heroPos))
}