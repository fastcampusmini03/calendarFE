import UserList from '../../components/UserList'
// import { DatesPayload } from '../../types/dates'

import { useInfiniteUsers } from '../../hooks/useInfiniteDates'

function UserListPage() {
  const {
    data: users,
    fetchNextPage: fetchNextUser,
    isLoading,
    hasNextPage: hasNextUserPage,
  } = useInfiniteUsers()

  if (isLoading || users === undefined || hasNextUserPage === undefined) {
    return <div>로딩중...</div>
  }
  return (
    <>
      <UserList users={users} fetchNextUser={fetchNextUser} hasNextUserPage={hasNextUserPage} />
    </>
  )
}

export default UserListPage
