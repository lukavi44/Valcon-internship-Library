import { BookResponse } from '../../../models/bookData.model'
import Card from '../../UI/Card'
import styles from './BooksItem.module.css'
import imgPlaceholder from '../../../assets/placeholderImg/placeholder.jpeg'
import { useNavigate } from 'react-router-dom'
import { convertDateToString } from '../../../helpers/convertDate.helpers'

export interface BookProps {
  Book: BookResponse
  isLoggedIn: boolean
}

const BooksItem = ({ Book, isLoggedIn }: BookProps) => {
  const navigate = useNavigate()

  return (
    <Card>
      <div className={styles['book-holder']}>
        <div className={styles['img-holder']} onClick={() => navigate(`/BookDetails/${Book.Id}`)}>
          <img
            src={Book.Cover ? `data:image/png;base64, ${Book.Cover}` : imgPlaceholder}
            alt='Book cover'
            className={styles['book-img']}
          />
        </div>
        <div className={styles['about-book']}>
          <h2>{Book.Title}</h2>
          <div className={styles['published-date']}>
            <p>Published:</p>
            {Book.PublishDate ? <p>{convertDateToString(Book.PublishDate)}</p> : ''}
          </div>
          <p>
            {Book.Description?.substring(0, 50)}
            {Book.Description?.length > 50 ? '...' : ''}
          </p>
          <label>Author(s):</label>
          {Book.Authors &&
            Book.Authors.map((Author) => (
              <p key={Author.Id}>
                {Author.FirstName} {Author.LastName}
              </p>
            ))}
        </div>
      </div>
    </Card>
  )
}

export default BooksItem
