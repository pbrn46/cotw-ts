import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { useSelector } from '../../redux/store'


export default function InventoryBags() {
  const bagItems = useSelector(state => state.inventory.pack?.contents)
  return <Grid container direction="column">
    <Grid item>
      Floor
    </Grid>
    <Grid item>
      <Typography>Bag Items</Typography>
      {bagItems && bagItems.map(bagItem => <div key={bagItem.itemKey}>
        {bagItem.tileId}
      </div>)}
    </Grid>
  </Grid>
}