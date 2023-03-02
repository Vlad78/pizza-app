import './scss/app.scss'
import { Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import NotFound from './pages/NotFound'
import ItemPage from './pages/ItemPage'
import MainLayout from './layouts/MainLayout'
import React from 'react'

const Cart = React.lazy(() => import(/* webpackChunkName: 'Cart' */ './pages/Cart'))

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route
          path="cart"
          element={
            <React.Suspense fallback={<div>Загрузка...</div>}>
              <Cart />
            </React.Suspense>
          }
        />
        <Route path="*" element={<NotFound />} />
        <Route path="pizza/:id" element={<ItemPage />} />
      </Route>
    </Routes>
  )
}

export default App
