import { configureStore, ThunkAction, Action, getDefaultMiddleware, ThunkDispatch } from '@reduxjs/toolkit'
import { useSelector, useDispatch as useReduxDispatch, TypedUseSelectorHook } from 'react-redux'
import Reducers from './reducers'

const custimezedMiddleware = getDefaultMiddleware({
  immutableCheck: false,
  serializableCheck: false,
})

export const store = configureStore({
  reducer: Reducers,
  middleware: custimezedMiddleware,
})

export default store


/** Typed useSelector */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

/** Typed useDispatch */
export type Dispatch = ThunkDispatch<RootState, void, Action>
export const useAppDispatch = () => useReduxDispatch<Dispatch>()

export type RootState = ReturnType<typeof store.getState>
export type AppThunk<R = void> = ThunkAction<R, RootState, unknown, Action<any>>
