import { useEffect } from "react"
import { useDispatch } from "../redux/store"
import { loadMap, discoverSurroundings } from "../redux/reducers/currentMap"


export function useInit() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadMap())
    dispatch(discoverSurroundings())
  }, [dispatch])
}