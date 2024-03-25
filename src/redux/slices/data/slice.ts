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
      date: '1-25-2024 13:23',
      company: 'Hoff',
      responsible: 'Иванов И. В.',
      telephone: 9991234567,
      comment: 'Доставить по будням после 17:00',
      status: ERequestStatus.TRANSIT,
      code: 54321,
    },
    {
      number: 2,
      date: '3-20-2024 14:21',
      company: 'Hoff',
      responsible: 'Петров В. И.',
      telephone: 9992332323,
      comment: 'Доставить по будням после 17:00',
      status: ERequestStatus.DONE,
      code: 12345,
    },
  ],
}

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<IRequestType>) => {
      console.log(state, action)
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
