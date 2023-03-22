import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getOneBook, removeBookRequest } from '../../../services/BooksServices'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import Modal from '../../Layout/Modal'
import EditBookForm from '../../Books/BooksList/EditBookForm'
import DeleteDialog from '../../Layout/DeleteDialog'
import { BookDetailsRequest } from '../../../models/bookData.model'
import { convertDateToString } from '../../../helpers/convertDate.helpers'
import styles from './BookDetails.module.css'
import placeholder from '../../../assets/placeholderImg/placeholder.jpeg'
import RentDialog from '../../Layout/RentDialog';
import { getBookHistory, postRentBook, postReturnBook } from '../../../services/RentalServices.services';
import RentHistoryDialog from '../../Layout/RentHistoryDialog';
import { RentBookHistory } from '../../../models/rent.model';
import { currentUserAdmin } from '../../../helpers/roles';

const BookDetails = () => {
  const [bookDetails, setBookDetails] = useState<BookDetailsRequest>({
    Id: 0,
    Title: '',
    Authors: [],
    Cover: '',
    Available: 0,
    Description: '',
    ISBN: '',
    PublishDate: '',
    Quantity: 0,
  })
  const [isEditModalOpened, setIsEditModalOpened] = useState(false)
  const [isDeleteModalOpened, setIsDeleteModalOpened] = useState(false)
  const [isRentModalOpened, setIsRentModalOpened] = useState(false)
  const [isRentHistoryModalOpened, setIsRentHistoryModalOpened] = useState(false)
  const [rentalHistoryData, setRentalHistoryData] = useState<RentBookHistory[]>([])
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {    
    fetchBook()
  }, [])
  
  const fetchBook = () => {
    if (!id) return
    getOneBook(parseInt(id))
      .then((response) => {
        setBookDetails(response.data)
        getBookRentHistory(response.data.Id)
      })
      .catch((error) => toast.error(error))
  }

  const onCloseDeleteDialog = () => {
    setIsDeleteModalOpened(false)
  }

  const onCloseRentDialog = () => {
    setIsRentModalOpened(false)
  }

  const deleteBookHandler = () => {
    removeBookRequest(bookDetails.Id)
      .then(() => {
        toast(`${bookDetails.Title} has been successfully deleted`)
        navigate('/')
      })
      .catch((error) => toast.error( `${error} / Something went wrong. Book has NOT been deleted`))
  }

  const rentBookHandler = () => {
    postRentBook(bookDetails.Id).then(() => {
      toast.success(`${bookDetails.Title} has been successfully rented`)
      fetchBook()
      setIsRentModalOpened(false)
    })
    .catch(() => toast.error( 'No more available books for renting. Book has NOT been rented'))
  }

  const getBookRentHistory = (bookId: number) => {
    getBookHistory(bookId).then((response) => {
      setRentalHistoryData(response.data)
    })
  }

  const returnBookHandler = (rentId: number) => {
    if (bookDetails.Quantity === bookDetails.Available) {
      toast.error(`All copies of ${bookDetails.Title} have been returned`)
      return
    }
    postReturnBook(rentId).then(() => {
      toast.success(`${bookDetails.Title} has been returned`)
      getBookRentHistory(bookDetails.Id)
    }).catch(() => {
      toast.error(`This copy of ${bookDetails.Title} has already been returned`)
    })
  }

  const sortIsReturned = () => {
      const stateCopy = [...rentalHistoryData]
      stateCopy.sort((x, y) => {
        return (x.IsReturned === y.IsReturned) ? 0 : x ? -1 : 1  
      })
    setRentalHistoryData(stateCopy)
  } 

  return (
    <div className={styles.container}>
      <div className={styles['container-left']}>
        <h1>{bookDetails?.Title}</h1>
        <ul>
          {bookDetails.Authors.map((author) => (
            <li key={author.Id}>
              {author.Firstname} {author.Lastname}
            </li>
          ))}
        </ul>
        <div className={styles['about-book']}>
          <h3>About {bookDetails.Title}</h3>
          <p>{bookDetails?.Description}</p>
        </div>
        <p>ISBN: {bookDetails.ISBN}</p>
        <div className={styles.date}>
        {bookDetails.PublishDate && <p>Publish Date:</p>}
        {bookDetails.PublishDate ? <p>{convertDateToString(bookDetails.PublishDate, 'dd.MM.yyyy')}</p> : ''}
        </div>
      </div>
      <div className={styles['container-right']}>
        <img className={styles['book-img']}
          src={bookDetails?.Cover ? `data:image/png;base64, ${bookDetails?.Cover}` : placeholder}
          alt='Book Cover'
        />
        {currentUserAdmin() &&
          <div className={styles['book-quantity']}>
            <p>Quantity </p>
            <p className={styles['book-quantity-number']}>{bookDetails.Quantity}</p>
          </div>}
        <div
          className={
            bookDetails.Available > 0 ? `${styles.available}` : `${styles['available-zero']}`
          }
        >
          <p>Available</p>
          {currentUserAdmin() && <p>{bookDetails.Available}</p>}
        </div>
      </div>
      <div className={styles['actions-btn-holder']}>
        {
          currentUserAdmin() &&
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
        }
        {isEditModalOpened && (
          <Modal onClose={() => setIsEditModalOpened(false)}>
            <EditBookForm fetchUpdatedBook={fetchBook} setIsEditModalOpened={setIsEditModalOpened} setBookDetails={setBookDetails} book={bookDetails} />
          </Modal>
        )}
        {currentUserAdmin() &&
          <button
            style={{ background: '#eed9c4' }}
            className={styles['action-btn']}
            id={styles.delete}
            onClick={() => setIsDeleteModalOpened(true)}
          >
            Delete
          </button>
        }
        {isDeleteModalOpened && (
          <Modal onClose={() => setIsDeleteModalOpened(false)}>
            <DeleteDialog
              closeDeleteDialog={onCloseDeleteDialog}
              deleteBook={deleteBookHandler}
              book={bookDetails}
            />
          </Modal>
        )}
        
        <button
          style={{ background: '#fff0db' }}
          className={styles['action-btn']}
          id={styles.rent}
          onClick={() => setIsRentModalOpened(true)}>
          Rent
        </button>
          {isRentModalOpened && (
            <Modal onClose={() => setIsRentModalOpened(false)}>
            <RentDialog
              closeRentDialog={onCloseRentDialog}
              rentBook={rentBookHandler}
              book={bookDetails}
            />
          </Modal>
        )}
        {currentUserAdmin() &&
          <button onClick={() => setIsRentHistoryModalOpened(true)} className={styles['action-btn']} style={{ background: '#eed9c4' }} >View History of Rentals</button>}
        {isRentHistoryModalOpened && (
            <Modal onClose={() => setIsRentHistoryModalOpened(false)}>
            <RentHistoryDialog
              book={bookDetails}
              rentalHistoryData={rentalHistoryData}
              returnBook={returnBookHandler}
              sortIsReturned = { sortIsReturned}
            />
          </Modal>
        )}
      </div>
    </div>
  )
}

export default BookDetails
