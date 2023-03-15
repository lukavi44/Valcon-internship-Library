import { AxiosResponse } from 'axios'
import { BookBodyData, BookItemList } from '../models/bookData.model'
import Where from '../models/where.model'
import axiosInstance from './axiosConfig'

interface GetBooksProps {
  pageNumber: number
  pageLength: number
  search: string
  filter: Where[]
  sort: string[]
}

const createWhereSearch = (search: string) => {
  return {
    field: 'Title',
    value: search,
    operation: 2,
  }
}

const convertParamsToQueryString = ({
  pageNumber,
  pageLength,
  search,
  filter,
  sort,
}: GetBooksProps) => {
  let result = '?'
  result += 'PageNumber=' + pageNumber.toString()
  result += '&PageLength=' + pageLength.toString()
  const where: Where[] = [...filter]
  where.push(createWhereSearch(search))
  where.forEach((where) => {
    if (where.value !== '' && where.value != null) {
      result += `&where=${JSON.stringify(where)}`
    }
  })
  sort.forEach((sort) => {
    if (sort) result += '&Order=' + sort
  })
  return result
}

export const postBookRequest = (body: FormData): Promise<AxiosResponse> => {
  return axiosInstance.post<BookBodyData>('api/Books', body, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  })
}

export const getBooksRequest = ({
  pageNumber,
  pageLength,
  search,
  filter,
  sort,
}: GetBooksProps): Promise<AxiosResponse> => {
  return axiosInstance.get<BookItemList>(
    'api/Books/paged' +
      convertParamsToQueryString({ pageNumber, pageLength, search, filter, sort }),
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    },
  )
}

export const removeBookRequest = (id: number) => {
  return axiosInstance.delete(`api/Books/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  })
}
