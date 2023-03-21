import User from './user.model'

export interface RentBookHistory {
  Id: number
  User: User
  RentDate: string
  IsReturned: boolean
}

export interface RentUserHistory {
  Book: {
    Id: number
    Title: string
  }
  RentDate: string
  isReturnded: boolean
}
