import axiosInstance from './axiosConfig'

export const postRentBook = (bookId: number) => {
    return axiosInstance.post(`api/Rental/rent/${bookId}`)
}

export const postReturnBook = (bookId: number, userId: number) => {
    return axiosInstance.post(`api/Rental/return/${bookId}/${userId}`)
}

export const getBookHistory = (bookId: number) => {
    return axiosInstance.get(`api/Rental/book-history/${bookId}`)
}

export const getUserHistory = (userId: number) => {
    return axiosInstance.get(`api/Rental/user-history/${userId}`)
}

export const getMostRentedBooks = (count: number) => {
    return axiosInstance.get(`api/Rental/top/${count}`)
}