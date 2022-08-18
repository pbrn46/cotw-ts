import React from 'react'
import WorldView from '../../WorldView'
import Bottom from '../../Bottom'
import Top from '../../Top'
import { useKeyHandler } from '../../../lib/keyHandler'


export default function Home() {
  useKeyHandler("home")
  return <div className="container mx-auto h-full">
    <div className="flex flex-col h-full">
      <div>
        <Top />
      </div>
      <div className="grow">
        <WorldView />
      </div>
      <div>
        <Bottom />
      </div>
    </div>
  </div>
}