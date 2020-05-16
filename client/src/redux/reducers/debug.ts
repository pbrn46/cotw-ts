import { AppThunk } from "../store"
import { setCurrentMap, discoverSurroundings } from "./currentMap"
import { Size } from "../../lib/mapUtil"
import { genDungeonMap } from "../../lib/generators"
import { randomHeroPos } from "./hero"
import { setShroudMode } from "./config"


export const debugTest1 = (): AppThunk => (dispatch, getState) => {
  const runDebug = () => {
    dispatch(setShroudMode("alpha"))
    dispatch(setCurrentMap(genDungeonMap(Size(60, 60), 10)))
    dispatch(randomHeroPos())
    const heroPos = getState().hero.pos
    dispatch(discoverSurroundings(heroPos))
  }
  runDebug()
}