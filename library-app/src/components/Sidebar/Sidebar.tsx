import React, { useState } from 'react'
import styles from './Sidebar.module.css'
import home from '../../assets/icons/home.png'
import { useNavigate } from 'react-router-dom'
import Modal from '../Layout/Modal'
import ManageBookForm from '../Books/BooksList/ManageBookForm'

import { currentUserAdmin, currentUserLibrarian} from '../../helpers/roles'

const Sidebar = () => {
  const [isModalOpened, setIsModalOpened] = useState(false)

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
        { (currentUserAdmin() || currentUserLibrarian()) &&
            <div className={styles['btn-holder']}>
              <button
                className={styles['add-new-book']}
                type='button'
                onClick={() => setIsModalOpened(true)}
              >
                Add New Book +
              </button>
            </div>
        }
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
