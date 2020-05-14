import { useEffect } from "react"
import { useDispatch } from "../redux/store"
import { loadMap, discoverSurroundings } from "../redux/reducers/currentMap"
import { debugTest1 } from "../redux/reducers/debug"


export function useInit() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadMap())
    dispatch(discoverSurroundings())
    dispatch(debugTest1())
  }, [dispatch])
}