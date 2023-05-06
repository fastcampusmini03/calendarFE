import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { verify } from '../apis/axios'
import { getCookie } from '../utils/cookies'

type authType = 'PENDING' | 'SUCCESS' | 'FAILED'

export const useVerifyUser = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<authType>('PENDING')

  const token = getCookie('accessToken')

  const { data: userInfo } = useQuery(['user'], verify, {
    onSuccess: () => {
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
