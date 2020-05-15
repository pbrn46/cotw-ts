import React from 'react'


type EquippedItemBoxProps = {
  label: string
}
export default function EquippedItemBox({ label }: EquippedItemBoxProps) {
  return <td style={{ width: "20%" }}>{label}</td>
}