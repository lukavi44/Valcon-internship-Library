import { BookBodyDataGet } from '../../../models/bookData.model'
import Card from '../../UI/Card'
import styles from './BooksItem.module.css'
import { useEffect, useState } from 'react'
import imgPlaceholder from '../../../assets/placeholderImg/placeholder.jpeg'
import Modal from '../../Layout/Modal'
import { removeBookRequest } from '../../../services/BooksServices'
import EditBookForm from '../BooksList/EditBookForm'
import { useNavigate } from 'react-router-dom'
import { convertDateToString } from '../../../helpers/convertDate.helpers'

export interface BookProps {
  Book: BookBodyDataGet
  isLoggedIn: boolean
}

const BooksItem = ({ Book, isLoggedIn }: BookProps) => {
  const [coverPlaceholder, setCoverPlaceholder] = useState('')
  const navigate = useNavigate()
  useEffect(() => {
    setCoverPlaceholder(imgPlaceholder)
  }, [])

  return (
    <Card>
      <div className={styles['book-holder']}>
        <div className={styles['img-holder']} onClick={() => navigate(`/BookDetails/${Book.Id}`)}>
          <img
            src={Book.Cover ? `data:image/png;base64, ${Book.Cover}` : coverPlaceholder}
            alt=''
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
