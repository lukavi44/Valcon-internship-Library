import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'
import search from '../../assets/icons/search.png'
import styles from './Header.module.css'
import sort from '../../assets/icons/sort.png'
import { NavLink } from 'react-router-dom'
import { deleteLocalStorage } from '../../helpers/manageLocalStorage'
import Where from '../../models/where.model'
import Search from '../Search/Search'
import debounce from 'lodash.debounce'

interface HeaderProps {
  setSearchTermValue: Dispatch<SetStateAction<string>>
  isLoggedIn: boolean
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>
  setFilter: Dispatch<SetStateAction<Where[]>>
  setSort: Dispatch<SetStateAction<string[]>>
}

const Header = ({ setSearchTermValue, isLoggedIn, setIsLoggedIn }: HeaderProps) => {
  const [position, setPosition] = useState(window.scrollY)
  const [isVisible, setIsVisible] = useState(true)

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

  return (
    <React.Fragment>
      <header
        className={styles['header-container']}
        style={{ visibility: isVisible ? 'visible' : 'hidden' }}
      >
        {isLoggedIn && (
          <div className={styles['header-left']}>
            <Search setSearchTermValue={setSearchTermValue} />
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
