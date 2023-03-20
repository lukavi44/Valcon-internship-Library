import axios from 'axios'
import React, { Dispatch, FormEvent, SetStateAction, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { setLocalStorage } from '../../../helpers/manageLocalStorage'
import LoginRequest, { LoginRequestData } from '../../../services/auth'
import styles from './Login.module.css'

interface Props {
  setAccessToken: Dispatch<SetStateAction<string | null>>
}

const Login = ({  setAccessToken }: Props) => {
  const [enteredEmail, setEnteredEmail] = useState('')
  const [enteredEmailIsValid, setEnteredEmailIsValid] = useState(true)

  const [enteredPassword, setEnteredPassword] = useState('')
  const [enteredPasswordIsValid, setEnteredPasswordIsValid] = useState(true)

  const [invalidCredentials, setInvalidCredentials] = useState(false)

  const navigateTo = useNavigate()

  const getIsFieldValid = (term: string) => {
    return term.trim() !== ''
  }

  const getIsFormValid = () => {
    return getIsFieldValid(enteredEmail) && getIsFieldValid(enteredPassword)
  }

  const handleEmailChange = ({ currentTarget }: FormEvent<HTMLInputElement>) => {
    setEnteredEmail(currentTarget.value.trim())
  }

  const handlePasswordChange = ({ currentTarget }: FormEvent<HTMLInputElement>) => {
    setEnteredPassword(currentTarget.value.trim())
  }

  const formSubmissionHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!getIsFormValid()) {
      setEnteredEmailIsValid(getIsFieldValid(enteredEmail))
      setEnteredPasswordIsValid(getIsFieldValid(enteredPassword))
      return
    }
    const formData: LoginRequestData = {
      email: enteredEmail,
      password: enteredPassword,
    }

    LoginRequest(formData)
      .then(({ data }) => {
        setAccessToken(data.AccessToken)
        setLocalStorage(data)
        navigateTo('/')
      })
      .catch((error) => {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          setInvalidCredentials(true)
        }
      })
  }

  return (
    <div className={styles.container}>
      <h1>Login</h1>
      <form className={styles['form']} onSubmit={formSubmissionHandler}>
        <div
          className={`${styles['form-group']} ${enteredEmailIsValid ? '' : styles.invalid } ` }
        >
          <label htmlFor='email'>{!enteredEmailIsValid ? 'Please enter email' : 'Email'}</label>
          <input
            type='email'
            id='email'
            value={enteredEmail}
            onChange={handleEmailChange}
            onBlur={() => setEnteredEmailIsValid(getIsFieldValid(enteredEmail))}
            onFocus={() => setEnteredEmailIsValid(true)}
          />
        </div>
        <div
          className={`${styles['form-group']} ${enteredPasswordIsValid ? '' : styles.invalid } ` }
        >
          <label htmlFor='password'>
            {!enteredPasswordIsValid ? 'Please enter password' : 'Password'}
          </label>
          <input
            type='password'
            id='password'
            value={enteredPassword}
            onChange={handlePasswordChange}
            onBlur={() => setEnteredPasswordIsValid(getIsFieldValid(enteredPassword))}
            onFocus={() => setEnteredPasswordIsValid(true)}
          />
        </div>
        <div className={styles['form-group']}>
          <button className={styles.btn} type='submit'>
            Login
          </button>
        </div>
        {invalidCredentials && (
          <div className={invalidCredentials ? styles['invalid-credentials'] : ''}>
            <p>User is not found</p>
          </div>
        )}
      </form>
    </div>
  )
}

export default Login
