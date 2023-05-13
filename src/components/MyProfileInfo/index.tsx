import { useState } from 'react'
import * as S from './style'

import { Box, Grid, Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import { usePostUser } from '../../hooks/usePostUser'
import { useNavigate } from 'react-router-dom'
import Toast from '../Common/Toast'

const MyprofileInfo = ({ userInfo }) => {
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
    <>
      <Box component="h1" mb={5}>
        내 정보
      </Box>
      <Grid
        container
        spacing={2}
        mb={6}
        p={2}
        sx={{ border: 1, borderRadius: 2, borderColor: 'rgb(218,220,224)' }}
        onSubmit={handleSubmit((data) => handleUpdate(data))}
        component="form"
      >
        <Grid item xs={2}>
          <Box sx={{ fontWeight: 'bold' }} ml={1}>
            개인 정보
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box
            sx={{
              width: '500px',
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid
                    item
                    xs={4}
                    sx={{
                      borderBottom: '1px solid rgb(218,220,224)',
                    }}
                  >
                    <Box mb={2}>이름</Box>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sx={{
                      borderBottom: '1px solid rgb(218,220,224)',
                    }}
                  >
                    {!isClicked ? (
                      <Box mb={2}>{userInfo?.username}</Box>
                    ) : (
                      <>
                        <S.Input
                          required
                          id="username"
                          autoFocus
                          defaultValue={userInfo?.username}
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
                <Grid container spacing={2}>
                  <Grid
                    item
                    xs={4}
                    sx={{
                      borderBottom: '1px solid rgb(218,220,224)',
                    }}
                  >
                    <Box mb={2}>이메일</Box>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sx={{
                      borderBottom: '1px solid rgb(218,220,224)',
                    }}
                  >
                    <Box mb={2}>{userInfo?.email}</Box>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid
                    item
                    xs={4}
                    sx={{
                      borderBottom: '1px solid rgb(218,220,224)',
                    }}
                  >
                    <Box mb={2}>권한</Box>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sx={{
                      borderBottom: '1px solid rgb(218,220,224)',
                    }}
                  >
                    <Box mb={2}>{userInfo?.role}</Box>
                  </Grid>
                </Grid>
              </Grid>
              {isClicked && (
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Box mb={3}>새 비밀번호</Box>
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
                  <Grid container spacing={2}>
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
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box>
            <Button sx={{ mx: 1 }} onClick={() => setIsClicked((prev) => !prev)}>
              {!isClicked ? '수정' : '취소'}
            </Button>
            {isClicked && <Button type="submit">저장</Button>}
          </Box>
        </Grid>
      </Grid>
      <Toast
        isOpened={isOpened}
        handleClose={() => navigate('/login')}
        message="회원 정보가 수정되었습니다."
      />
    </>
  )
}

export default MyprofileInfo
