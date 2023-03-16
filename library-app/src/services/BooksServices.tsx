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
    Field: 'Title',
    Value: search,
    Operation: 2,
  }
}

const convertParamsToQueryString = ({ pageNumber, pageLength, search, filter }: GetBooksProps) => {
  let result = '?'
  result += `PageNumber=${pageNumber.toString()}`
  result += `&PageLength=${pageLength.toString()}`
  const where: Where[] = [...filter]
  where.push(createWhereSearch(search))
  where.forEach((where) => {
    if (where.Value !== '' && where.Value != null) {
      result += `&where=${JSON.stringify(where)}`
    }
  })
  return result
}

export const postBookRequest = (body: FormData): Promise<AxiosResponse> => {
  return axiosInstance.post<BookBodyData>('api/Books', body)
}

export const putBookRequest = (body: FormData): Promise<AxiosResponse> => {
  return axiosInstance.put<BookBodyData>('api/Books', body)
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
  )
}

export const removeBookRequest = (id: number) => {
  return axiosInstance.delete(`api/Books/${id}`)
}
