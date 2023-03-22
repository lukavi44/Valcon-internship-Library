import { FormEvent, useCallback, useEffect, useState } from 'react'
import Select, { MultiValue } from 'react-select'
import axios from 'axios'
import { postBookRequest } from '../../../services/BooksServices'
import { getAuthors, postAuthor } from '../../../services/AuthorServices'
import { Author, AuthorPost } from '../../../models/author.model'
import { BookRequest } from '../../../models/bookData.model'
import placeholder from '../../../assets/placeholderImg/placeholder.jpeg'
import styles from './ManageBookForm.module.css'
import { toast } from 'react-toastify'

const ManageBookForm = () => {
  const [authors, setAuthors] = useState<Author[]>([])
  const [isAuthorFormOpen, setIsAuthorFormOpen] = useState(false)
  const [requestCover, setRequestCover] = useState<Blob>(new Blob())
  const [previewCover, setPreviewCover] = useState('')
  const [authorForm, setAuthorForm] = useState<AuthorPost>({
    FirstName: '',
    LastName: '',
  })
  const [formData, setFormData] = useState<BookRequest>({
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
      toast.error(`${error}`)
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
        if (base64data) setPreviewCover(base64data as string)
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
    if (formData.Isbn.trim() === '' || formData.Quantity === 0 || formData.Title.trim() === '') {
        toast.error('Quantity, ISBN and Title inputs must be filled')
        return
      }
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
      toast.success(`${formData.Quantity} copies of ${formData.Title} is successfully created`)
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        toast.error('Authorization needed')
      }
    }
  }

  const onChangeAuthors = (newAuthors: MultiValue<Author>) => {
    setFormData((prev) => ({ ...prev, AuthorIds: newAuthors.map((authors) => authors) }))
  }

  const addAuthorHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (authorForm.FirstName.trim() === '' || authorForm.LastName.trim() === ''){
        toast.error('Both inputs must be filled')
        return
      }
    try {
      const form = new FormData()

      form.append('FirstName', authorForm.FirstName)
      form.append('LastName', authorForm.LastName)
      postAuthor(form)
      toast.success(`Author ${authorForm.FirstName} ${authorForm.LastName} successfully added`)
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        toast.error('Authorization needed')
      }
    }
  }

  return (
    <>
      <form className={styles['form-wrapper']} onSubmit={addBookHandler}>
        <div className={styles['form-group-column']}>
          <img
            className={styles['upload-img']}
            src={previewCover ? previewCover : placeholder}
            alt='Book Cover'
          />
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
          <button onClick={() => setIsAuthorFormOpen(false)} type='button' className={styles['close-btn']}>
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
