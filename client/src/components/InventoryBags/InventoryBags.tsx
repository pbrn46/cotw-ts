import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { useSelector } from '../../redux/store'
import CanvasTileSingle from '../CanvasTileSingle'


export default function InventoryBags() {
  const bagItems = useSelector(state => state.inventory.pack?.contents)
  return <Grid container direction="column">
    <Grid item>
      Floor
    </Grid>
    <Grid item>
      <Typography>Bag Items</Typography>
      {bagItems && bagItems.map(bagItem => <span key={bagItem.itemKey}>
        <CanvasTileSingle tileId={bagItem.tileId} />
      </span>)}
    </Grid>
  </Grid>
}