import { useAppDispatch } from '../redux/hooks'
import { setCategoryId } from '../redux/slices/filterSlice'

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

const Categories: React.FC<{ value: number }> = ({ value }) => {
  const dispatch = useAppDispatch()

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
