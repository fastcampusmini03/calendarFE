import { useState } from 'react'
import { useQuery } from 'react-query'
import { getUser } from '../apis/axios'

import { User } from 'src/types/user'

type authType = 'PENDING' | 'SUCCESS' | 'FAILED'

const useVerify = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<authType>('PENDING')
  const [userInfo, setUserInfo] = useState<User | undefined>(undefined)

  useQuery(['user'], () => getUser(), {
    staleTime: 60 * 60 * 1000,
    retry: 0,
    onSuccess: (data) => {
      //@ts-ignore
      setUserInfo(data.data)
      setIsAuthenticated('SUCCESS')
    },
    onError: (error) => {
      console.log(error)
      setIsAuthenticated('FAILED')
    },
  })

  return { userInfo, isAuthenticated }
}

export default useVerify
