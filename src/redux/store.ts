import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import { adminReducer } from './slices/admin/slice'
import { dataReducer } from './slices/data/slice'

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    data: dataReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch
type DispatchFunc = () => AppDispatch

export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
