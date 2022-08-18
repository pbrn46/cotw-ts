import React from 'react'
import Stats from '../Stats'
import Messages from '../Messages'


export default function Bottom() {
  return <div className="grid grid-cols-12">
    <div className="col-span-9">
      <Messages />
    </div>
    <div className="col-span-3">
      <Stats />
    </div>
  </div>
}