import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AppThunk } from '../store'
import { isPassable, getRandomPassablePos, inBounds } from '../../lib/mapUtil'
import { discoverSurroundings } from './currentMap'
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

export const { setHero, setHeroPos, incrementHeroTime } = slice.actions

export default slice.reducer


export const transposeHero = (transposeBy: Pos): AppThunk<boolean> => (dispatch, getState) => {
  const state = getState()
  const heroPos = state.hero.pos
  const targetPos = {
    x: heroPos.x + transposeBy.x,
    y: heroPos.y + transposeBy.y,
  }
  if (isPassable(targetPos, state.currentMap)) {
    batch(() => {
      dispatch(incrementHeroTime(2.3))
      dispatch(setHeroPos(targetPos))
      dispatch(discoverSurroundings(targetPos))
    })
    return true
  } else {
    // dispatch(addMessage({
    //   message: "You can't move there.",
    //   severity: "normal"
    // }))
    return false
    // Can detect and handle door or cross map entry here
  }
}

export const randomHeroPos = (): AppThunk => (dispatch, getState) => {
  const state = getState()
  const pos = getRandomPassablePos(state.currentMap)
  if (inBounds(pos, state.currentMap.size)) {
    dispatch(setHeroPos(pos))
    dispatch(discoverSurroundings(pos))
  }
}