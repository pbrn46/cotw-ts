import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { CssBaseline } from '@material-ui/core'

import Routes from '../Routes'
import { Provider } from 'react-redux'
import store from '../../redux/store'


export default function Main() {
  return <>
    <Provider store={store}>
      <CssBaseline />
      <Router>
        <Routes />
      </Router>
    </Provider>
  </>
}