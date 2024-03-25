import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

export const store = configureStore({
  reducer: {},
})

export type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch
type DispatchFunc = () => AppDispatch

export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
