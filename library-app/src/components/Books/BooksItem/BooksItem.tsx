import { BookResponse } from '../../../models/bookData.model'
import Card from '../../UI/Card'
import styles from './BooksItem.module.css'
import imgPlaceholder from '../../../assets/placeholderImg/placeholder.jpeg'
import { useNavigate } from 'react-router-dom'
import { convertDateToString } from '../../../helpers/convertDate.helpers'
export interface BookProps {
  Book: BookResponse
  accessToken: string | null
}

  const BooksItem = ({ Book }: BookProps) => {
  const navigate = useNavigate()

  return (
    <Card>
      <div className={styles['book-holder']} onClick={() => navigate(`/BookDetails/${Book.Id}`)}>
        <div className={styles['img-holder']}>
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
            {Book.PublishDate ? <p>{convertDateToString(Book.PublishDate, 'dd.MM.yyyy')}</p> : ''}
          </div>
        
          <p className={styles['book-description']}>
            {Book.Description?.substring(0, 50)}
            {Book.Description?.length > 50 ? '...' : ''}
          </p>
       
          <div className={styles['book-authors']}>
          <label>Author(s):</label>
          {Book.Authors &&
            Book.Authors.map((Author) => (
              <p key={Author.Id}>
                {Author.FirstName} {Author.LastName}
              </p>
            ))}
            </div>
        </div>
      </div>
    </Card>
  )
}

export default BooksItem
