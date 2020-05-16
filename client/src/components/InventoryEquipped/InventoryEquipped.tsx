import React from 'react'

import EquippedItemBox from './EquippedItemBox'
import './InventoryEquipped.css'


export default function InventoryEquipped() {
  return <table className="InventoryEquippedTable">
    <tbody>
      <tr>
        <EquippedItemBox label="Armor" type="armor" />
        <EquippedItemBox label="Neck" type="neckwear" />
        <EquippedItemBox label="Overgarment" type="overgarment" />
        <EquippedItemBox label="Helm" type="helmet" />
        <EquippedItemBox label="Shield" type="shield" />
      </tr>
      <tr>
        <EquippedItemBox label="Bracers" type="bracers" />
        <td colSpan={3} rowSpan={5}></td>
        <EquippedItemBox label="Gauntlets" type="gauntlets" />
      </tr>
      <tr>
        <EquippedItemBox label="Weapon" type="weapon" />
        <EquippedItemBox label="Free Hand" type="freeHand" />
      </tr>
      <tr>
        <EquippedItemBox label="Right Ring" type="rightRing" />
        <EquippedItemBox label="Left Ring" type="leftRing" />
      </tr>
      <tr>
        <EquippedItemBox label="Belt" type="belt" />
        <EquippedItemBox label="Boots" type="boots" />
      </tr>
      <tr>
        <EquippedItemBox label="Pack" type="pack" />
        <EquippedItemBox label="Purse" type="purse" />
      </tr>
    </tbody>
  </table>
}