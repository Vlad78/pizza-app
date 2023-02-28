import { cartState } from '../redux/slices/cartSlice'

export const getTotalItems = (state: cartState) => {
  return state.items.reduce((acc, CV) => acc + CV.counter, 0)
}
