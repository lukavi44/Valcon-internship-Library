import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { BookBodyDataGet } from '../../models/bookData.model'
import Where from '../../models/where.model'
import PrivateRoutes from '../../router/PrivateRoutes'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import BookDetails from '../pages/BookDetails/BooksDetails'
import Homepage from '../pages/Homepage/Homepage'
import Login from '../pages/Login/Login'
import Sidebar from '../Sidebar/Sidebar'
import styles from './MainLayout.module.css'

const MainLayout = () => {
  const [books, setBooks] = useState<BookBodyDataGet[]>([])
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'))
  const [searchTermValue, setSearchTermValue] = useState('')
  const [filter, setFilter] = useState<Where[]>([])
  const [sort, setSort] = useState<string[]>([])

  useEffect(() => {
    if (accessToken !== '') {
      setIsLoggedIn(true)
    }
  }, [])

  return (
    <div className={styles.wrapp}>
      <Sidebar isLoggedIn={isLoggedIn} />
      <div className={styles['inside-wrapp']}>
        <Header
          setSearchTermValue={setSearchTermValue}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          setFilter={setFilter}
          setSort={setSort}
        />

        <Routes>
          <Route element={<PrivateRoutes accessToken={accessToken} />}>
            <Route path='details' element={<BookDetails />} />
          </Route>
          <Route
            path='/'
            element={
              <Homepage
                books={books}
                setBooks={setBooks}
                search={searchTermValue}
                filter={filter}
                sort={sort}
                isLoggedIn={isLoggedIn}
              />
            }
          />
          <Route
            path='login'
            element={<Login setIsLoggedIn={setIsLoggedIn} setAccessToken={setAccessToken} />}
          />
        </Routes>
      </div>
      <Footer isLoggedIn={isLoggedIn} />
    </div>
  )
}

export default MainLayout
