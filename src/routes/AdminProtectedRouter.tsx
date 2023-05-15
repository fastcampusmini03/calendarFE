import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Toast from '../components/Common/Toast'
import useVerify from '../hooks/useVerify'
import ErrorPage from '../pages/ErrorPage'

const AdminProtectedRouter = () => {
  const [isOpened, setIsOpened] = useState(false)

  const navigate = useNavigate()

  const { userInfo, isAuthenticated } = useVerify()

  useEffect(() => {
    console.log(userInfo?.role, isAuthenticated)
    if (userInfo?.role !== 'ADMIN' && isAuthenticated === 'SUCCESS') {
      setIsOpened(true)
    }
  }, [userInfo, isAuthenticated])

  return (
    <>
      <Toast isOpened={isOpened} handleClose={() => navigate('/')} message="권한이 없습니다" />
      {isOpened ? <ErrorPage /> : <Outlet />}
    </>
  )
}

export default AdminProtectedRouter
