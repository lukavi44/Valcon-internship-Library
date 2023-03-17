import { AxiosResponse } from 'axios'
import { Author, AuthorPost } from '../models/author.model'
import axiosInstance from './axiosConfig'

export const getAuthors = async (): Promise<AxiosResponse> => {
  return axiosInstance.get<Author[]>('api/Authors')
}

export const postAuthor = async (body: FormData): Promise<AxiosResponse> => {
  return axiosInstance.post<AuthorPost>('api/Authors', body, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
}
