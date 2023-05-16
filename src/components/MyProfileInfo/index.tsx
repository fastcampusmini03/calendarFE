import { useState } from 'react'
import * as S from './style'

import { Box, Grid, Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import { usePostUser } from '../../hooks/usePostUser'
import { useNavigate } from 'react-router-dom'
import Toast from '../Common/Toast'

import useVerify from '../../hooks/useVerify'
import { useQueryClient } from 'react-query'

const MyprofileInfo = () => {
  const { userInfo } = useVerify()

  console.log({ userInfo })

  const queryClient = useQueryClient()
  const data = queryClient.getQueryData('user')

  console.log({ data })

  const navigate = useNavigate()

  // const [userInput, setUserInput] = useState<UserInput>({ username: '', password: '' })
  const { updateUser, isOpened } = usePostUser()

  const [isClicked, setIsClicked] = useState(false)

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm()

  //@ts-ignore
  const handleUpdate = async (data) => {
    const user = {
      password: data.password,
      username: data.username,
    }

    updateUser(user)
  }

  // const { year, month } = date

  return (
    <Box component="form" onSubmit={handleSubmit((data) => handleUpdate(data))}>
      <Grid
        container
        spacing={2}
        mb={4}
        py={4}
        sx={{
          borderTop: '1px solid #808080',
          borderBottom: '1px solid #808080',
        }}
      >
        <Grid item xs={2}>
          <Box sx={{ fontWeight: 'bold' }} ml={1}>
            개인 정보
          </Box>
        </Grid>
        <Grid item xs={10}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid container spacing={2} justifyContent="flex-end">
                <Grid
                  item
                  xs={4}
                  sx={{
                    borderBottom: '1px solid #808080',
                  }}
                >
                  <Box mb={4}>이름</Box>
                </Grid>
                <Grid
                  item
                  xs={6}
                  sx={{
                    borderBottom: '1px solid #808080',
                  }}
                >
                  {!isClicked ? (
                    <Box mb={2}>{userInfo?.data.username}</Box>
                  ) : (
                    <>
                      <S.Input
                        required
                        id="username"
                        autoFocus
                        defaultValue={userInfo?.data.username}
                        {...register('username', {
                          required: '이름은 필수 입력 항목입니다.',
                        })}
                      />
                      <S.ErrorMessage>{errors.username?.message as string}</S.ErrorMessage>
                    </>
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2} justifyContent="flex-end">
                <Grid
                  item
                  xs={4}
                  sx={{
                    borderBottom: '1px solid #808080',
                  }}
                >
                  <Box mb={4}>이메일</Box>
                </Grid>
                <Grid
                  item
                  xs={6}
                  sx={{
                    borderBottom: '1px solid #808080',
                  }}
                >
                  <Box mb={2}>{userInfo?.data.email}</Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2} justifyContent="flex-end">
                <Grid
                  item
                  xs={4}
                  sx={{
                    borderBottom: '1px solid #808080',
                  }}
                >
                  <Box mb={4}>권한</Box>
                </Grid>
                <Grid
                  item
                  xs={6}
                  sx={{
                    borderBottom: '1px solid #808080',
                  }}
                >
                  <Box mb={2}>{userInfo?.data.role}</Box>
                </Grid>
              </Grid>
            </Grid>
            {isClicked && (
              <Grid item xs={12}>
                <Grid container spacing={2} justifyContent="flex-end">
                  <Grid item xs={4}>
                    <Box mb={4}>새 비밀번호</Box>
                  </Grid>
                  <Grid item xs={6}>
                    <S.Input
                      type="password"
                      id="password"
                      {...register('password', {
                        required: '비밀번호는 필수 입력 항목입니다.',
                        minLength: {
                          value: 8,
                          message: '비밀번호는 8자 이상이여야 합니다,',
                        },
                      })}
                    />
                    <S.ErrorMessage>{errors.password?.message as string}</S.ErrorMessage>
                  </Grid>
                </Grid>
                <Grid container spacing={2} justifyContent="flex-end">
                  <Grid item xs={4}>
                    <Box mb={3}>새 비밀번호 (확인)</Box>
                  </Grid>
                  <Grid item xs={6}>
                    <S.Input
                      type="password"
                      id="passwordConfirm"
                      {...register('passwordConfirm', {
                        required: '비밀번호 확인은 필수 입력 항목입니다.',
                        validate: {
                          check: (value) => {
                            if (getValues('password') !== value) {
                              return '비밀번호가 일치하지 않습니다.'
                            }
                          },
                        },
                      })}
                    />
                    <S.ErrorMessage>{errors.passwordConfirm?.message as string}</S.ErrorMessage>
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>

      <Box sx={{ textAlign: 'right' }}>
        <Button sx={{ fontSize: '18px' }} onClick={() => setIsClicked((prev) => !prev)}>
          {!isClicked ? '수정' : '취소'}
        </Button>
        {isClicked && (
          <Button type="submit" sx={{ fontSize: '18px' }}>
            저장
          </Button>
        )}
      </Box>
      <Toast
        isOpened={isOpened}
        handleClose={() => navigate('/login')}
        message="회원 정보가 수정되었습니다."
      />
    </Box>
  )
}

export default MyprofileInfo
