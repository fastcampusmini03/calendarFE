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

export interface MainDatePayload {
  calendarId: string;
  email: any;
  username: any;
  title: string | undefined;
  isAllday: boolean | undefined;
  start: any | undefined;
  end: any | undefined;
  role: any;
}

export type  MainPutDatePayload = Pick<put, "title" | "start" | "end"> & {
  id: any;
}
export interface put {
  title: FormDataEntryValue;
  start: FormDataEntryValue;
  end: FormDataEntryValue;
}