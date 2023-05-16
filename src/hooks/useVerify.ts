import { useState } from 'react'
import { useQuery } from 'react-query'
import { getUser } from '../apis/axios'

type authType = 'PENDING' | 'SUCCESS' | 'FAILED'

const useVerify = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<authType>('PENDING')

  const { data: userInfo } = useQuery(['user'], () => getUser(), {
    staleTime: 60 * 60 * 1000,
    onSuccess: () => {
      setIsAuthenticated('SUCCESS')
    },
    onError: () => {
      setIsAuthenticated('FAILED')
    },
  })

  return { userInfo, isAuthenticated }
}

export default useVerify
