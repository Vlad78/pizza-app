import './scss/app.scss'

import Home from './pages/Home'
import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
import NotFound from './pages/NotFound'
import Cart from './pages/Cart'
import React from 'react'

export const SearchContext = React.createContext({
  searchValue: '',
  setSearchValue: {} as React.Dispatch<React.SetStateAction<string>>,
})

function App() {
  const [searchValue, setSearchValue] = React.useState('')
  return (
    <SearchContext.Provider value={{ searchValue, setSearchValue }}>
      <div className="wrapper">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </SearchContext.Provider>
  )
}

export default App
