import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Toast from '../components/Common/Toast'
import useVerify from '../hooks/useVerify'
import ErrorPage from '../pages/ErrorPage'

const ProtectedRouter = () => {
  const [isOpened, setIsOpened] = useState(false)

  const navigate = useNavigate()

  const { userInfo } = useVerify()

  console.log(userInfo?.role)

  useEffect(() => {
    if (userInfo?.role === 'USER') {
      console.log('protected', userInfo)

      setIsOpened(true)
    }
  }, [userInfo])

  return (
    <>
      <Toast isOpened={isOpened} handleClose={() => navigate('/')} message="권한이 없습니다" />
      <ErrorPage />
    </>
  )
}

export default ProtectedRouter
