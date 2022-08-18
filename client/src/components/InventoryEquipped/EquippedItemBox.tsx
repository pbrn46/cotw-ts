import React from 'react'
import { useAppSelector } from '../../redux/store'
import CanvasTileSingle from '../CanvasTileSingle'


type EquippedItemBoxProps = {
  /** Label of the slot/equipment type */
  label: string
  type: EquippableType
}
export default function EquippedItemBox({ label, type }: EquippedItemBoxProps) {
  const itemInSlot = useAppSelector(state => state.inventory[type])
  return <td className="w-[20%]">
    {itemInSlot ? (
      <div className="flex flex-col items-center">
        <CanvasTileSingle tileId={itemInSlot.tileId} />
        <span>
          {itemInSlot.label}
        </span>
      </div>
    ) : label}
  </td>
}