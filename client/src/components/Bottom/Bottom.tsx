import React from 'react'
import { Grid } from '@material-ui/core'
import Stats from '../Stats'
import Messages from '../Messages'


export default function Bottom() {
  return <Grid container>
    <Grid item xs={9}>
      <Messages />
    </Grid>
    <Grid item xs={3}>
      <Stats />
    </Grid>
  </Grid>
}