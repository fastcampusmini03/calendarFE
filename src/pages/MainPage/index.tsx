import PersistentDrawerRight from "../../components/Header"
import { useQuery } from 'react-query'
// import CalendarUI from '../../components/CalendarUI'
import { DatesPayload } from '../../types/dates'
import { getAllDates } from '../../apis/axios'
import { useEffect, useState } from "react"
import CalendarUI from "../../components/CalendarUI"


function MainPage() {
  const [created, setCreated] = useState<[]>([]);
  const [updated, setUpdated] = useState<[]>([]);
  const [deleted, setDeleted] = useState<[]>([]);

  useEffect(() => {
       console.log('=============created===================')
       console.log(created);

       console.log('=============updated===================')
       console.log(updated);

       console.log('=============deleted===================')
       console.log(deleted);

  }, [created, updated, deleted])
  const { data: dates, isLoading } = useQuery<DatesPayload[]>('dates', getAllDates)
  if (isLoading || dates === undefined) {
    return <div>로딩중...</div>
  }
  return (
    <PersistentDrawerRight>
      <CalendarUI view="month" dates={dates} setCreated={setCreated} setUpdated={setUpdated} setDeleted={setDeleted}/>
    </PersistentDrawerRight>
  )
}

export default MainPage
