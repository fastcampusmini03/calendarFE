import { User } from './user'
/** api 요청의 일정 데이터 response 타입 */
export interface CalendarData {
  id: number
  status: string
  user: User
  title: string
  startTime: string
  endTime: string
  type: boolean
  createdAt: string
  updatedAt: string
  updateStatus: any
}
/** 승인 요청 response 데이터 타입 */
export interface ApproveData {
  content: CalendarData[]
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
/** 삭제 요청 response 데이터 타입 */
export interface DeleteData extends ApproveData {}

/** 수정 요청 response 데이터 타입 */
export interface EditData {
  content: [
    {
      id: number
      annualDuty: {
        id: number
        status: string
        title: string
        startTime: string
        endTime: string
        type: boolean
        createdAt: string
        updatedAt: string
        updateStatus: number
      }
      title: string
      startTime: string
      endTime: string
      createdAt: string
      updatedAt: string
    },
  ]
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
/** 페이징 옵션 데이터 타입 */
export interface Paging {
  sort: {
    empty: boolean
    sorted: boolean
    unsorted: boolean
  }
  offset: number
  pageSize: number
  pageNumber: number
  paged: boolean
  unpaged: boolean
}

/** 달력 3개월간의 데이터 요청 api response 타입 */
export interface ResponseData {
  status: number
  msg: string
  data: CalendarData[]
}
/** 승인 요청 api response 타입 */
export interface ResponseApproveData {
  status: number
  msg: string
  data: ApproveData
}

/** 삭제 요청 api response 타입 */
export interface ResponseDeleteData {
  status: number
  msg: string
  data: DeleteData
}

/** 수정 요청 api response 타입  */
export interface ResponseEditData {
  status: number
  msg: string
  data: EditData
}

export interface DatesPayload {
  id: number
  calendarId: number
  username: string
  email: string
  title: string
  start: Date
  end: Date
  isAllday: boolean
  role: string
  prevDate?: DatesPayload
}

export interface UsersPayload {
  id: number
  username: string
  email: string
  role: string
}

export interface AdminPageProps {
  dates: DatesPayload[]
}

type ViewType = 'month' | 'week' | 'day'

export interface CalendarUIProps {
  view: ViewType
  dates: DatesPayload[]
}
