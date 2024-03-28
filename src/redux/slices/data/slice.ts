import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { ELoadingStatus } from '../../../enum/Status.enum'
import { IRequestType } from '../../../interfaces/Request.interface'
import { RootState } from '../../store'

interface InitialStateType {
  items: IRequestType[]
  status: ELoadingStatus
}

export const getData = createAsyncThunk<
  IRequestType[],
  void,
  { state: RootState }
>('data/getData', async () => {
  return await fetch(import.meta.env.VITE_API_URL)
    .then((res) => {
      if (!res.ok) throw new Error('Ошибка при получении данных')

      return res.json()
    })
    .catch((error) => {
      alert(error)
      return []
    })
})

export const addData = createAsyncThunk<
  void,
  IRequestType,
  { state: RootState }
>('data/addData', async (item, { dispatch }) => {
  return await fetch(import.meta.env.VITE_API_URL, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(item),
  })
    .then((res) => {
      if (!res.ok) throw new Error('Ошибка при добавлении данных')
      dispatch(addItem(item))
      alert('Заявка успешно добавлена')
    })
    .catch((error) => {
      alert(error)
    })
})

export const deleteData = createAsyncThunk<void, number, { state: RootState }>(
  'data/deleteData',
  async (id, { dispatch }) => {
    return await fetch(import.meta.env.VITE_API_URL + '/' + id, {
      method: 'DELETE',
    })
      .then((res) => {
        if (!res.ok) throw new Error('Ошибка при удалении данных')
        dispatch(deleteItem(id))
        alert('Заявка успешно удалена')
      })
      .catch((error) => {
        alert(error)
      })
  }
)

export const updateData = createAsyncThunk<
  void,
  IRequestType,
  { state: RootState }
>('data/updateData', async (item, { dispatch }) => {
  return await fetch(import.meta.env.VITE_API_URL + '/' + item.id, {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(item),
  })
    .then((res) => {
      if (!res.ok) throw new Error('Ошибка при обновлении данных')
      dispatch(updateItem(item))
      alert('Заявка успешно обновлена')
    })
    .catch((error) => {
      alert(error)
    })
})

const initialState: InitialStateType = {
  items: [],
  status: ELoadingStatus.LOADING,
}

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<IRequestType>) => {
      state.items.push(action.payload)
    },
    updateItem: (state, action: PayloadAction<IRequestType>) => {
      state.items = state.items.map((item) => {
        return item.id === action.payload.id ? action.payload : item
      })
    },
    deleteItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(getData.pending, (state) => {
        state.items = []
        state.status = ELoadingStatus.LOADING
      })
      .addCase(
        getData.fulfilled,
        (state, action: PayloadAction<IRequestType[]>) => {
          state.items = action.payload
          state.status = ELoadingStatus.SUCCESS
        }
      )
      .addCase(getData.rejected, (state) => {
        state.items = []
        state.status = ELoadingStatus.ERROR
      })
  },
})

export const dataReducer = dataSlice.reducer
export const { addItem, updateItem, deleteItem } = dataSlice.actions

export const selectorGetData = (state: RootState) => state.data.items
export const selectorStatusLoadingData = (state: RootState) => state.data.status
