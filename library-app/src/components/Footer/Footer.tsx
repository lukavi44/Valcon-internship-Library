import styles from './Footer.module.css'
import home from '../../assets/icons/home.png'
import account from '../../assets/icons/account.png'
import showMore from '../../assets/icons/showMore.png'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from '../Layout/Modal'
import ManageBookForm from '../Books/BooksList/ManageBookForm'

interface FooterProps {
  isLoggedIn: boolean
}

export const Footer = ({ isLoggedIn }: FooterProps) => {
  const [adminOptions, setAdminOptions] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const navigateTo = useNavigate()

  const closeAdminOptions = () => {
    setAdminOptions(false)
  }

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

      {isLoggedIn && (
        <div className={styles['btn-holder']}>
          <button>
            <img src={account} alt='' />
          </button>
        </div>
      )}

      <div className={styles['btn-holder']}>
        <button onClick={() => setAdminOptions(!adminOptions)}>
          <img src={showMore} alt='' />
        </button>
      </div>

      {adminOptions && (
        <nav className={styles.sidebar}>
          <div className={styles['btn-holder']}>
            <button className={styles['back-btn']} onClick={closeAdminOptions}>
              Back
            </button>
          </div>
          <div className={styles['btn-holder']}>
            <button>
              <img src={account} alt='' />
            </button>
          </div>
          <div className={styles['btn-holder']}>
            <button className={styles['add-new-book']} onClick={() => setIsOpen(true)}>
              Add New Book +
            </button>
          </div>
        </nav>
      )}
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <ManageBookForm />
        </Modal>
      )}
    </footer>
  )
}

export default Footer
