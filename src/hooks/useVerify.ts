import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { getUser } from '../apis/axios'
import { getCookie } from '../utils/cookies'

type authType = 'PENDING' | 'SUCCESS' | 'FAILED'

const useVerify = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<authType>('PENDING')
  const [userInfo, setUserInfo] = useState('')

  const token = getCookie('accessToken')

  const { data } = useQuery(['user'], () => getUser(), {
    staleTime: 60 * 60 * 1000, //accessToken 만료 시간과 동일한 시간 적용해야됨.
    onSuccess: (data) => {
      //@ts-ignore
      setUserInfo(data.data)
      setIsAuthenticated('SUCCESS')
    },
    onError: () => {
      setIsAuthenticated('FAILED')
    },
    retry: 0,
    enabled: !!token,
  })

  return { userInfo, isAuthenticated }
}

export default useVerify
