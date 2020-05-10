import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type HeroState = {
  pos: Pos,
}

const initialState: HeroState = {
  pos: { x: 5, y: 5, },
}

const slice = createSlice({
  name: 'hero',
  initialState: initialState as HeroState,
  reducers: {
    setHero: (state, action: PayloadAction<HeroState>) => {
      return action.payload
    },
    transposeHero: (state, action: PayloadAction<Pos>) => {
      state.pos.x = state.pos.x + action.payload.x
      state.pos.y = state.pos.y + action.payload.y
    },
  },
})

export const { setHero, transposeHero } = slice.actions

export default slice.reducer