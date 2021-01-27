import { createSlice, PayloadAction } from "@reduxjs/toolkit"


type CommandState = {
  pendingCommand: string | null
}
const initialState: CommandState = {
  pendingCommand: null
}

const slice = createSlice({
  name: "command",
  initialState,
  reducers: {
    setPendingCommand: (state, action: PayloadAction<string | null>) => {
      state.pendingCommand = action.payload
    }
  },
})

export default slice.reducer


export const { setPendingCommand } = slice.actions