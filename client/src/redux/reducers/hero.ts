import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AppThunk } from '../store'
import { isPassable } from '../../lib/mapUtil'
import { addMessage } from './messages'

type HeroState = {
  pos: Pos,
}

const initialState: HeroState = {
  pos: { x: 14, y: 5, },
}

const slice = createSlice({
  name: 'hero',
  initialState: initialState as HeroState,
  reducers: {
    setHero: (state, action: PayloadAction<HeroState>) => {
      return action.payload
    },
    // transposeHero: (state, action: PayloadAction<Pos>) => {
    //   state.pos.x = state.pos.x + action.payload.x
    //   state.pos.y = state.pos.y + action.payload.y
    // },
    setHeroPos: (state, action: PayloadAction<Pos>) => {
      state.pos = action.payload
    }
  },
})

export const { setHero, setHeroPos } = slice.actions

export default slice.reducer


export const transposeHero = (transposeBy: Pos): AppThunk => (dispatch, getState) => {
  const state = getState()
  const heroPos = state.hero.pos
  const targetPos = {
    x: heroPos.x + transposeBy.x,
    y: heroPos.y + transposeBy.y,
  }
  if (isPassable(targetPos, state.currentMap)) {
    dispatch(setHeroPos(targetPos))
  } else {
    dispatch(addMessage({
      message: "You can't move there.",
      severity: "normal"
    }))
    // Can detect and handle build entry here
  }
}