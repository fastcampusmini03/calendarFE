import { useQuery } from 'react-query'
import { getUsers } from '../../apis/axios'
import UserList from '../../components/UserList'
// import { DatesPayload } from '../../types/dates'
import { UserData } from '../../types/user'

function UserListPage() {
  const { data: users, isLoading } = useQuery<UserData>('users', getUsers)

  if (isLoading || users === undefined) {
    return <div>로딩중...</div>
  }
  return <UserList users={users} />
}

export default UserListPage
