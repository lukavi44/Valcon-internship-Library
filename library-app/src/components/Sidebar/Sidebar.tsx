import React, { useState } from 'react'
import styles from './Sidebar.module.css'
import home from '../../assets/icons/home.png'
import account from '../../assets/icons/account.png'
import showMore from '../../assets/icons/showMore.png'
import { useNavigate } from 'react-router-dom'
import Modal from '../Layout/Modal'
import ManageBookForm from '../Books/BooksList/ManageBookForm'

interface SidebarProps {
  accessToken: string | null
}

const Sidebar = ({ accessToken }: SidebarProps) => {
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
          <button type='button'>
            <img src={home} alt='' />
          </button>
        </div>
        {accessToken && (
          <div className={styles['btn-holder']}>
            <button type='button'>
              <img src={account} alt='' />
            </button>
          </div>
        )}
        {accessToken && (
          <div className={styles['btn-holder']} onClick={() => setAdminOptions(!adminOptions)}>
            <button type='button'>
              <img src={showMore} alt='' />
            </button>
          </div>
        )}
        {adminOptions && accessToken && (
          <nav className={styles.sidebar}>
            <div className={styles['btn-holder']}>
              <button
                className={styles['add-new-book']}
                type='button'
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
