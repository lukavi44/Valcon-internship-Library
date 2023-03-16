import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { BookBodyDataGet } from '../../../models/bookData.model'
import Where from '../../../models/where.model'
import { getBooksRequest } from '../../../services/BooksServices'
import BooksList from '../../Books/BooksList/BooksList'
import styles from './Homepage.module.css'

interface HomepageProps {
  search: string
  filter: Where[]
  sort: string[]
  books: BookBodyDataGet[]
  setBooks: Dispatch<SetStateAction<BookBodyDataGet[]>>
  isLoggedIn: boolean
}

const Homepage = ({ books, setBooks, search, filter, sort, isLoggedIn }: HomepageProps) => {
  const [pageNumber, setPageNumber] = useState(1)
  const [hasMoreBooks, setHasMoreBooks] = useState(true)
  const pageLength = 9
  const currentSearch = useRef<string>(search)

  const fetchBooks = (
    pageNumber: number,
    pageLength: number,
    search: string,
    filter: Where[],
    sort: string[],
  ) => {
    getBooksRequest({ pageNumber, pageLength, search, filter, sort })
      .then((response) => {
        const totalCount = response.data.TotalCount
        const currentCount = pageNumber * pageLength
        setHasMoreBooks(totalCount - currentCount > 0)
        setBooks((prevBooks) => [...prevBooks, ...response.data.Items])
      })
      .catch(() => {
        setBooks([])
      })
  }

  const resetPaging = () => {
    setBooks([])
    setPageNumber(1)
  }
  useEffect(() => {
    if (currentSearch.current !== search) {
      currentSearch.current = search
      resetPaging()
    }
    fetchBooks(pageNumber, pageLength, search, filter, sort)
  }, [pageNumber, search])

  const handleNextPage = () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1)
  }

  return (
    <div id='homepage' className={styles.homepage}>
      {books.length > 0 ? (
        <InfiniteScroll
          dataLength={books.length}
          next={handleNextPage}
          hasMore={hasMoreBooks}
          loader={
            <div className={styles['lds-spinner']}>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          }
          endMessage={<h4 style={{ textAlign: 'center' }}>You have browsed all books</h4>}
          scrollableTarget='homepage'
        >
          <BooksList isLoggedIn={isLoggedIn} booksProps={books} />
        </InfiniteScroll>
      ) : (
        <h3 style={{ textAlign: 'center' }}>No books currently available</h3>
      )}
    </div>
  )
}

export default Homepage
