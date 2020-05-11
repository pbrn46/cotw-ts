import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'


type MessagesState = (Message & { listKey: string })[]

const initialState: MessagesState = []
const slice = createSlice({
  name: 'message',
  initialState: initialState as MessagesState,
  reducers: {
    setMessages: (state, action: PayloadAction<MessagesState>) => {
      return action.payload
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      return [...state, { ...action.payload, listKey: uuidv4() }]
    }
  },
})

export const { setMessages, addMessage } = slice.actions

export default slice.reducer
