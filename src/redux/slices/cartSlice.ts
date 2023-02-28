import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import PizzaBlock from '../../components/PizzaBlock'
import { RootState } from '../store'
import { getItemsFromLS } from '../../utils/getItemsFromLS'
import { getTotalPrice } from '../../utils/getTotalPrice'
import { getTotalItems } from '../../utils/getTotalItems'

export interface cartState {
  totalPrice: number
  totalItems: number
  items: PizzaBlock[]
}

const { totalItems, totalPrice, items } = getItemsFromLS()

const initialState: cartState = {
  totalPrice: totalPrice,
  totalItems: totalItems,
  items: items,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<PizzaBlock>) {
      let item = state.items.find(
        (e) => e.type === action.payload.type && e.id === action.payload.id && e.size === action.payload.size,
      )

      item ? item.counter++ : state.items.push(action.payload)

      state.totalPrice = getTotalPrice(state)
      state.totalItems = getTotalItems(state)
    },
    removeItem(state, action: PayloadAction<PizzaBlock>) {
      let item = state.items.find(
        (e) => e.type === action.payload.type && e.id === action.payload.id && e.size === action.payload.size,
      )

      if (item && item.counter > 0) {
        item.counter--

        if (item.counter < 1) {
          state.items = state.items.filter(
            (e) => e.type !== action.payload.type || e.id !== action.payload.id || e.size !== action.payload.size,
          )
        }
      }

      state.totalPrice = getTotalPrice(state)
      state.totalItems = getTotalItems(state)
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
      state.totalPrice = getTotalPrice(state)
      state.totalItems = getTotalItems(state)
    },
    clearItems(state) {
      state.items = []
      state.totalPrice = 0
      state.totalItems = 0
    },
  },
})

export const selectCart = (state: RootState) => state.cartSlice

export const { addItem, removeItem, removeItemType, clearItems } = cartSlice.actions
export default cartSlice.reducer
