import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { CssBaseline } from '@material-ui/core'
import { useInit } from '../../lib/init'

import Routes from '../Routes'


export default function Main() {
  useInit()
  return <>
    <CssBaseline />
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </>
}