import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AppThunk } from '../store'
import { isPassable, getRandomPassablePos, inBounds, incrementPosByDirection, Pos, isStopOnTop, isStopBefore } from '../../lib/mapUtil'
import { discoverSurroundings, openDoorAtPos } from './currentMap'
import { batch } from 'react-redux'

type HeroState = {
  pos: Pos,
  stats: SpriteStats,
}

const initialState: HeroState = {
  pos: { x: 14, y: 15, },
  stats: {
    hp: 10,
    hpMax: 10,
    mp: 10,
    mpMax: 10,
    speed: 100,
    speedMax: 200,
    time: 0,
  }
}

const slice = createSlice({
  name: 'hero',
  initialState: initialState as HeroState,
  reducers: {
    setHero: (state, action: PayloadAction<HeroState>) => {
      return action.payload
    },
    setHeroPos: (state, action: PayloadAction<Pos>) => {
      state.pos = action.payload
    },
    incrementHeroTime: (state, action: PayloadAction<number | undefined>) => {
      state.stats.time = state.stats.time + (action.payload === undefined ? 1 : action.payload)
    }
  },
})

export const { setHero, setHeroPos: updateHeroPos, incrementHeroTime } = slice.actions

export default slice.reducer

export const moveHero = (pos: Pos): AppThunk => (dispatch, getState) => {
  batch(() => {
    dispatch(updateHeroPos(pos))
    dispatch(openDoorAtPos(pos))
    dispatch(discoverSurroundings(pos))
  })
}

export const randomHeroPos = (): AppThunk => (dispatch, getState) => {
  const state = getState()
  const pos = getRandomPassablePos(state.currentMap)
  if (inBounds(pos, state.currentMap.size)) {
    dispatch(moveHero(pos))
  }
}

export const heroWalkByDirection = (direction: Direction): AppThunk => (dispatch, getState) => {
  const state = getState()
  const targetPos = incrementPosByDirection(state.hero.pos, direction)
  if (isPassable(targetPos, state.currentMap)) {
    dispatch(moveHero(targetPos))
    dispatch(incrementHeroTime(2.3)) // Should probably multiply by distance
  }
}

export const heroSprintByDirection = (direction: Direction): AppThunk => (dispatch, getState) => {
  batch(() => {
    while (true) {
      const state = getState()
      const nextPos = incrementPosByDirection(state.hero.pos, direction)
      if (isPassable(nextPos, state.currentMap)) {
        if (isStopBefore(nextPos, state.currentMap)) break
        dispatch(moveHero(nextPos))
        if (isStopOnTop(nextPos, state.currentMap)) break
      }
      else break
    }
  })
}