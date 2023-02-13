import { useAppDispatch } from '../redux/hooks'
import { setCategoryId } from '../redux/slices/filterSlice'

const Categories = ({ value }: { value: number }) => {
  const dispatch = useAppDispatch()
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

  return (
    <div className="categories">
      <ul>
        {categories.map((e, i) => {
          return (
            <li key={i} className={value === i ? 'active' : ''} onClick={() => dispatch(setCategoryId(i))}>
              {e}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Categories
