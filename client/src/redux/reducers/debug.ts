import { AppThunk } from "../store"
import { setCurrentMap, discoverSurroundings } from "./currentMap"
import { genMap, Size } from "../../lib/mapUtil"
import { randomHeroPos } from "./hero"
import { setShrouded } from "./config"


export const debugTest1 = (): AppThunk => (dispatch, getState) => {
  const runDebug = () => {
    dispatch(setShrouded(false))
    dispatch(setCurrentMap(genMap(Size(60, 60), 10)))
    dispatch(randomHeroPos())
    const heroPos = getState().hero.pos
    dispatch(discoverSurroundings(heroPos))
  }
  runDebug()
}