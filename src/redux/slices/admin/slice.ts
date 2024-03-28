import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { IRequestType } from '../../../interfaces/Request.interface'
import { RootState } from '../../store'

interface TypeModal {
  type: 'add' | 'edit'
  selectItem?: IRequestType
}

interface InitialStateType {
  adminMode: boolean
  adminModal: {
    show: boolean
    type: TypeModal['type']
    selectItem?: TypeModal['selectItem'] | null
  }
}

const initialState: InitialStateType = {
  adminMode: true,
  adminModal: {
    show: false,
    type: 'add',
    selectItem: null,
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
      state.adminModal.type = action.payload.type
      if (action.payload.selectItem) {
        state.adminModal.selectItem = action.payload.selectItem
      }
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
