import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BookBodyDataGet } from '../../../models/bookData.model'
import { getOneBook, removeBookRequest } from '../../../services/BooksServices'
import styles from './BookDetails.module.css'
import placeholder from '../../../assets/placeholderImg/placeholder.jpeg'
import Modal from '../../Layout/Modal'
import EditBookForm from '../../Books/BooksList/EditBookForm'

const BookDetails = () => {
  const [bookDetails, setBookDetails] = useState<BookBodyDataGet>({
    Id: 0,
    Title: '',
    Authors: [],
    Cover: '',
    Available: 0,
    Description: '',
    Isbn: '',
    PublishDate: '',
    Quantity: 0,
  })
  const [isModalOpened, setIsModalOpened] = useState(false)
  const { id } = useParams()

  useEffect(() => {
    fetchBook()
  }, [])

  const fetchBook = () => {
    if (!id) return
    getOneBook(parseInt(id))
      .then((response) => {
        setBookDetails(response.data)
      })
      .catch((error) => console.error(error))
  }

  const deleteBookHandler = () => {
    removeBookRequest(bookDetails.Id)
      .then((response) => {
        console.log('successfully deleted', response)
      })
      .catch((error) => console.log(error))
  }

  return (
    <div className={styles.container}>
      <div className={styles['container-left']}>
        <h1>{bookDetails?.Title}</h1>
        <ul>
          {bookDetails?.Authors.map((author) => (
            <li key={author.Id}>
              {author.FirstName} {author.LastName}asdasd
            </li>
          ))}
        </ul>
        <p>{bookDetails?.Description}</p>
        <p>{bookDetails?.Isbn}</p>
        <p>{bookDetails?.PublishDate}</p>
      </div>
      <div className={styles['container-right']}>
        <img
          src={bookDetails?.Cover ? `data:image/png;base64, ${bookDetails?.Cover}` : placeholder}
          alt='Book Cover'
        />
        <div
          className={bookDetails.Quantity > 0 ? `${styles.quantity}` : `${styles['quantity-zero']}`}
        >
          <p>Available</p>
          <p>{bookDetails.Quantity}</p>
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
            <EditBookForm book={bookDetails} />
          </Modal>
        )}
        <button className={styles['action-btn']} id={styles.delete} onClick={deleteBookHandler}>
          Delete
        </button>
        <button className={styles['action-btn']} id={styles.rent}>
          Rent
        </button>
      </div>
    </div>
  )
}

export default BookDetails
