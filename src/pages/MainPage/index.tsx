import PersistentDrawerRight from "../../components/Header"
import { useMutation, useQuery } from 'react-query'
// import CalendarUI from '../../components/CalendarUI'
import { DatesPayload, MainDatePayload } from '../../types/dates'
import { postDate } from '../../apis/axios'
import { useEffect, useState } from "react"
import CalendarUI from "../../components/CalendarUI"




export const useMutate = () => {
  const { mutate, isLoading, error } = useMutation(postDate, {
    onSuccess: (data) => {
      console.log(data)
    },
  });

  return { mutate, isLoading, error };
};




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
  // const { data: dates, isLoading } = useQuery<DatesPayload[]>('dates', getAllDates)
  // if (isLoading || dates === undefined) {
  //   return <div>로딩중...</div>
  // }
  return (
    <PersistentDrawerRight>
      <CalendarUI view="month" setCreated={setCreated} setUpdated={setUpdated} setDeleted={setDeleted}/>
    </PersistentDrawerRight>
  )
}

export default MainPage
