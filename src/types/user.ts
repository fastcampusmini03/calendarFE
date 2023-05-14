import { Paging } from './dates'

export interface User {
  id: number
  username: string
  email: string
  password: string
  role: string
}

export interface ResponseUser {
  status: number
  msg: string
  data: UserData
}

export interface UserData {
  content: User[]
  pageable: Paging
  last: boolean
  totalElements: number
  totalPages: number
  size: number
  number: number
  sort: {
    empty: boolean
    sorted: boolean
    unsorted: boolean
  }
  first: boolean
  numberOfElements: number
  empty: boolean
}
