import '../scss/app.scss'
import React, { useContext, useRef, useState } from 'react'
import qs from 'qs'
import axios from 'axios'
import PizzaBlock from '../components/PizzaBlock'
import Categories from '../components/Categories'
import Sort, { list } from '../components/Sort'
import PizzaBlockSkeleton from '../components/PizzaBlockSkeleton'
import Pagination from '../components/Pagination'
import { SearchContext } from '../App'
import { RootState } from '../redux/store'
import { useNavigate } from 'react-router-dom'
import { setParams } from '../redux/slices/filterSlice'
import { useAppDispatch, useAppSelector } from '../redux/hooks'

function Home() {
  const [pizzas, setPizzas] = useState([] as PizzaBlock[])
  const [isLoading, setIsLoading] = useState(true)
  const isSearch = useRef(false)
  const isMounted = useRef(false)

  const { searchValue } = useContext(SearchContext)
  const { categoryId, sort, currentPage } = useAppSelector((state: RootState) => state.filterSlice)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const fetchPizzas = () => {
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
  }

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))
      const sort = list.find((e) => (e.sortProperty === params.sortProperty ? e.name : ''))
      dispatch(
        setParams({
          ...params,
          sort,
        }),
      )
      isSearch.current = true
    }
  }, [])

  React.useEffect(() => {
    if (!isSearch.current) fetchPizzas()

    isSearch.current = false
  }, [currentPage, categoryId, searchValue, sort])

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      })

      navigate(`?${queryString}`)
    }
    isMounted.current = true
  }, [currentPage, categoryId, sort])

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
