import { Author, AuthorBookDetails } from './author.model'

export interface BookItemList {
  items: BookResponse[]
  count: number
}

export interface BookRequest {
  Id: number
  Title: string
  Description: string
  Isbn: string
  Quantity: number
  Cover: Blob
  PublishDate: string
  AuthorIds: Author[]
}

export interface BookResponse {
  Id: number
  Title: string
  Available: number
  Description: string
  Isbn: string
  Quantity: number
  Cover: string
  PublishDate: string
  Authors: Author[]
}

export interface BookPostRequest {
   Title: string
  Available: number
  Description: string
  Isbn: string
  Quantity: number
  Cover: string
  PublishDate: string
  Authors: Author[]
}

export interface BookDetailsRequest {
  Id: number
  Title: string
  Available: number
  Description: string
  Isbn: string
  Quantity: number
  Cover: string
  PublishDate: string
  Authors: AuthorBookDetails[]
}
