import styles from './Footer.module.css'
import home from '../../assets/icons/home.png'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from '../Layout/Modal'
import ManageBookForm from '../Books/BooksList/ManageBookForm'
import { currentUserAdmin, currentUserLibrarian } from '../../helpers/roles'

export const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const navigateTo = useNavigate()

  const handleHomeNavigation = () => {
    navigateTo('/')
  }

  return (
    <footer className={styles.footer}>
      <div className={styles['btn-holder']} onClick={handleHomeNavigation}>
        <button>
          <img src={home} alt='' />
        </button>
      </div>
      {(currentUserAdmin() || currentUserLibrarian()) &&
        <div className={styles['btn-holder']}>
            <button className={styles['add-new-book']} onClick={() => setIsModalOpen(true)}>
              Add New Book
            </button>
          </div>
      }
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <ManageBookForm />
        </Modal>
      )}
    </footer>
  )
}

export default Footer
