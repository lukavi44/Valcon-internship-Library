import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { BookBodyDataGet } from '../../../models/bookData.model'
import Where from '../../../models/where.model'
import { getBooksRequest } from '../../../services/BooksServices'
import BooksList from '../../Books/BooksList/BooksList'

interface HomepageProps {
  search: string
  filter: Where[]
  sort: string[]
  books: BookBodyDataGet[]
  setBooks: Dispatch<SetStateAction<BookBodyDataGet[]>>
}

const Homepage = ({ books, setBooks, search, filter, sort }: HomepageProps) => {
  const [pageNumber, setPageNumber] = useState(1)
  // const [books, setBooks] = useState<BookBodyDataGet[]>([])
  const [hasMoreBooks, setHasMoreBooks] = useState(true)
  const pageLength = 12
  const currentSearch = useRef<string>(search)
  const currentFilter = useRef<Where[]>(filter)
  const currentSort = useRef<string[]>(sort)

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
    console.log(hasMoreBooks, 'homepage log')
    if (currentSearch.current !== search) {
      currentSearch.current = search
      resetPaging()
    } else if (currentFilter.current !== filter) {
      resetPaging()
      currentFilter.current = filter
    } else if (currentSort.current !== sort) {
      resetPaging()
      currentSort.current = sort
    }
    fetchBooks(pageNumber, pageLength, search, filter, sort)
  }, [pageNumber, filter, sort])

  const handleNextPage = () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1)
  }

  return (
    <div id='homepage' style={{ height: '100%', overflowY: 'scroll' }}>
      {books.length > 0 ? (
        <InfiniteScroll
          dataLength={books.length}
          next={handleNextPage}
          hasMore={hasMoreBooks}
          loader={<h4 style={{ textAlign: 'center' }}>Loading...</h4>}
          endMessage={<h4 style={{ textAlign: 'center' }}>You have browsed all books</h4>}
          scrollableTarget='homepage'
        >
          <BooksList booksProps={books} />
        </InfiniteScroll>
      ) : (
        <h3 style={{ textAlign: 'center' }}>No books currently available</h3>
      )}
    </div>
  )
}

export default Homepage
