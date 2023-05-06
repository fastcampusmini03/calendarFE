import React, { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { login, signup } from '../apis/axios'
import { LoginResponse, SignupResponse } from '../types/response'
import { setCookie } from '../utils/cookies'
import { useNavigate } from 'react-router-dom'

export const useAuth = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [isOpened, setIsOpened] = useState(false)

  const successLogin = (data) => {
    setCookie('accessToken', data.payload!.accessToken, {
      path: '/',
      maxAge: data.payload!.content?.exp - data.payload!.content?.iat,
    })
    setIsOpened((prev) => !prev)
  }

  const { mutate: loginUser } = useMutation(login, {
    onSuccess: (data: LoginResponse) => {
      if (!data) return
      console.log({ data })
      successLogin(data)
    },
  })

  const { mutate: signupUser } = useMutation(signup, {
    onSuccess: (data: SignupResponse) => {
      if (!data) return
      console.log(data)
      successLogin(data)
    },
  })

  const logoutUser = () => {
    queryClient.setQueryData(['user'], null)
    navigate('/login')
  }

  return { loginUser, signupUser, logoutUser, isOpened }
}
