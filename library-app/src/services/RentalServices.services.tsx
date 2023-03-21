import { RentBookHistory } from '../models/rent.model'
import axiosInstance from './axiosConfig'

export const postRentBook = (bookId: number) => {
    return axiosInstance.post(`api/Rental/rent/${bookId}`)
}

export const postReturnBook = (rentId: number) => {
    return axiosInstance.post(`api/Rental/return/${rentId}`)
}

export const getBookHistory = (bookId: number) => {
    return axiosInstance.get<RentBookHistory[]>(`api/Rental/book-history/${bookId}`)
}

export const getMostRentedBooks = (count: number) => {
    return axiosInstance.get(`api/Rental/top/${count}`)
}