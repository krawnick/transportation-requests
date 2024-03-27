import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import {
  ERequestStatus,
  IRequestType,
} from '../../../interfaces/Request.interface'
import { RootState } from '../../store'

const initialState: {
  items: IRequestType[]
} = {
  items: [
    {
      number: 1,
      date: 'Wed, 27 Mar 2024 11:31:20 GMT',
      company: 'Hoff',
      responsible: 'Иванов И. В.',
      telephone: '9991234567',
      status: ERequestStatus.TRANSIT,
      code: '54321',
    },
    {
      number: 2,
      date: 'Wed, 27 Mar 2024 11:31:20 GMT',
      company: 'IKEA',
      responsible: 'Петров В. И.',
      telephone: '9992332323',
      comment: 'Доставить по будням после 17:00',
      status: ERequestStatus.DONE,
      code: '12345',
    },
    {
      number: 3,
      date: 'Wed, 27 Mar 2024 11:31:20 GMT',
      company: 'Hoff',
      responsible: 'Романов Ф. Л.',
      telephone: '9992343323',
      status: ERequestStatus.NEW,
      code: '34567',
    },
  ],
}

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<IRequestType>) => {
      state.items.push(action.payload)
    },
    changeItem: () => {},
    deleteItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.number !== action.payload)
    },
  },
})

export const dataReducer = dataSlice.reducer
export const { addItem, changeItem, deleteItem } = dataSlice.actions

export const selectorGetData = (state: RootState) => state.data.items
