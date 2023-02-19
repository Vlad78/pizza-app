import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import PizzaBlock from '../../components/PizzaBlock'
import { RootState } from '../store'

const initialState = {
  totalPrice: 0,
  totalItems: 0,
  items: [] as PizzaBlock[],
}
export type CartState = typeof initialState

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<PizzaBlock>) {
      let item = state.items.find(
        (e) => e.type === action.payload.type && e.id === action.payload.id && e.size === action.payload.size,
      )

      item ? item.counter++ : state.items.push(action.payload)

      state.totalPrice = state.items.reduce((acc, CV) => acc + CV.price * CV.counter, 0)
      state.totalItems = state.items.reduce((acc, CV) => acc + CV.counter, 0)
    },
    removeItem(state, action: PayloadAction<PizzaBlock>) {
      let item = state.items.find(
        (e) => e.type === action.payload.type && e.id === action.payload.id && e.size === action.payload.size,
      )

      if (item) {
        item.counter--
        if (item.counter < 1)
          state.items = state.items.filter((e) => {
            return e.type !== action.payload.type || e.id !== action.payload.id || e.size !== action.payload.size
          })
      }
      state.totalPrice = state.items.reduce((acc, CV) => acc + CV.price * CV.counter, 0)
      state.totalItems = state.items.reduce((acc, CV) => acc + CV.counter, 0)
    },
    removeItemType(state, action: PayloadAction<PizzaBlock>) {
      let item = state.items.find(
        (e) => e.type === action.payload.type && e.id === action.payload.id && e.size === action.payload.size,
      )
      if (item) {
        state.items = state.items.filter(
          (e) => e.type !== action.payload.type || e.id !== action.payload.id || e.size !== action.payload.size,
        )
      }
      state.totalPrice = state.items.reduce((acc, CV) => acc + CV.price * CV.counter, 0)
      state.totalItems = state.items.reduce((acc, CV) => acc + CV.counter, 0)
    },
    clearItems(state) {
      state.items = []
      state.totalPrice = state.items.reduce((acc, CV) => acc + CV.price * CV.counter, 0)
      state.totalItems = state.items.reduce((acc, CV) => acc + CV.counter, 0)
    },
  },
})

export const selectCart = (state: RootState) => state.cartSlice

export const { addItem, removeItem, removeItemType, clearItems } = cartSlice.actions
export default cartSlice.reducer
