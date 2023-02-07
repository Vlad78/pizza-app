import '../scss/app.scss'
import React, { useContext, useState } from 'react'
import axios from 'axios'
import PizzaBlock from '../components/PizzaBlock'
import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlockSkeleton from '../components/PizzaBlockSkeleton'
import Pagination from '../components/Pagination'
import { SearchContext } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { setPageCount } from '../redux/slices/filterSlice'

function Home() {
  const [pizzas, setPizzas] = useState([] as PizzaBlock[])
  const [isLoading, setIsLoading] = useState(true)

  const { searchValue } = useContext(SearchContext)

  const { categoryId, sort, currentPage } = useSelector((state: RootState) => state.filterSlice)

  React.useEffect(() => {
    setIsLoading(true)
    // window.scrollTo(0, 0)

    const sortBy = sort.sortProperty.replace('-', '')
    const category = categoryId > 0 ? `&category=${categoryId}` : ''
    const search = searchValue ? `&search=${searchValue}` : ''

    axios
      .get(
        `https://63d6bd1f94e769375bb6bc83.mockapi.io/Pizzas?page=${currentPage}&limit=4${search}${category}&sortBy=${sortBy}`,
      )
      .then((res) => {
        setPizzas(res.data)
        setIsLoading(false)
      })
  }, [currentPage, categoryId, searchValue, sort])

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(10)].map((e, i) => <PizzaBlockSkeleton key={i} />)
          : pizzas.map((e) => <PizzaBlock {...e} key={e.id} />)}
      </div>
      <Pagination currentPage={currentPage} />
    </div>
  )
}

export default Home
