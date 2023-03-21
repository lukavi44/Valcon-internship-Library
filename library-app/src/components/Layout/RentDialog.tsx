import { MouseEventHandler } from 'react'
import { BookDetailsRequest } from '../../models/bookData.model'
import styles from './DeleteDialog.module.css'
import check from '../../assets/icons/check.png'

interface RentDialogProps {
  book: BookDetailsRequest
  closeRentDialog: MouseEventHandler<HTMLButtonElement>
  rentBook: MouseEventHandler<HTMLButtonElement>
}

export const RentDialog = ({book, closeRentDialog, rentBook}:RentDialogProps) => {
    return (
      <div className={styles.container}>
      <img src={check} className={styles['action-icon']} style={{background: '#d9b99b'}} />
        
      <h2>
        Are you sure you want to rent <span className={styles['book-title']}>{book.Title}</span>
      </h2>
      <div className={styles['action-btns']}>
        <button className={styles['action-btn']} onClick={rentBook}>
          Rent
        </button>
        <button onClick={closeRentDialog} className={styles['action-btn']}>
          Cancel
        </button>
      </div>
    </div>
)
}

export default RentDialog