import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Toast from '../components/Common/Toast'
import useVerify from '../hooks/useVerify'
import ErrorPage from '../pages/ErrorPage'

const LoginProtectedRouter = () => {
  console.log('wwwww')

  const [isOpened, setIsOpened] = useState(false)

  const navigate = useNavigate()

  const { isAuthenticated } = useVerify()

  useEffect(() => {
    if (isAuthenticated === 'FAILED') {
      setIsOpened(true)
    }
  }, [isAuthenticated])

  return (
    <>
      <Toast isOpened={isOpened} handleClose={() => navigate('/login')} message="로그인 해주세요" />
      {isOpened ? <ErrorPage /> : <Outlet />}
    </>
  )
}

export default LoginProtectedRouter
