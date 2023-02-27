import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type SortProps = {
  name: string
  sortProperty: string
}

export const sortTypeList: SortProps[] = [
  { name: 'популярности', sortProperty: 'rating' },
  { name: 'цене', sortProperty: 'price' },
  { name: 'алфавиту', sortProperty: 'title' },
]

export interface FilterState {
  searchValue?: string
  categoryId: number
  currentPage: number
  sort: SortProps
}

const initialState: FilterState = {
  searchValue: '',
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: 'популярности',
    sortProperty: 'rating',
  },
}

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload
    },
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload
    },
    setSort(state, action: PayloadAction<SortProps>) {
      state.sort = action.payload
    },
    setPageCount(state, action: PayloadAction<number>) {
      state.currentPage = action.payload
    },
    setParams(state, action: PayloadAction<FilterState>) {
      state.currentPage = action.payload.currentPage
      state.categoryId = action.payload.categoryId
      state.sort = action.payload.sort
    },
  },
})

export const { setSearchValue, setCategoryId, setSort, setPageCount, setParams } = filterSlice.actions
export default filterSlice.reducer
