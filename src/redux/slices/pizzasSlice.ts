import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import PizzaBlock from '../../components/PizzaBlock'
import axios from 'axios'

export const fetchPizzas = createAsyncThunk(
  'pizzas/fetchPizzas',
  async (params: { currentPage: number; sortBy: string; category: string; search: string }) => {
    const { currentPage, sortBy, category, search } = params
    const res = await axios.get(
      `https://63d6bd1f94e769375bb6bc83.mockapi.io/Pizzas?page=${currentPage}&limit=4${search}${category}&sortBy=${sortBy}`,
    )
    return res.data
  },
)

export type PizzasState = {
  pizzas: PizzaBlock[]
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState = {
  pizzas: [] as PizzaBlock[],
  loading: 'idle',
} as PizzasState

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setPizzas(state, action: PayloadAction<PizzaBlock[]>) {
      state.pizzas = action.payload
    },
    clearItems(state) {
      state.pizzas = []
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.loading = 'succeeded'
      state.pizzas = action.payload
    })
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.loading = 'failed'
      console.log(action.error)
      state.pizzas = []
    })
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.loading = 'pending'
      state.pizzas = []
    })
  },
})

export const { setPizzas, clearItems } = pizzasSlice.actions
export default pizzasSlice.reducer
