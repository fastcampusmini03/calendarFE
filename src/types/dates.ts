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
