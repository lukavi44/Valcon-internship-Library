import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { BookBodyDataGet } from '../../../models/bookData.model'
import { PageData } from '../../../models/page.model'
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
  const [page, setPage] = useState<PageData>({
    pageLength: 9,
    pageNumber: 1,
    totalCount: 0,
  })
  const [hasMoreBooks, setHasMoreBooks] = useState(true)
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
    setPage((prevPage) => {
      return {
        ...prevPage,
        totalCount: null,
        pageNumber: 1,
      }
    })
    setBooks([])
  }

  useEffect(() => {
    if (currentSearch.current !== search) {
      currentSearch.current = search
      resetPaging()
    }
    fetchBooks(page.pageNumber, page.pageLength, search, filter, sort)
  }, [page.pageNumber, search])

  const handleNextPage = () => {
    setPage((page) => {
      return {
        ...page,
        pageNumber: page.pageNumber + 1,
      }
    })
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
          scrollableTarget='homepage'
        >
          <BooksList isLoggedIn={isLoggedIn} booksProps={books} />
        </InfiniteScroll>
      ) : (
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
      )}
    </div>
  )
}

export default Homepage
