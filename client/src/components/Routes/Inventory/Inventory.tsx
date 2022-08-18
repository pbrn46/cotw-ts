import React from 'react'

import InventoryEquipped from '../../InventoryEquipped'
import { useKeyHandler } from '../../../lib/keyHandler'
import InventoryContainers from '../../InventoryContainers'


export default function Inventory() {
  useKeyHandler("inventory")

  return <div className="container mx-auto h-full">
    <div className="grid h-full grid-cols-12">
      <div className="col-span-8 sm:col-span-7 md:col-span-6 lg:col-span-5 xl:col-span-4">
        <InventoryEquipped />
      </div>
      <div className="col-span-4 sm:col-span-5 md:col-span-6 lg:col-span-7 xl:col-span-8">
        <InventoryContainers />
      </div>
    </div>
  </div>
}
