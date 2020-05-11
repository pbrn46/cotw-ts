import React from 'react'
import { Grid } from '@material-ui/core'

export default function Stats() {
  return <div>
    <Grid container>
      <Grid item xs={6}>HP</Grid>
      <Grid item xs={6}>33 (33)</Grid>
      <Grid item xs={6}>Mana</Grid>
      <Grid item xs={6}>10 (16)</Grid>
      <Grid item xs={6}>Speed</Grid>
      <Grid item xs={6}>100% / 200%</Grid>
      <Grid item xs={6}>Time</Grid>
      <Grid item xs={6}>0d, 00:00:01</Grid>
      <Grid item xs={6}>Location</Grid>
      <Grid item xs={6}>Somewhere</Grid>
    </Grid>
  </div>
}