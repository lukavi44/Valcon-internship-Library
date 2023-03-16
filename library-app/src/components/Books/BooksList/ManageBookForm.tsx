import axios from 'axios'
import { FormEvent, useCallback, useEffect, useState } from 'react'
import { postBookRequest } from '../../../services/BooksServices'
import styles from './ManageBookForm.module.css'
import Select, { MultiValue } from 'react-select'
import { getAuthors, postAuthor } from '../../../services/AuthorServices'
import placeholder from '../../../assets/placeholderImg/placeholder.jpeg'
import { BookBodyData } from '../../../models/bookData.model'
import { Author, AuthorPost } from '../../../models/author.model'

const ManageBookForm = () => {
  const [authors, setAuthors] = useState<Author[]>([])
  const [isAuthorFormOpen, setIsAuthorFormOpen] = useState(false)
  const [requestCover, setRequestCover] = useState<Blob>(new Blob())
  const [cover, setCover] = useState('')
  const [authorForm, setAuthorForm] = useState<AuthorPost>({
    FirstName: '',
    LastName: '',
  })
  const [formData, setFormData] = useState<BookBodyData>({
    Id: 0,
    Title: '',
    Description: '',
    Isbn: '',
    Quantity: 0,
    Cover: requestCover,
    PublishDate: '',
    AuthorIds: [],
  })

  useEffect(() => {
    try {
      fetchAuthorsData()
    } catch (error) {
      console.error(error)
    }
  }, [])

  const openFormhandler = () => {
    setIsAuthorFormOpen(!isAuthorFormOpen)
  }

  const handleFileChange = ({ currentTarget }: FormEvent<HTMLInputElement>) => {
    const files = currentTarget.files
    const reader = new FileReader()
    if (files) {
      reader.readAsDataURL(files[0])
      setRequestCover(files[0])
      reader.onloadend = function () {
        const base64data = reader.result
        if (base64data) setCover(base64data as string)
      }
    }
  }

  const fetchAuthorsData = useCallback(() => {
    getAuthors().then((response) => {
      setAuthors(response.data)
    })
  }, [])

  const addBookHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const form = new FormData()
      form.append('Cover', requestCover)
      form.append('Description', formData.Description)
      form.append('Isbn', formData.Isbn)
      form.append('PublishDate', formData.PublishDate)
      form.append('Quantity', formData.Quantity.toString())
      form.append('Title', formData.Title)
      formData.AuthorIds.forEach((author) => form.append('AuthorIds', author.Id.toString()))

      await postBookRequest(form)
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        console.error('neautorizovan')
      }
    }
  }

  const onChangeAuthors = (newAuthors: MultiValue<Author>) => {
    setFormData((prev) => ({ ...prev, AuthorIds: newAuthors.map((authors) => authors) }))
  }

  const addAuthorHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const form = new FormData()

      form.append('FirstName', authorForm.FirstName)
      form.append('LastName', authorForm.LastName)
      postAuthor(form)
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        console.error('neautorizovan')
      }
    }
  }

  return (
    <>
      <form className={styles['form-wrapper']} onSubmit={addBookHandler}>
        <div className={styles['form-group-column']}>
          <img className={styles['upload-img']} src={cover ? cover : placeholder} alt='' />
          <input id='cover' name='cover' type='file' onChange={handleFileChange} />
        </div>
        <div className={styles.bottom}>
          <div className={styles.left}>
            <div className={styles['form-group']}>
              <label htmlFor='title'>Set Title</label>
              <input
                id='title'
                name='title'
                defaultValue={formData.Title}
                onChange={(e) => setFormData((prev) => ({ ...prev, Title: e.target.value }))}
              />
            </div>
            <div className={styles['form-group']}>
              <label htmlFor='description'>Add Description</label>
              <textarea
                id='description'
                name='description'
                defaultValue={formData.Description}
                onChange={(e) => setFormData((prev) => ({ ...prev, Description: e.target.value }))}
              />
            </div>
            <div className={styles['form-group']}>
              <label htmlFor='isbn'>ISBN</label>
              <input
                id='isbn'
                name='isbn'
                defaultValue={formData.Isbn}
                onChange={(e) => setFormData((prev) => ({ ...prev, Isbn: e.target.value }))}
              />
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles['form-group']}>
              <label htmlFor='quantity'>Quantity</label>
              <input
                id='quantity'
                name='quantity'
                type='number'
                defaultValue={formData.Quantity}
                onChange={(e) => setFormData((prev) => ({ ...prev, Quantity: +e.target.value }))}
              />
            </div>
            <div className={styles['form-group']}>
              <label htmlFor='publishDate'>Publish Date</label>
              <input
                id='publishDate'
                name='publishDate'
                type='date'
                defaultValue={formData.PublishDate}
                onChange={(e) => setFormData((prev) => ({ ...prev, PublishDate: e.target.value }))}
              />
            </div>

            <div className={styles['form-group']}>
              <label htmlFor='authorIds'>Author(s)</label>
              <Select
                className={styles['select-authors-dropdown']}
                name='authorIds'
                id='authorIds'
                options={authors}
                defaultValue={formData.AuthorIds}
                getOptionLabel={(option) => `${option.FirstName} ${option.LastName}`}
                onChange={onChangeAuthors}
                isMulti
                getOptionValue={(option: Author) => option.Id.toString()}
              />
              {!isAuthorFormOpen && (
                <button onClick={openFormhandler} className={styles['add-btn']}>
                  Add New Author
                </button>
              )}
            </div>
          </div>
        </div>
        {!isAuthorFormOpen && <button className={styles['form-submit-btn']}>Submit Book</button>}
      </form>
      {isAuthorFormOpen && (
        <form onSubmit={addAuthorHandler} className={styles['add-author-form']}>
          <button onClick={() => setIsAuthorFormOpen(false)} type='button'>
            x
          </button>
          <h2>Add New Author</h2>
          <div className={styles['form-group']}>
            <input
              name='FirstName'
              onChange={(e) => setAuthorForm((prev) => ({ ...prev, FirstName: e.target.value }))}
              placeholder='first name'
            />
          </div>
          <div className={styles['form-group']}>
            <input
              name='LastName'
              onChange={(e) => setAuthorForm((prev) => ({ ...prev, LastName: e.target.value }))}
              placeholder='last name'
            />
          </div>
          <button type='submit' className={styles['add-btn']}>
            ADD AUTHOR
          </button>
        </form>
      )}
    </>
  )
}

export default ManageBookForm
