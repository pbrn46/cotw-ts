import React from 'react'
import { useAppSelector } from '../../redux/store'
import CanvasTileSingle from '../CanvasTileSingle'


type EquippedItemBoxProps = {
  label: string
  type: EquippableType
}
export default function EquippedItemBox({ label, type }: EquippedItemBoxProps) {
  const itemInSlot = useAppSelector(state => state.inventory[type])
  return <td style={{ width: "20%" }}>
    {itemInSlot ? (
      <span>
        <CanvasTileSingle tileId={itemInSlot.tileId} />
        <br /> {itemInSlot.label}
      </span>
    ) : label}
  </td>
}