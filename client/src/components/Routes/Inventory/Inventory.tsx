import React from 'react'
import { Grid, Container } from '@material-ui/core'

import InventoryEquipped from '../../InventoryEquipped'
import { useKeyHandler } from '../../../lib/keyHandler'


export default function Inventory() {
  useKeyHandler("inventory")

  return <Container style={{ height: "100%" }}>
    <Grid container style={{ height: "100%" }}>
      <Grid item xs={8} sm={7} md={6} lg={5} xl={4}>
        <InventoryEquipped />
      </Grid>
      <Grid item xs={4} sm={5} md={6} lg={7} xl={8}>
        Bags</Grid>
    </Grid>
  </Container>
}
