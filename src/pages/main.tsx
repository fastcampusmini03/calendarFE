import PersistentDrawerRight from '../components/Header'
import { useQuery } from 'react-query'
import CalendarUI from '../components/CalendarUI'
import { DatesPayload } from '../types/dates'
import { getDates } from '../apis/axios'

function Main() {
  const { data: dates, isLoading } = useQuery<DatesPayload[]>('dates', getDates)
  if (isLoading || dates === undefined) {
    return <div>로딩중...</div>
  }
  return (
    <PersistentDrawerRight>
      <CalendarUI view="month" dates={dates} />
    </PersistentDrawerRight>
  )
}

export default Main
