import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { getUsers } from '../apis/axios'
import { getCookie } from '../utils/cookies'

type authType = 'PENDING' | 'SUCCESS' | 'FAILED'

const useVerify = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<authType>('PENDING')

  const token = getCookie('accessToken')

  const { data: userInfo } = useQuery(['user'], () => getUsers(), {
    staleTime: 60 * 60 * 1000, //accessToken 만료 시간과 동일한 시간 적용해야됨.
    onSuccess: (data) => {
      console.log({ data })
      setIsAuthenticated('SUCCESS')

      // setUserInfo(data.payload.user)
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
