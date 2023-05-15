import { useQuery } from 'react-query'
import { CalendarData  } from '../../types/dates'
import { useState } from "react"
import CalendarUI from "../../components/CalendarUI"
import {  getCalendarDates } from "../../apis/axios"
import PersistentDrawerRight from '../../components/Header'
import Footer from '../../components/Footer'

function MainPage() {
  /**calendar next/prev 버튼 기능 */
const [year, setYear] = useState(2023)
const [month, setMonth] = useState(5)
console.log(year)
console.log(month)
// const queryClient = useQueryClient();
  const { data: calendarDates} = useQuery<CalendarData[] | any>(['dates', `${month}`], () => getCalendarDates({year, month})  
  )
  
  return (
    <>
      <PersistentDrawerRight>
        <CalendarUI view="month" dates={calendarDates} setYear={setYear} setMonth={setMonth} />
      </PersistentDrawerRight>
      <Footer />
    </>
  )
}

export default MainPage
