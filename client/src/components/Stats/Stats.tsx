import React, { useMemo } from 'react'
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
    <div className="grid grid-cols-2">
      <div>HP</div>
      <div>{stats.hp} ({stats.hpMax})</div>
      <div>Mana</div>
      <div>{stats.mp} ({stats.mpMax})</div>
      <div>Speed</div>
      <div>{stats.speed}% / {stats.speedMax}%</div>
      <div>Time</div>
      <div>{duration}</div>
      <div>Location</div>
      <div>Somewhere</div>
    </div>
  </div>
}