import {  useEffect, useRef, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { PageData } from '../../../models/page.model'
import {  BookResponse } from '../../../models/bookData.model'
import Where from '../../../models/where.model'
import { getBooksRequest } from '../../../services/BooksServices'
import BooksList from '../../Books/BooksList/BooksList'
import styles from './Homepage.module.css'
import BookCarousel from '../../UI/BookCarousel'
interface HomepageProps {
  search: string
  filter: Where[]
  sort: string[]
  accessToken: string | null
}

const Homepage = ({ search, filter, sort, accessToken }: HomepageProps) => {
  const [books, setBooks] = useState<BookResponse[]>([])
  const [page, setPage] = useState<PageData>({
    pageLength: 9,
    pageNumber: 1,
    totalCount: 0,
  })
  const [hasMoreBooks, setHasMoreBooks] = useState(true)
  const currentSearch = useRef<string>(search)

  useEffect(() => {
    if (currentSearch.current !== search) {
      currentSearch.current = search
      resetPaging()
    }
    fetchBooks(page.pageNumber, page.pageLength, search, filter, sort)
  }, [page.pageNumber, page.pageLength, search])

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
        totalCount: 0,
        pageNumber: 1,
      }
    })
    setBooks([])
  }

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
      {accessToken &&
        <div className={styles.top}>
         <BookCarousel />
        </div>}
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
          <BooksList accessToken={accessToken} booksProps={books} />
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
