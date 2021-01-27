import React, { useCallback } from "react"
import { currentMapPxSizeSelector } from "../../redux/reducers/currentMap"
import { useAppSelector } from "../../redux/store"


type ClickLayerProps = {
  children?: React.ReactNode
}
export default function ClickLayer({ children }: ClickLayerProps) {
  // const mapSize = useAppSelector(state => state.currentMap.size)
  const pendingCommand = useAppSelector(state => state.command.pendingCommand)
  const mapPxSize = useAppSelector(currentMapPxSizeSelector)
  const handleClick = useCallback((e: React.MouseEvent) => {
    console.log(e.clientX, e.clientY, e.pageX, e.pageY, e.screenX, e.screenY)
  }, [])
  return <div style={{
    width: mapPxSize.width,
    height: mapPxSize.height,
    cursor: pendingCommand ? "crosshair" : undefined,
    position: "absolute",
  }}
    onClick={handleClick}
  >
    {children}
  </div>
}