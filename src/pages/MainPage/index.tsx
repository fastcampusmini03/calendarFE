import PersistentDrawerRight from "../../components/Header"
import { useQuery } from 'react-query'
// import CalendarUI from '../../components/CalendarUI'
import { DatesPayload } from '../../types/dates'
import { getDates } from '../../apis/axios'
import { CalendarApp } from "../../components/Test_Calendar"
import { useEffect, useState } from "react"


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
  const { data: dates, isLoading } = useQuery<DatesPayload[]>('dates', getDates)
  if (isLoading || dates === undefined) {
    return <div>로딩중...</div>
  }
  return (
    <PersistentDrawerRight>
      {/* <CalendarUI view="month" dates={dates} /> */}
      <CalendarApp view="month" dates={dates} setCreated={setCreated} setUpdated={setUpdated} setDeleted={setDeleted} />
    
    </PersistentDrawerRight>
  )
}

export default MainPage
