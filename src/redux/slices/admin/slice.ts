import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { RootState } from '../../store'

type TypeModal = 'edit' | 'add'

interface InitialStateType {
  adminMode: boolean
  adminModal: {
    show: boolean
    type: TypeModal
  }
}

const initialState: InitialStateType = {
  adminMode: true,
  adminModal: {
    show: false,
    type: 'add',
  },
}

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    adminMode: (state) => {
      state.adminMode = !state.adminMode
    },
    adminModalShow: (state, action: PayloadAction<TypeModal>) => {
      state.adminModal.show = true
      state.adminModal.type = action.payload
    },
    adminModalClose: (state) => {
      state.adminModal.show = false
    },
  },
})

export const adminReducer = adminSlice.reducer
export const { adminMode, adminModalShow, adminModalClose } = adminSlice.actions

export const selectorAdminMode = (state: RootState) => state.admin.adminMode
export const selectorAdminModal = (state: RootState) => state.admin.adminModal
