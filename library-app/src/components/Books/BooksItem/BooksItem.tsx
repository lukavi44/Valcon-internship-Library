import { BookBodyDataGet } from '../../../models/bookData.model'
import Card from '../../UI/Card'
import styles from './BooksItem.module.css'
import { useEffect, useState } from 'react'
import imgPlaceholder from '../../../assets/placeholderImg/placeholder.jpeg'
import Modal from '../../Layout/Modal'
import ManageBookForm from '../BooksList/ManageBookForm'
import { removeBookRequest } from '../../../services/BooksServices'
import EditBookForm from '../BooksList/EditBookForm'

export interface BookProps {
  Book: BookBodyDataGet
}

const BooksItem = ({ Book }: BookProps) => {
  const [isModalOpened, setIsModalOpened] = useState(false)

  const [coverPlaceholder, setCoverPlaceholder] = useState('')

  useEffect(() => {
    setCoverPlaceholder(imgPlaceholder)
  }, [])

  return (
    <Card>
      <div className={styles['book-holder']}>
        <div className={styles['img-holder']}>
          <img
            src={Book.Cover ? `data:image/png;base64, ${Book.Cover}` : coverPlaceholder}
            alt=''
            className={styles['book-img']}
          />
        </div>
        <div className={styles['about-book']}>
          <h2>{Book.Title}</h2>
          <div className={styles['published-date']}>
            <p>Published:</p>
            <p>{Book.PublishDate}</p>
          </div>
          <p>
            {Book.Description?.substring(0, 50)}
            {Book.Description?.length > 50 ? '...' : ''}
          </p>
          <label>Author(s):</label>
          {Book.Authors &&
            Book.Authors.map((Author) => (
              <p key={Author.Id}>
                {Author.FirstName} {Author.LastName}
              </p>
            ))}
        </div>
      </div>
      <div className={styles['actions-btn-holder']}>
        <button
          className={styles['action-btn']}
          id={styles.edit}
          onClick={() => setIsModalOpened(true)}
        >
          Edit
        </button>
        {isModalOpened && (
          <Modal onClose={() => setIsModalOpened(false)}>
            <EditBookForm book={Book} />
          </Modal>
        )}
        <button
          className={styles['action-btn']}
          id={styles.delete}
          onClick={() => removeBookRequest(Book.Id)}
        >
          Delete
        </button>
        <button className={styles['action-btn']} id={styles.rent}>
          Rent
        </button>
      </div>
    </Card>
  )
}

export default BooksItem
