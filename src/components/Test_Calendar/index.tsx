/* eslint-disable no-console */
// import './Calendar.css';
import type { EventObject, ExternalEventTypes, Options } from '@toast-ui/calendar'
// import { TZDate } from '@toast-ui/calendar';
// import type { ChangeEvent, MouseEvent } from 'react';
import type { MouseEvent } from 'react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Calendar from '@toast-ui/react-calendar'
// import styled from '@emotion/styled';
import { theme } from '../../utils/theme'
// import styled from '@emotion/styled';
import { useQuery } from 'react-query'
import { getCookie } from '../../utils/cookies'
import { ACCESSTOKEN_KEY } from '../../apis/instance'
import { verify } from '../../apis/axios'
import { useNavigate } from 'react-router-dom'
import { DatesPayload } from '../../types/dates'
import Toast from '../Common/Toast'
// import { Helmet } from 'react-helmet'

interface PropsType {
  view: ViewType
  dates: DatesPayload[]
  setCreated: Function
  setUpdated: Function
  setDeleted: Function
}
type ViewType = 'month' | 'week' | 'day'

// const today = new TZDate();
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
// ];

export function CalendarApp({ view, dates, setCreated, setUpdated, setDeleted }: PropsType) {
  const [user, setUser] = useState<string>()
  const accessToken = getCookie(ACCESSTOKEN_KEY)
  // const queryClient = useQueryClient();
  const navigate = useNavigate()
  const { data: verifyPayload, status } = useQuery(['verify', accessToken], verify, {
    retry: false,
  })

  function popup() {
    if (verifyPayload && status !== 'error') {
      if (user === undefined) {
        return true
      }
    }
    return false
  }

  // function  ClickedHandler() {
  //   navigate('/login')
  //   return true;
  // }
  // const divClickedHandler = (event: React.MouseEvent<HTMLDivElement>) => {
  //   if(verifyPayload && status !== "error") {
  //     const div = event.currentTarget;
  //     console.log(div)
  //       return true;
  //   } else {
  //     handleClick

  //   }

  // };

  const calendarRef = useRef<typeof Calendar>(null)
  const [selectedDateRangeText, setSelectedDateRangeText] = useState('')
  const [selectedView, setSelectedView] = useState(view)
  const initialCalendars: Options['calendars'] = [
    {
      id: '0',
      name: 'Private',
      backgroundColor: '#9e5fff',
      borderColor: '#9e5fff',
      dragBackgroundColor: '#9e5fff',
    },
    {
      id: '1',
      name: 'Company',
      backgroundColor: '#00a9ff',
      borderColor: '#00a9ff',
      dragBackgroundColor: '#00a9ff',
    },
  ]
  // const initialEvents: Partial<EventObject>[] = [
  //   {
  //     id: '1',
  //     calendarId: '0',
  //     title: 'TOAST UI Calendar Study',
  //     category: 'time',
  //     start: today,
  //     end: addHours(today, 3),
  //   },
  //   {
  //     id: '2',
  //     calendarId: '0',
  //     title: 'Practice',
  //     category: 'milestone',
  //     start: addDate(today, 1),
  //     end: addDate(today, 1),
  //     isReadOnly: true,
  //   },
  //   {
  //     id: '3',
  //     calendarId: '0',
  //     title: 'FE Workshop',
  //     category: 'allday',
  //     start: subtractDate(today, 2),
  //     end: subtractDate(today, 1),
  //     isReadOnly: true,
  //   },
  //   {
  //     id: '4',
  //     calendarId: '0',
  //     title: 'Report',
  //     category: 'time',
  //     start: today,
  //     end: addHours(today, 1),
  //   },
  // ];
  /** api로부터 받아온 일정 데이터 */
  const initialEvents: Partial<EventObject>[] = dates.map((date) => ({
    id: date.id.toString(),
    calendarId: date.calendarId.toString(),
    title: date.title,
    start: new Date(date.start),
    end: new Date(date.end),
    email: date.email,
    role: date.role,
    attendees: [date.username],
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

  const onAfterRenderEvent: ExternalEventTypes['afterRenderEvent'] = (res) => {
    console.group('onAfterRenderEvent')
    // res.attendees.push('환수');
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

  // const onChangeSelect = (ev: ChangeEvent<HTMLSelectElement>) => {
  //   setSelectedView(ev.target.value as ViewType);
  // };

  const onClickDayName: ExternalEventTypes['clickDayName'] = (res) => {
    console.group('onClickDayName')
    console.log('Date : ', res.date)
    console.groupEnd()
  }

  // const onClickMoreEventsBtn: ExternalEventTypes['onClickMoreEventsBtn'] = (res) => {
  //   console.group('onClickMoreEventsBtn');
  //   console.log(res);
  //   console.groupEnd();
  // };

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
    setUser(res.event.attendees[0])
    res.event.raw = 'user'
    console.groupEnd()
  }
  console.log(user)
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
  // console.log(typeof verifyPayload.payload.user.username)
  const onBeforeUpdateEvent: ExternalEventTypes['beforeUpdateEvent'] = (updateData) => {
    if (verifyPayload.payload.user.username === user) {
      console.group('onBeforeUpdateEvent')
      console.log(updateData)
      console.log(updateData.event.attendees[0])
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
  const [open, setOpen] = React.useState(false)

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
      {/* <button
        onClick={handleClick({
          vertical: 'top',
          horizontal: 'center',
        })}
      >
        Top-Center
      </button> */}
      {/* <Helmet>
       <title>메인페이지</title>
    </Helmet> */}
      {/* <h1>🍞📅 TOAST UI Calendar + React.js</h1> */}
      <div>
        {/* <WrapButton>
        <Button>login</Button>
        <MainSignButton>signup</MainSignButton>
        </WrapButton> */}
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

        {/* <LoginButton>login</LoginButton> */}
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
              return `[당직] ${event.title}`
            },
            popupEdit() {
              return '수정'
            },
            popupDelete() {
              return '삭제'
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
          // useDetailPopup={true}
          useFormPopup={popup()}
          useDetailPopup={true}
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
