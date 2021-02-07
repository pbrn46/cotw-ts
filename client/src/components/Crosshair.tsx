import { Add } from "@material-ui/icons"
import { useAppSelector } from "../redux/store"


export function Crosshair() {
  const pos = useAppSelector(state => state.cursor.pos)
  return <div style={{
    position: "absolute",
    left: pos.x,
    top: pos.y,
  }}>
    <Add style={{
      transform: "translate(-50%, -50%)"
    }} />
  </div>
}