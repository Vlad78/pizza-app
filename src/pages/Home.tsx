import '../scss/app.scss'
import React, { useContext, useRef, useState } from 'react'
import qs from 'qs'
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
import { fetchPizzas } from '../redux/slices/pizzasSlice'

function Home() {
  const isSearch = useRef(false)
  const isMounted = useRef(false)

  const { searchValue } = useContext(SearchContext)
  const { categoryId, sort, currentPage } = useAppSelector((state: RootState) => state.filterSlice)
  const { pizzas, loading } = useAppSelector((state: RootState) => state.pizzasSlice)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const getPizzas = async () => {
    // window.scrollTo(0, 0)

    const sortBy = sort.sortProperty.replace('-', '')
    const category = categoryId > 0 ? `&category=${categoryId}` : ''
    const search = searchValue ? `&search=${searchValue}` : ''

    dispatch(fetchPizzas({ currentPage, sortBy, category, search }))
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
    // if (!isSearch.current)
    getPizzas()

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
        {loading === 'pending'
          ? [...new Array(8)].map((e, i) => <PizzaBlockSkeleton key={i} />)
          : pizzas.map((e) => <PizzaBlock {...e} key={e.id} />)}
        {loading === 'failed' ? <h3>Произошла ошибка</h3> : ''}
      </div>
      <Pagination currentPage={currentPage} />
    </div>
  )
}

export default Home
