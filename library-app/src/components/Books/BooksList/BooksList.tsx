import BooksItem from '../BooksItem/BooksItem'
import styles from './BooksList.module.css'
import { BookBodyDataGet } from '../../../models/bookData.model'

interface BookListProps {
  booksProps: BookBodyDataGet[]
  isLoggedIn: boolean
}

const BooksList = ({ booksProps, isLoggedIn }: BookListProps) => {
  return (
    <div className={styles.wrapp}>
      <div className={styles['books-wrap']}>
        {booksProps.length === 0 ? (
          <p>No available books</p>
        ) : (
          booksProps &&
          booksProps.map((book) => <BooksItem isLoggedIn={isLoggedIn} key={book.Id} Book={book} />)
        )}
      </div>
    </div>
  )
}

export default BooksList
