import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { useInit } from '../../lib/init'

import Routes from '../Routes'


export default function Main() {
  useInit()
  return <>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </>
}