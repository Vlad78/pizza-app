import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import PizzaBlock from '../../components/PizzaBlock'

const initialState = {
  pizzas: [] as PizzaBlock[],
}
export type PizzasState = typeof initialState

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
})

export const { setPizzas, clearItems } = pizzasSlice.actions
export default pizzasSlice.reducer
