import React, { useCallback } from "react"
import { currentMapPxSizeSelector } from "../../redux/reducers/currentMap"
import { setCursorPos } from "../../redux/reducers/cursor"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import { Crosshair } from "../Crosshair"


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

  const dispatch = useAppDispatch()

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    dispatch(setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top }))
  }

  return <div style={{
    width: mapPxSize.width,
    height: mapPxSize.height,
    cursor: pendingCommand ? "none" : undefined,
    position: "absolute",
  }}
    onClick={handleClick}
    onMouseMove={handleMouseMove}
  >
    {children}
    {pendingCommand && <Crosshair />}
  </div>
}