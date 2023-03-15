import React, { useState } from 'react'
import styles from './Sidebar.module.css'
import home from '../../assets/icons/home.png'
import account from '../../assets/icons/account.png' // loader comp za slike
import showMore from '../../assets/icons/showMore.png'
import { useNavigate } from 'react-router-dom'
import Modal from '../Layout/Modal'
import ManageBookForm from '../Books/BooksList/ManageBookForm'

interface SidebarProps {
  isLoggedIn: boolean
}

const Sidebar = ({ isLoggedIn }: SidebarProps) => {
  const [isModalOpened, setIsModalOpened] = useState(false)
  const [adminOptions, setAdminOptions] = useState(false)

  const navigateTo = useNavigate()

  const handleHomeNavigation = () => {
    navigateTo('/')
  }

  return (
    <React.Fragment>
      <nav className={styles.header}>
        <div className={styles['btn-holder']} onClick={handleHomeNavigation}>
          <button>
            <img src={home} alt='' />
          </button>
        </div>
        {isLoggedIn && (
          <div className={styles['btn-holder']}>
            <button>
              <img src={account} alt='' />
            </button>
          </div>
        )}
        {isLoggedIn && (
          <div className={styles['btn-holder']} onClick={() => setAdminOptions(!adminOptions)}>
            <button>
              <img src={showMore} alt='' />
            </button>
          </div>
        )}
        {adminOptions && isLoggedIn && (
          <nav className={styles.sidebar}>
            <div className={styles['btn-holder']}>
              <button
                className={styles['add-new-book']}
                type='submit'
                onClick={() => setIsModalOpened(true)}
              >
                Add New Book +
              </button>
            </div>
          </nav>
        )}
        {isModalOpened && (
          <Modal onClose={() => setIsModalOpened(false)}>
            <ManageBookForm />
          </Modal>
        )}
      </nav>
    </React.Fragment>
  )
}

export default Sidebar
