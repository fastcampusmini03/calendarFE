import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { login, signup } from '../apis/axios'
import { APIResponses } from '../types/response'
// import { setCookie } from '../utils/cookies'
import { useNavigate } from 'react-router-dom'
import useVerify from './useVerify'

export const useAuth = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [isOpened, setIsOpened] = useState(false)
  const [userName, setUserName] = useState('')
  const { userInfo } = useVerify()

  const successLogin = (data: APIResponses) => {
    setUserName(data.data.username)
    setIsOpened((prev) => !prev)

    if (data.data.role === 'ADMIN') {
      navigate('/admin')
    }
  }

  const { mutate: loginUser, isError } = useMutation(login, {
    onSuccess: (data) => {
      if (!data) return
      successLogin(data)
    },
  })

  const { mutate: signupUser } = useMutation(signup, {
    onSuccess: (data) => {
      if (!data) return
      console.log(data)
      successLogin(data)
    },
  })

  const logoutUser = () => {
    queryClient.setQueryData(['user'], null)
    navigate('/login')
  }

  return { loginUser, signupUser, logoutUser, isOpened, isError, userName }
}
