import { cartState } from '../redux/slices/cartSlice'

export const getTotalPrice = (state: cartState) => {
  return state.items.reduce((acc, CV) => acc + CV.price * CV.counter, 0)
}
