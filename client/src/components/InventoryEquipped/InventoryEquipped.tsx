import React from 'react'

import EquippedItemBox from './EquippedItemBox'
import './InventoryEquipped.css'


export default function InventoryEquipped() {
  return <table className="InventoryEquippedTable">
    <tbody>
      <tr>
        <EquippedItemBox label="Armor" />
        <EquippedItemBox label="Neck" />
        <EquippedItemBox label="Overgarment" />
        <EquippedItemBox label="Helm" />
        <EquippedItemBox label="Shield" />
      </tr>
      <tr>
        <EquippedItemBox label="Bracers" />
        <td colSpan={3} rowSpan={5}></td>
        <EquippedItemBox label="Gauntlets" />
      </tr>
      <tr>
        <EquippedItemBox label="Weapon" />
        <EquippedItemBox label="Free Hand" />
      </tr>
      <tr>
        <EquippedItemBox label="Right Ring" />
        <EquippedItemBox label="Left Ring" />
      </tr>
      <tr>
        <EquippedItemBox label="Belt" />
        <EquippedItemBox label="Boots" />
      </tr>
      <tr>
        <EquippedItemBox label="Pack" />
        <EquippedItemBox label="Purse" />
      </tr>
    </tbody>
  </table>
}