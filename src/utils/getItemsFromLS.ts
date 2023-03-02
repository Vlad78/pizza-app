import { cartState } from '../redux/slices/cartSlice'

export const getItemsFromLS = () => {
  const dataString = localStorage.getItem('items')
  if (dataString) {
    const data = JSON.parse(dataString)

    return {
      totalPrice: data.totalPrice,
      totalItems: data.totalItems,
      items: data.items,
    } as cartState
  } else
    return {
      totalPrice: 0,
      totalItems: 0,
      items: [],
    }
}
