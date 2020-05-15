import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from './Home'
import Inventory from './Inventory'


export default function Routes() {
  return <Switch>
    <Route
      path="/"
      exact
      component={Home} />
    <Route
      path="/inventory"
      component={Inventory} />
  </Switch>
}