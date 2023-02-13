import React from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { addItem } from '../redux/slices/cartSlice'

type PizzaBlock = {
  size?: number
  type?: string
  counter: number
  title: string
  price: number
  types: string[]
  sizes: number[]
  category: number
  rating: number
  imageUrl: string
  key: number
  id: number
}
const types = ['тонкое', 'традиционное']

const PizzaBlock = (props: PizzaBlock) => {
  const [type, setType] = React.useState(props.types[0])
  const [size, setSize] = React.useState(0)
  const dispatch = useAppDispatch()
  const counter = useAppSelector((store) => store.cartSlice.items.filter((e) => e.id === props.id))

  const onClickAdd = () => {
    const item = {
      ...props,
      types: types,
      type: type,
      size: size,
      counter: 1,
    }
    dispatch(addItem(item))
  }

  return (
    // <div className="pizza-block-wrapper">
    <div className="pizza-block">
      <a href={`/pizza/${props.id}`}>
        <img className="pizza-block__image" src={props.imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{props.title}</h4>
      </a>
      <div className="pizza-block__selector">
        <ul>
          {props.types.map((e) => {
            return (
              <li key={e} className={e === type ? 'active' : ''} onClick={() => setType(e)}>
                {types[Number(e)]}
              </li>
            )
          })}
        </ul>
        <ul>
          {props.sizes.map((e, i) => (
            <li key={e} className={i === size ? 'active' : ''} onClick={() => setSize(i)}>
              {`${e} см.`}
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">{props.price}</div>
        <button className="button button--outline button--add" onClick={onClickAdd}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            ></path>
          </svg>
          <span>Добавить </span>
          <i>{counter && counter.reduce((acc, CV) => acc + CV.counter, 0)}</i>
        </button>
      </div>
    </div>
    // </div>
  )
}

export default PizzaBlock
