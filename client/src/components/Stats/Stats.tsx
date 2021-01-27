import React, { useMemo } from 'react'
import { Grid } from '@material-ui/core'
import { useAppSelector } from '../../redux/store'
import moment from 'moment'


export default function Stats() {
  const stats = useAppSelector(state => state.hero.stats)

  const duration = useMemo(() => {
    const d = moment.duration(stats.time, "seconds")
    const days = Math.floor(d.asDays())
    const hours = d.hours().toString().padStart(2, '0')
    const minutes = d.minutes().toString().padStart(2, '0')
    const seconds = d.seconds().toString().padStart(2, '0')
    return `${days}d, ${hours}:${minutes}:${seconds}`
  }, [stats.time])


  return <div style={{ padding: 10 }}>
    <Grid container>
      <Grid item xs={6}>HP</Grid>
      <Grid item xs={6}>{stats.hp} ({stats.hpMax})</Grid>
      <Grid item xs={6}>Mana</Grid>
      <Grid item xs={6}>{stats.mp} ({stats.mpMax})</Grid>
      <Grid item xs={6}>Speed</Grid>
      <Grid item xs={6}>{stats.speed}% / {stats.speedMax}%</Grid>
      <Grid item xs={6}>Time</Grid>
      <Grid item xs={6}>{duration}</Grid>
      <Grid item xs={6}>Location</Grid>
      <Grid item xs={6}>Somewhere</Grid>
    </Grid>
  </div>
}