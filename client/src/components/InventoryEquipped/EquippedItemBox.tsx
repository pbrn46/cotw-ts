import React from 'react'
import { useSelector } from '../../redux/store'
import CanvasTileSingle from '../CanvasTileSingle'


type EquippedItemBoxProps = {
  label: string
  type: EquippableType
}
export default function EquippedItemBox({ label, type }: EquippedItemBoxProps) {
  const itemInSlot = useSelector(state => state.inventory[type])
  return <td style={{ width: "20%" }}>
    {itemInSlot ? (
      <span>
        <CanvasTileSingle tileId={itemInSlot.tileId} />
        <br /> {itemInSlot.label}
      </span>
    ) : label}
  </td>
}