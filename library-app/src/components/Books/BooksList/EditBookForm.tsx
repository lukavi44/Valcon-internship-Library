import { Dispatch, FormEvent, SetStateAction, useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Select, { MultiValue } from 'react-select'
import axios from 'axios'
import {  Author, AuthorBookDetails, AuthorPost } from '../../../models/author.model'
import {  BookDetailsRequest } from '../../../models/bookData.model'
import { getAuthors, postAuthor } from '../../../services/AuthorServices'
import { putBookRequest } from '../../../services/BooksServices'
import styles from './ManageBookForm.module.css'
import { convertDateToString } from '../../../helpers/convertDate.helpers'

interface EditBookFormProps {
  book: BookDetailsRequest
  setIsEditModalOpened: Dispatch<SetStateAction<boolean>>
}

const EditBookForm = ({ book, setIsEditModalOpened }: EditBookFormProps) => {
  const [authors, setAuthors] = useState<Author[]>([])
  const [isAuthorFormOpen, setIsAuthorFormOpen] = useState(false)
  const [requestCover, setRequestCover] = useState<Blob>(new Blob())
  const [cover, setCover] = useState('')
  const [authorForm, setAuthorForm] = useState<AuthorPost>({
    FirstName: '',
    LastName: '',
  })
  const [formData, setFormData] = useState<BookDetailsRequest>({
    Id: book.Id,
    Title: book.Title,
    Description: book.Description,
    ISBN: book.ISBN,
    Available: book.Available,
    Quantity: book.Quantity,
    Cover: book.Cover,
    PublishDate: book.PublishDate,
    Authors: book.Authors,
  })
  const [ selectedAuthors, setSelectedAuthors ] = useState<Author[]>([])

  useEffect(() => {
    try {
      fetchAuthorsData()
    } catch (error) {
       toast.error('No authors to show')
    }
    if (book.Cover) {
      setRequestCover(base64ToBlob(`data:image/png;base64, ${book.Cover}`))
    }
  }, [cover])
  
  const openFormhandler = () => {
    setIsAuthorFormOpen(!isAuthorFormOpen)
  }

    const convertModel = (authors: AuthorBookDetails[]): Author[] => {
    return authors.map((author) => {
      return {
        Id: author.Id,
        FirstName: author.Firstname,
        LastName: author.Lastname
      }
    })
    }
  
  const base64ToBlob = (base64Image: string): Blob => {
    const parts = base64Image.split(';base64,')
    const imageType = parts[0].split(':')[1]
    const decodedData = window.atob(parts[1])
    const uIntArray = new Uint8Array(decodedData.length)
    for (let i = 0; i < decodedData.length; ++i) {
      uIntArray[i] = decodedData.charCodeAt(i)
    }
    return new Blob([ uIntArray ], { type: imageType })
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

  const editBookHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      if (formData.ISBN.trim() === '' || formData.Quantity === 0 || formData.Title.trim() === '') {
        toast.error('Quantity, ISBN and Title inputs must be filled')
        return
      }
      const form = new FormData()
      form.append('Id', book.Id.toString())
      form.append('Cover', requestCover)
      form.append('Description', formData.Description)
      form.append('Isbn', formData.ISBN)
      form.append('PublishDate', formData.PublishDate)
      form.append('Quantity', formData.Quantity.toString())
      form.append('Title', formData.Title)
      selectedAuthors.forEach((author) => {
        form.append('AuthorIds', author.Id.toString())
      })
      await putBookRequest(form)
      toast.success(`${formData.Title} successfully edited`)
      setIsEditModalOpened(false)
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        toast.error('Authorization is needed')
      }
    }
  }

  const onChangeAuthors = (newAuthors: MultiValue<Author>) => {
    setSelectedAuthors(newAuthors.map(author => author))
  }

  const addAuthorHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const form = new FormData()

      form.append('FirstName', authorForm.FirstName)
      form.append('LastName', authorForm.LastName)
      postAuthor(form)
      toast.success(`Author ${authorForm.FirstName} ${authorForm.LastName} successfully added`)
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        toast.error(`${error}`)
      }
    }
  }

  return (
    <>
      <form className={styles['form-wrapper']} onSubmit={editBookHandler}>
        <div className={styles['form-group-column']}>
          <img
            className={styles['upload-img']}
            src={book.Cover ? `data:image/png;base64, ${book.Cover}` : cover}
            alt='Book Cover'
          />
           <input id='cover' name='cover' type='file' onChange={handleFileChange} />
        </div>
        <div className={styles.bottom}>
          <div className={styles.left}>
            <div className={styles['form-group']}>
              <label htmlFor='title'>Set Title</label>
              <input
                type='text'
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
                id='Isbn'
                name='Isbn'
                type='text'
                defaultValue={formData.ISBN}
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
                defaultValue={convertDateToString(formData.PublishDate, 'yyyy-MM-dd')}
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
                defaultValue={convertModel(formData.Authors)}
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
          <button onClick={() => setIsAuthorFormOpen(false)}>x</button>
          <h2>Add New Author</h2>
          <div className={styles['form-group']}>
            <input
              type='text'
              name='FirstName'
              onChange={(e) => setAuthorForm((prev) => ({ ...prev, FirstName: e.target.value }))}
              placeholder='first name'
            />
          </div>
          <div className={styles['form-group']}>
            <input
              type='text'
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

export default EditBookForm
