import { useQuery, useQueryClient } from 'react-query'
import { getUsers } from '../../apis/axios'
import UserList from '../../components/UserList'
import { DatesPayload } from '../../types/dates'

function UserListPage() {
  const cachedDates = useQueryClient().getQueryData<DatesPayload[]>('users')
  const { data: users, isLoading } = useQuery<DatesPayload[]>('users', getUsers, {
    staleTime: 5 * 60 * 1000,
    initialData: cachedDates,
  })

  if (isLoading || users === undefined) {
    return <div>로딩중...</div>
  }
  return <UserList users={users} />
}

export default UserListPage
