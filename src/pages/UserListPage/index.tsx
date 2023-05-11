import { useQuery, useQueryClient } from 'react-query'
import { getUsers } from '../../apis/axios'
import UserList from '../../components/UserList'
// import { DatesPayload } from '../../types/dates'
import { UserData } from '../../types/user'

function UserListPage() {
  const cachedDates = useQueryClient().getQueryData<UserData>('users')
  const { data: users, isLoading } = useQuery<UserData>('users', getUsers, {
    staleTime: 5 * 60 * 1000,
    initialData: cachedDates,
  })

  if (isLoading || users === undefined) {
    return <div>로딩중...</div>
  }
  return <UserList users={users} />
}

export default UserListPage
