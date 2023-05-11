/* eslint-disable no-console */
import type { EventObject, ExternalEventTypes, Options } from '@toast-ui/calendar'
import type { MouseEvent } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import '@toast-ui/calendar/dist/toastui-calendar.min.css'
import Calendar from '@toast-ui/react-calendar'
import { theme } from '../../utils/theme'
import './style.css'

// import { addDate, addHours, subtractDate } from '../../utils/utils'
import { CalendarData } from '../../types/dates'
// import Typography from '@mui/material/Typography'
// import Chip from '@mui/material/Chip'
// import Box from '@mui/material/Box'
import { useMutation, useQuery } from 'react-query'
import { ACCESSTOKEN_KEY } from '../../apis/instance'
import { deleteDate, postDate, putDate, verify } from '../../apis/axios'
import Toast from '../Common/Toast'
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
  // setCreated: Function
  // setUpdated: Function
  // setDeleted: Function
  // id: any
}

export default function CalendarUI({ view, dates }: PropsType) {
  const [mainid, setMainId] = useState()
  /**calendar 일정 작성 요청 */
  const { mutate } = useMutation(postDate, {
    onSuccess: (data) => {
      console.log(data)
      console.log(data.data.id)
    },
  })

  /**calendar 일정 수정  */
  const { mutate: putMutate } = useMutation(putDate, {
    onSuccess: (data) => {
      console.log(data)
    },
  })
  /**calendar 일정 삭제  */
  const { mutate: deleteMutate } = useMutation(deleteDate, {
    onSuccess: (data) => {
      console.log(data)
    },
  })

  /**snackbar state */
  const [editopen, setEditOpen] = useState(false)
  const [editmessage, setEditMessage] = useState('')

  const [deleteopen, setDeleteOpen] = useState(false)
  const [deletemessage, setDeleteMessage] = useState('')
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(true)
  }

  const handleClose = (reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setEditOpen(false)
    setDeleteOpen(false)
    setOpen(false)
  }

  /**user 인증 */
  const [user, setUser] = useState<string>()
  const { data: verifyPayload, status } = useQuery(['verify', ACCESSTOKEN_KEY], verify, {
    retry: false,
  })

  function popup() {
    if (verifyPayload && status !== 'error') {
      if (user === undefined || verifyPayload?.data.username === user) {
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
      backgroundColor: '#00A9FF',
      borderColor: '#03BD9E',
      color: '#FCFEFF',
      dragBackgroundColor: '#9e5fff',
    },
    {
      id: '1',
      name: '승인됨',
      backgroundColor: '#00ff08',
      borderColor: '#03BD9E',
      color: '#FCFEFF',
      dragBackgroundColor: '#00a9ff',
    },
  ]
  /** api로부터 받아온 일정 데이터 */

  const initialEvents: Partial<EventObject>[] = dates?.map((date) => ({
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
    // res.attendees.push(verifyPayload?.data.username);
    console.group('onAfterRenderEvent')
    console.log('Event Info : ', res.title)
    console.groupEnd()
  }

  const onBeforeDeleteEvent: ExternalEventTypes['beforeDeleteEvent'] = (res) => {
    if (verifyPayload.data.username === user) {
      console.group('onBeforeDeleteEvent')
      console.log('Event Info : ', res.title)
      console.groupEnd()

      const { id, calendarId } = res
      deleteMutate(mainid)
      // setDeleted(res)
      getCalInstance().deleteEvent(id, calendarId)
    } else {
      setDeleteOpen(true)
      setDeleteMessage('작성자가 달라 이 글을 삭제 할 수 없습니다')
    }
  }
  // console.log(verifyPayload?.payload.user.role)
  // const onChangeSelect = (ev: ChangeEvent<HTMLSelectElement>) => {
  //   setSelectedView(ev.target.value as ViewType)
  // }

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
  /**일정 클릭 했을 때 발생 이벤트 */
  const onClickEvent: ExternalEventTypes['clickEvent'] = (res) => {
    console.group('onClickEvent')
    console.log('MouseEvent : ', res.nativeEvent)
    console.log('Event Info : ', res.event)
    console.groupEnd()
    setMainId(res.event.id)
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
  /**일정 수정 했을 때 발생 이벤트 */
  const onBeforeUpdateEvent: ExternalEventTypes['beforeUpdateEvent'] = (updateData) => {
    if (verifyPayload.data.username === user) {
      console.group('onBeforeUpdateEvent')
      console.log(updateData)
      console.groupEnd()
      const event = {
        // id: String(Math.random()), calendar 전체 데이터 불러와서 거기에 맞는 id를 찾는다
        title: updateData.changes.title,
        start: '2023-05-08T18:47:43.08946',
        end: '2023-05-10T18:47:44.08946',
      }
      const targetEvent = updateData.event
      const changes = { ...updateData.changes }
      let put = event
      putMutate({ put, mainid })
      console.log(mainid)
      console.log(event)
      // setUpdated(event)
      getCalInstance().updateEvent(targetEvent.id, targetEvent.calendarId, changes)
    } else {
      setEditOpen(true)
      setEditMessage('작성자가 달라 이 글을 수정 할 수 없습니다.')
    }
  }

  const onBeforeCreateEvent: ExternalEventTypes['beforeCreateEvent'] = (eventData) => {
    const event = {
      calendarId: eventData.calendarId || '',
      // id: String(Math.random()),
      // id: mainid,
      title: eventData.title,
      isAllday: eventData.isAllday,
      start: eventData.start ? new Date(eventData.start as Date).toISOString() : '',
      end: eventData.end ? new Date(eventData.end as Date).toISOString() : '',
      email: verifyPayload?.data.email,
      username: verifyPayload?.data.username,
      role: verifyPayload?.data.role,
    }
    // setCreated(event)
    mutate(event)
    getCalInstance().createEvents([event])
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
            locationPlaceholder() {
              return '부서를 입력 하세요!'
            },
            titlePlaceholder() {
              return '일정을 입력 하세요!'
            },
            popupSave() {
              return '승인 요청'
            },
            popupUpdate() {
              return '일정 수정'
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
        <Toast isOpened={editopen} message={editmessage} handleClose={handleClose} />
        <Toast isOpened={deleteopen} message={deletemessage} handleClose={handleClose} />
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
