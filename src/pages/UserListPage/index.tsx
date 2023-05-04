import { useQuery, useQueryClient } from 'react-query'
import { getDates } from '../../apis/axios'
import UserList from '../../components/UserList'
import { DatesPayload } from '../../types/dates'

function UserListPage() {
  const cachedDates = useQueryClient().getQueryData<DatesPayload[]>('dates')
  const { data: dates, isLoading } = useQuery<DatesPayload[]>('dates', getDates, {
    staleTime: 5 * 60 * 1000,
    initialData: cachedDates,
  })

  if (isLoading || dates === undefined) {
    return <div>로딩중...</div>
  }
  return <UserList dates={dates} />
}

export default UserListPage
