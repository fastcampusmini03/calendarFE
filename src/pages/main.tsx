import PersistentDrawerRight from '../components/Header'
import { useQuery } from 'react-query'
// import CalendarUI from '../components/CalendarUI'
import { DatesPayload } from '../types/dates'
import { getAllDates } from '../apis/axios'

function Main() {
  // TODO 3개월 간의 데이터를 받아오는 메소드로 교체할것!
  const { data: dates, isLoading } = useQuery<DatesPayload[]>('dates', getAllDates)
  if (isLoading || dates === undefined) {
    return <div>로딩중...</div>
  }
  return (
    <PersistentDrawerRight>{/* <CalendarUI view="month" dates={dates} /> */}</PersistentDrawerRight>
  )
}

export default Main
