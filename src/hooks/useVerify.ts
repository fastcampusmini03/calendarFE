import { useState } from 'react'
import { useQuery } from 'react-query'
import { getUser } from '../apis/axios'
import { getCookie } from '../utils/cookies'
import { User } from 'src/types/user'

type authType = 'PENDING' | 'SUCCESS' | 'FAILED'

const useVerify = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<authType>('PENDING')
  const [userInfo, setUserInfo] = useState<User | undefined>(undefined)

  const token = getCookie('accessToken')

  useQuery(['user'], () => getUser(), {
    staleTime: 60 * 60 * 1000,
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
