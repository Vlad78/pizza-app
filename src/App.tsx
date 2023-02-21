import './scss/app.scss'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import NotFound from './pages/NotFound'
import Cart from './pages/Cart'
import ItemPage from './pages/ItemPage'
import MainLayout from './layouts/MainLayout'

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
        <Route path="pizza/:id" element={<ItemPage />} />
      </Route>
    </Routes>
  )
}

export default App
