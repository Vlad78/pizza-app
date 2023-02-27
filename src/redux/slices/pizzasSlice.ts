import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import PizzaBlock from '../../components/PizzaBlock'
import axios from 'axios'

export enum Status {
  IDLE = 'idle',
  PENDING = 'pending',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed',
}

export interface PizzasState {
  pizzas: PizzaBlock[]
  loading: Status
}

const initialState: PizzasState = {
  pizzas: [],
  loading: Status.IDLE,
}
export const fetchPizzas = createAsyncThunk<PizzaBlock[], Record<string, string>>(
  'pizzas/fetchPizzas',
  async (params) => {
    const { currentPage, sortBy, category, search } = params
    const res = await axios.get<PizzaBlock[]>(
      `https://63d6bd1f94e769375bb6bc83.mockapi.io/Pizzas?page=${currentPage}&limit=4${search}${category}&sortBy=${sortBy}`,
    )
    return res.data
  },
)

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
      state.loading = Status.SUCCEEDED
      state.pizzas = action.payload
    })
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.loading = Status.FAILED
      console.log(action.error)
      state.pizzas = []
    })
    builder.addCase(fetchPizzas.pending, (state) => {
      state.loading = Status.PENDING
      state.pizzas = []
    })
  },
})

export const { setPizzas, clearItems } = pizzasSlice.actions
export default pizzasSlice.reducer
