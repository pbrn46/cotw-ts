import { createSlice, PayloadAction } from "@reduxjs/toolkit"


type CursorState = {
  pos: Pos
  icon: "crosshair" | null
}

const initialState: CursorState = {
  pos: { x: 0, y: 0 },
  icon: null,
}

const slice = createSlice({
  name: "cursor",
  initialState,
  reducers: {
    clearCursorIcon: (state) => {
      state.icon = null
    },
    setCursorPos: (state, action: PayloadAction<Pos>) => {
      state.pos = action.payload
    }
  }
})

export default slice.reducer

export const { clearCursorIcon, setCursorPos } = slice.actions