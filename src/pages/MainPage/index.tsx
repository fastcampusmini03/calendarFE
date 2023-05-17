import { useQuery } from 'react-query'
import { CalendarData } from '../../types/dates'
import { useState } from 'react'
import CalendarUI from '../../components/CalendarUI'
import { getCalendarDates } from '../../apis/axios'
import PersistentDrawerRight from '../../components/Header'

function MainPage() {
  /**calendar next/prev 버튼 기능 */
  const [year, setYear] = useState(2023)
  const [month, setMonth] = useState(5)

  // const queryClient = useQueryClient();
  const { data: calendarDates } = useQuery<CalendarData[] | any>(['dates', `${month}`], () =>
    getCalendarDates({ year, month }),
  )

  return (
    <div>
      <PersistentDrawerRight>
        <CalendarUI view="month" dates={calendarDates} setYear={setYear} setMonth={setMonth} />
      </PersistentDrawerRight>
    </div>
  )
}

export default MainPage
