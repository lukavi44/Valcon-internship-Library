import BooksItem from '../BooksItem/BooksItem'
import styles from './BooksList.module.css'

import { BookBodyDataGet } from '../../../models/bookData.model'

interface BookListProps {
  booksProps: BookBodyDataGet[]
}

const BooksList = ({ booksProps }: BookListProps) => {
  return (
    <div className={styles.wrapp}>
      <div className={styles['books-wrap']}>
        {booksProps.length === 0 ? (
          <p>No available books</p>
        ) : (
          booksProps && booksProps.map((book) => <BooksItem key={book.Id} Book={book} />)
        )}
      </div>
    </div>
  )
}

export default BooksList
