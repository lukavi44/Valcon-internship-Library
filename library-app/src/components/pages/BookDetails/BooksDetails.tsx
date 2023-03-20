import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getOneBook, removeBookRequest } from '../../../services/BooksServices'
import styles from './BookDetails.module.css'
import placeholder from '../../../assets/placeholderImg/placeholder.jpeg'
import Modal from '../../Layout/Modal'
import EditBookForm from '../../Books/BooksList/EditBookForm'
import DeleteDialog from '../../Layout/DeleteDialog'
import { convertDateToString } from '../../../helpers/convertDate.helpers'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BookDetailsRequest } from '../../../models/bookData.model'


const BookDetails = () => {
  const [bookDetails, setBookDetails] = useState<BookDetailsRequest>({
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
  const [isEditModalOpened, setIsEditModalOpened] = useState(false)
  const [isDeleteModalOpened, setIsDeleteModalOpened] = useState(false)
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    fetchBook()
  }, [])


  const notify = (message: string) => {
     toast(message)
  };
  
  const fetchBook = () => {
    if (!id) return
    getOneBook(parseInt(id))
      .then((response) => {
        setBookDetails(response.data)
      })
      .catch((error) => console.error(error))
  }

  const onCloseDeleteDialog = () => {
    setIsDeleteModalOpened(false)
  }

  const deleteBookHandler = () => {
    removeBookRequest(bookDetails.Id)
      .then(() => {
        notify(`${bookDetails.Title} has been successfully deleted`)
        navigate('/')
      })
      .catch((error) => console.log(error))
  }

  return (
    <div className={styles.container}>
      <ToastContainer/>
      <div className={styles['container-left']}>
        <h1>{bookDetails?.Title}</h1>
        <ul>
          {bookDetails?.Authors.map((author) => (
            <li key={author.Id}>
              {author.Firstname} {author.Lastname}
            </li>
          ))}
        </ul>
        <div className={styles['about-book']}>
          <h3>About {bookDetails.Title}</h3>
          <p>{bookDetails?.Description}</p>
        </div>
        <p>{bookDetails?.Isbn}</p>
        {bookDetails.PublishDate && <p>Publish Date:</p>}
        {bookDetails.PublishDate ? <p>{convertDateToString(bookDetails.PublishDate)}</p> : ''}
      </div>
      <div className={styles['container-right']}>
        <img
          src={bookDetails?.Cover ? `data:image/png;base64, ${bookDetails?.Cover}` : placeholder}
          alt='Book Cover'
        />
        <div className={styles['book-quantity']}>
          <p>Quantity </p>
          <p className={styles['book-quantity-number']}>{bookDetails.Quantity}</p>
        </div>
        <div
          className={
            bookDetails.Available > 0 ? `${styles.available}` : `${styles['available-zero']}`
          }
        >
          <p>Available</p>
          <p>{bookDetails.Available}</p>
        </div>
      </div>
      <div className={styles['actions-btn-holder']}>
        <button
          style={{ background: '#d9b99b' }}
          className={styles['action-btn']}
          id={styles.edit}
          onClick={() => {
            setIsEditModalOpened(true)
          }}
        >
          Edit
        </button>
        {isEditModalOpened && (
          <Modal onClose={() => setIsEditModalOpened(false)}>
            <EditBookForm book={bookDetails} />
          </Modal>
        )}
        <button
          style={{ background: '#eed9c4' }}
          className={styles['action-btn']}
          id={styles.delete}
          onClick={() => setIsDeleteModalOpened(true)}
        >
          Delete
        </button>
        {isDeleteModalOpened && (
          <Modal onClose={() => setIsDeleteModalOpened(false)}>
            <DeleteDialog
              closeDeleteDialog={onCloseDeleteDialog}
              deleteBook={deleteBookHandler}
              book={bookDetails}
            />
          </Modal>
        )}
        <button style={{ background: '#fff0db' }} className={styles['action-btn']} id={styles.rent}>
          Rent
        </button>
      </div>
    </div>
  )
}

export default BookDetails
