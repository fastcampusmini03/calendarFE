import PersistentDrawerRight from '../../components/Header'
import { useQuery } from 'react-query'
// import CalendarUI from '../../components/CalendarUI'
import { CalendarData } from '../../types/dates'
// import { useEffect, useState } from "react"
import CalendarUI from '../../components/CalendarUI'
import { getCalendarDates } from '../../apis/axios'

function MainPage() {
  const { data: calendarDates } = useQuery<CalendarData[] | any>('dates', getCalendarDates)
  // const [created, setCreated] = useState<[]>([]);
  // const [updated, setUpdated] = useState<[]>([]);
  // const [deleted, setDeleted] = useState<[]>([]);

  // useEffect(() => {
  //      console.log('=============created===================')
  //      console.log(created);

  //      console.log('=============updated===================')
  //      console.log(updated);

  //      console.log('=============deleted===================')
  //      console.log(deleted);

  // }, [created, updated, deleted])
  // const { data: dates, isLoading } = useQuery<DatesPayload[]>('dates', getAllDates)
  // if (isLoading || calendarDates === undefined) {
  //   return <div>로딩중...</div>
  // }
  return (
    <PersistentDrawerRight>
      <CalendarUI view="month" dates={calendarDates} />
    </PersistentDrawerRight>
  )
}

export default MainPage
