import { BookBodyDataGet } from '../../models/bookData.model'
import styles from './DeleteDialog.module.css'
import deleteIcon from '../../assets/icons/delete.png'
import { MouseEventHandler } from 'react'

interface DeleteDialogProps {
  book: BookBodyDataGet
  closeDeleteDialog: MouseEventHandler<HTMLButtonElement>
  deleteBook: MouseEventHandler<HTMLButtonElement>
}

const DeleteDialog = ({ book, closeDeleteDialog, deleteBook }: DeleteDialogProps) => {
  return (
    <div className={styles.container}>
      <img src={deleteIcon} className={styles['delete-icon']} />
      <h2>
        Are you sure you want to delete <span className={styles['book-title']}>{book.Title}</span>
      </h2>
      <div className={styles['action-btns']}>
        <button className={styles['action-btn']} onClick={deleteBook}>
          Delete
        </button>
        <button onClick={closeDeleteDialog} className={styles['action-btn']}>
          Cancel
        </button>
      </div>
    </div>
  )
}

export default DeleteDialog