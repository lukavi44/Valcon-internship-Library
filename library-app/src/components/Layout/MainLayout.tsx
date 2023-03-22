import {  useState } from 'react'
import { Route, Routes } from 'react-router-dom'
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
  const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem('accessToken'))
  const [searchTermValue, setSearchTermValue] = useState('')
  const [filter, setFilter] = useState<Where[]>([])
  const [sort, setSort] = useState<string[]>([])

  return (
    <div className={styles.wrapp}>
      <Sidebar/>
      <div className={styles['inside-wrapp']}>
        <Header
          setSearchTermValue={setSearchTermValue}
          setAccessToken={setAccessToken}
          accessToken={accessToken}
          setFilter={setFilter}
          setSort={setSort}
        />

        <Routes>
          <Route element={<PrivateRoutes accessToken={accessToken} />}>
            <Route path='BookDetails/:id' element={<BookDetails />} />
          </Route>
          <Route
            path='/'
            element={
              <Homepage
                search={searchTermValue}
                filter={filter}
                sort={sort}
                accessToken={accessToken}
              />
            }
          />
          <Route
            path='login'
            element={<Login  setAccessToken={setAccessToken} />}
          />
        </Routes>
      </div>
      <Footer/>
    </div>
  )
}

export default MainLayout
