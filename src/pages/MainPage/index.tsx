import { useQuery } from 'react-query'
import { CalendarData  } from '../../types/dates'
import { useEffect, useState } from "react"
import CalendarUI from "../../components/CalendarUI"
import {  getCalendarDates } from "../../apis/axios"
import PersistentDrawerRight from 'src/components/Header'




function MainPage() {
  /**calendar next/prev 버튼 기능 */
const [year, setYear] = useState(2023)
const [month, setMonth] = useState(5)
console.log(year)
console.log(month)
// const queryClient = useQueryClient();
  const { data: calendarDates, refetch } = useQuery<CalendarData[] | any>('dates', () => getCalendarDates({year, month})  
  )
  useEffect(() => {
    refetch();
  }, [year,month]);
  
  return (
    <PersistentDrawerRight>
      <CalendarUI view="month" dates={calendarDates} setYear={setYear} setMonth={setMonth}/>
    </PersistentDrawerRight>
  )
}

export default MainPage
