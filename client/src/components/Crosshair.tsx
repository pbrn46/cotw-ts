import { useAppSelector } from "../redux/store"


export function Crosshair() {
  const pos = useAppSelector(state => state.cursor.pos)
  return <div
    className="absolute"
    style={{
      left: pos.x,
      top: pos.y,
    }}>
    <i className="bi bi-plus-lg text-2xl inline-block text-black -translate-x-1/2 -translate-y-1/2" />
  </div>
}