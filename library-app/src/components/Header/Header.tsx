import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import search from '../../assets/icons/search.png'
import styles from './Header.module.css'
import sort from '../../assets/icons/sort.png'
import { NavLink } from 'react-router-dom'
import { deleteLocalStorage } from '../../helpers/manageLocalStorage'
import Where from '../../models/where.model'

interface HeaderProps {
  searchTermValue: string
  setSearchTermValue: Dispatch<SetStateAction<string>>
  isLoggedIn: boolean
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>
  setFilter: Dispatch<SetStateAction<Where[]>>
  setSort: Dispatch<SetStateAction<string[]>>
}

const Header = ({
  searchTermValue,
  setSearchTermValue,
  isLoggedIn,
  setIsLoggedIn,
  setFilter,
  setSort,
}: HeaderProps) => {
  const [position, setPosition] = useState(window.scrollY)
  const [isVisible, setIsVisible] = useState(true)
  const currentPathName = window.location.pathname

  const handleLogout = () => {
    deleteLocalStorage()
    setIsLoggedIn(false)
  }

  useEffect(() => {
    const handleScroll = () => {
      const moving = window.scrollY
      setIsVisible(position > moving)
      setPosition(moving)
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [position, isVisible])

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchTermValue(event.target.value)
  }

  return (
    <React.Fragment>
      <header
        className={styles['header-container']}
        style={{ visibility: isVisible ? 'visible' : 'hidden' }}
      >
        {isLoggedIn && (
          <div className={styles['header-left']}>
            <button className={styles['search-btn']}>
              <img src={search} alt='' className={styles['search-img']} />
            </button>
            <input
              type='search'
              name='search'
              id='search'
              className={styles.input}
              value={searchTermValue}
              onChange={handleInputChange}
            />
            <button className={styles.sort}>
              <img src={sort} alt='' />
            </button>
          </div>
        )}
        <NavLink to='login'>
          {isLoggedIn && (
            <button className={styles['login-btn']} type='button' onClick={handleLogout}>
              LOGOUT
            </button>
          )}
          {!isLoggedIn && (
            <button className={styles['login-btn']} type='button'>
              LOGIN
            </button>
          )}
        </NavLink>
      </header>
    </React.Fragment>
  )
}

export default Header
