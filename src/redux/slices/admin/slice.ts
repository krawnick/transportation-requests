import { createSlice } from '@reduxjs/toolkit'

import { RootState } from '../../store'

const initialState = {
  adminMode: true,
}

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    adminMode: (state) => {
      state.adminMode = !state.adminMode
    },
  },
})

export const adminReducer = adminSlice.reducer
export const { adminMode } = adminSlice.actions

export const selectorAdminMode = (state: RootState) => state.admin.adminMode
