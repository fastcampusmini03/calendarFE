/* eslint-disable no-console */
import type { EventObject, ExternalEventTypes, Options } from '@toast-ui/calendar'
import { TZDate } from '@toast-ui/calendar'
import type { ChangeEvent, MouseEvent } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import '@toast-ui/calendar/dist/toastui-calendar.min.css'
import Calendar from '@toast-ui/react-calendar'
import { theme } from '../../utils/theme'
import './style.css'

// import { addDate, addHours, subtractDate } from '../../utils/utils'
import { CalendarData, DatesPayload, ResponseData } from '../../types/dates'
// import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
// import Box from '@mui/material/Box'
import { useQuery } from 'react-query'
import { ACCESSTOKEN_KEY } from '../../apis/instance'
import { verify } from '../../apis/axios'
import Toast from '../Common/Toast'

import Box from '@mui/material/Box'
// import Button from '@mui/material/Button'

type ViewType = 'month' | 'week' | 'day'

// const today = new TZDate()
// const viewModeOptions = [
//   {
//     title: 'Monthly',
//     value: 'month',
//   },
//   {
//     title: 'Weekly',
//     value: 'week',
//   },
//   {
//     title: 'Daily',
//     value: 'day',
//   },
// ]

interface PropsType {
  view: ViewType
  dates: CalendarData[]
  setCreated: Function
  setUpdated: Function
  setDeleted: Function
}
export default function CalendarUI({ view, dates, setCreated, setUpdated, setDeleted }: PropsType) {
  /**
   *
   */
  const [user, setUser] = useState<string>()
  const { data: verifyPayload, status } = useQuery(['verify', ACCESSTOKEN_KEY], verify, {
    retry: false,
  })

  function popup() {
    if (verifyPayload && status !== 'error') {
      if (user === undefined || verifyPayload?.payload.user.username === user) {
        return true
      }
    }
    return false
  }

  const calendarRef = useRef<typeof Calendar>(null)
  const [selectedDateRangeText, setSelectedDateRangeText] = useState('')
  const [selectedView, setSelectedView] = useState(view)

  const initialCalendars: Options['calendars'] = [
    {
      id: '0',
      name: '승인중',
      backgroundColor: '#9e5fff',
      borderColor: '#9e5fff',
      dragBackgroundColor: '#9e5fff',
    },
    {
      id: '1',
      name: '승인됨',
      backgroundColor: '#00a9ff',
      borderColor: '#00a9ff',
      dragBackgroundColor: '#00a9ff',
    },
  ]
  /** api로부터 받아온 일정 데이터 */
  const initialEvents: Partial<EventObject>[] = dates.map((date) => ({
    id: date.id.toString(),
    calendarId: date.status,
    title: date.title,
    start: new Date(date.startTime),
    end: new Date(date.endTime),
    email: date.user.email,
    role: date.user.role,
    attendees: [date.user.username],
  }))

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const getCalInstance = useCallback(() => calendarRef.current?.getInstance?.(), [])

  const updateRenderRangeText = useCallback(() => {
    const calInstance = getCalInstance()
    if (!calInstance) {
      setSelectedDateRangeText('')
    }

    const viewName = calInstance.getViewName()
    const calDate = calInstance.getDate()
    const rangeStart = calInstance.getDateRangeStart()
    const rangeEnd = calInstance.getDateRangeEnd()

    let year = calDate.getFullYear()
    let month = calDate.getMonth() + 1
    let date = calDate.getDate()
    let dateRangeText: string

    switch (viewName) {
      case 'month': {
        dateRangeText = `${year}-${month}`
        break
      }
      case 'week': {
        year = rangeStart.getFullYear()
        month = rangeStart.getMonth() + 1
        date = rangeStart.getDate()
        const endMonth = rangeEnd.getMonth() + 1
        const endDate = rangeEnd.getDate()

        const start = `${year}-${month < 10 ? '0' : ''}${month}-${date < 10 ? '0' : ''}${date}`
        const end = `${year}-${endMonth < 10 ? '0' : ''}${endMonth}-${
          endDate < 10 ? '0' : ''
        }${endDate}`
        dateRangeText = `${start} ~ ${end}`
        break
      }
      default:
        dateRangeText = `${year}-${month}-${date}`
    }

    setSelectedDateRangeText(dateRangeText)
  }, [getCalInstance])

  useEffect(() => {
    setSelectedView(view)
  }, [view])

  useEffect(() => {
    updateRenderRangeText()
  }, [selectedView, updateRenderRangeText])
  /** 일정 추가했을때 */
  const onAfterRenderEvent: ExternalEventTypes['afterRenderEvent'] = (res) => {
    console.log(res)
    res.title = res.isAllday === true ? '당직' + res.title : '연휴' + res.title
    console.group('onAfterRenderEvent')
    console.log('Event Info : ', res.title)
    console.groupEnd()
  }

  const onBeforeDeleteEvent: ExternalEventTypes['beforeDeleteEvent'] = (res) => {
    if (verifyPayload.payload.user.username === user) {
      console.group('onBeforeDeleteEvent')
      console.log('Event Info : ', res.title)
      console.groupEnd()

      const { id, calendarId } = res
      setDeleted(res)
      getCalInstance().deleteEvent(id, calendarId)
    } else {
      alert('같은 user가 아닙니다')
    }
  }

  const onChangeSelect = (ev: ChangeEvent<HTMLSelectElement>) => {
    setSelectedView(ev.target.value as ViewType)
  }

  const onClickDayName: ExternalEventTypes['clickDayName'] = (res) => {
    console.group('onClickDayName')
    console.log('Date : ', res.date)
    console.groupEnd()
  }

  const onClickNavi = (ev: MouseEvent<HTMLButtonElement>) => {
    if ((ev.target as HTMLButtonElement).tagName === 'BUTTON') {
      const button = ev.target as HTMLButtonElement
      const actionName = (button.getAttribute('data-action') ?? 'month').replace('move-', '')
      getCalInstance()[actionName]()
      updateRenderRangeText()
    }
  }

  const onClickEvent: ExternalEventTypes['clickEvent'] = (res) => {
    console.group('onClickEvent')
    console.log('MouseEvent : ', res.nativeEvent)
    console.log('Event Info : ', res.event)
    console.groupEnd()
    setUser(res.event.attendees[0])
  }

  const onClickTimezonesCollapseBtn: ExternalEventTypes['clickTimezonesCollapseBtn'] = (
    timezoneCollapsed,
  ) => {
    console.group('onClickTimezonesCollapseBtn')
    console.log('Is Timezone Collapsed?: ', timezoneCollapsed)
    console.groupEnd()

    const newTheme = {
      'week.daygridLeft.width': '100px',
      'week.timegridLeft.width': '100px',
    }

    getCalInstance().setTheme(newTheme)
  }

  const onBeforeUpdateEvent: ExternalEventTypes['beforeUpdateEvent'] = (updateData) => {
    if (verifyPayload.payload.user.username === user) {
      console.group('onBeforeUpdateEvent')
      console.log(updateData)
      console.groupEnd()

      const targetEvent = updateData.event
      const changes = { ...updateData.changes }
      setUpdated(updateData)
      getCalInstance().updateEvent(targetEvent.id, targetEvent.calendarId, changes)
    } else {
      alert('user가 같지 않습니다')
    }
  }

  const onBeforeCreateEvent: ExternalEventTypes['beforeCreateEvent'] = (eventData) => {
    const event = {
      calendarId: eventData.calendarId || '',
      id: String(Math.random()),
      title: eventData.title,
      isAllday: eventData.isAllday,
      start: eventData.start,
      end: eventData.end,
      category: eventData.isAllday ? 'allday' : 'time',
      dueDateClass: '',
      location: eventData.location,
      state: eventData.state,
      isPrivate: eventData.isPrivate,
    }
    setCreated(event)
    getCalInstance().createEvents([event])
  }
  const [open, setOpen] = useState(false)
  const handleClick = () => {
    setOpen(true)
  }

  const handleClose = (reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }
  return (
    <div>
      {/* <Typography variant="h2" color="initial" align="center">
        아듀 캘린더
      </Typography> */}

      <div>
        {/* <select onChange={onChangeSelect} value={selectedView}>
          {viewModeOptions.map((option, index) => (
            <option value={option.value} key={index}>
              {option.title}
            </option>
          ))}
        </select> */}

        <span>
          <button
            type="button"
            className="btn btn-default btn-sm move-today"
            data-action="move-today"
            onClick={onClickNavi}
          >
            Today
          </button>
          <button
            type="button"
            className="btn btn-default btn-sm move-day"
            data-action="move-prev"
            onClick={onClickNavi}
          >
            Prev
          </button>
          <button
            type="button"
            className="btn btn-default btn-sm move-day"
            data-action="move-next"
            onClick={onClickNavi}
          >
            Next
          </button>
        </span>
        <span className="render-range">{selectedDateRangeText}</span>
      </div>
      <div onClick={handleClick}>
        <Calendar
          height="900px"
          calendars={initialCalendars}
          month={{ startDayOfWeek: 1 }}
          events={initialEvents}
          template={{
            milestone(event) {
              return `<span style="color: #fff; background-color: ${event.backgroundColor};">${event.title}</span>`
            },
            allday(event) {
              return `[All day] ${event.title}`
            },
            popupEdit() {
              return '수정'
            },
            popupDelete() {
              return '삭제'
            },
            popupIsAllday() {
              return 'all day'
            },
          }}
          theme={theme}
          timezone={{
            zones: [
              {
                timezoneName: 'Asia/Seoul',
                displayLabel: 'Seoul',
                tooltip: 'UTC+09:00',
              },
              {
                timezoneName: 'Pacific/Guam',
                displayLabel: 'Guam',
                tooltip: 'UTC+10:00',
              },
            ],
          }}
          useDetailPopup={true}
          useFormPopup={popup()}
          view={selectedView}
          week={{
            showTimezoneCollapseButton: true,
            timezonesCollapsed: false,
            eventView: true,
            taskView: true,
          }}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          ref={calendarRef}
          onAfterRenderEvent={onAfterRenderEvent}
          onBeforeDeleteEvent={onBeforeDeleteEvent}
          onClickDayname={onClickDayName}
          onClickEvent={onClickEvent}
          onClickTimezonesCollapseBtn={onClickTimezonesCollapseBtn}
          onBeforeUpdateEvent={onBeforeUpdateEvent}
          onBeforeCreateEvent={onBeforeCreateEvent}
        />
        {verifyPayload ? null : (
          <Toast
            isOpened={open}
            message="로그인 후에 글 작성이나 수정이 가능합니다"
            handleClose={handleClose}
          />
        )}
      </div>
    </div>
  )
}
