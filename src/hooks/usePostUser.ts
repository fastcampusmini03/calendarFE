import React, { useState } from 'react'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { postUser } from '../apis/axios'
import { removeCookie } from '../utils/cookies'

export const usePostUser = () => {
  const navigate = useNavigate()
  const [isOpened, setIsOpened] = useState(false)

  const { mutate: updateUser } = useMutation(postUser, {
    onSuccess: () => {
      setIsOpened((prev) => !prev)
      removeCookie('accessToken')
    },
  })

  return { updateUser, isOpened }
}
