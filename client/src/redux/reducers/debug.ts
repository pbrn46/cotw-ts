import { AppThunk } from "../store"
import { setCurrentMap, discoverSurroundings } from "./currentMap"
import { genDungeonMap, Size } from "../../lib/mapUtil"
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