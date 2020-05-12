import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { CssBaseline } from '@material-ui/core'
import { useInit } from '../../lib/init'

import Routes from '../Routes'


export default function Main() {
  useInit()
  return <>
    <CssBaseline />
    <Router>
      <Routes />
    </Router>
  </>
}