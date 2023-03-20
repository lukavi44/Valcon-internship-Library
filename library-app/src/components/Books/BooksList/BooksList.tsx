import BooksItem from '../BooksItem/BooksItem'
import styles from './BooksList.module.css'
import { BookResponse } from '../../../models/bookData.model'

interface BookListProps {
  booksProps: BookResponse[]
  accessToken: string | null
}

const BooksList = ({ booksProps, accessToken }: BookListProps) => {
  return (
    <div className={styles.wrapp}>
      <div className={styles['books-wrap']}>
        {booksProps.length === 0 ? (
          <p>No available books</p>
        ) : (
          booksProps &&
          booksProps.map((book) => <BooksItem accessToken={accessToken} key={book.Id} Book={book} />)
        )}
      </div>
    </div>
  )
}

export default BooksList
