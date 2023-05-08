import React, { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'

import {
  Alert,
  Container,
  Typography,
  Box,
  Grid,
  Link,
  TextField,
  CssBaseline,
  Button,
} from '@mui/material'
import * as S from './style'
import { useAuth } from '../../hooks/useAuth'
import Toast from '../Common/Toast'
import { useNavigate } from 'react-router-dom'

const SignupForm = () => {
  const { signupUser, isOpened } = useAuth()

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm()

  const handleSubmitRegister = (data: FieldValues) => {
    const { email, password, username } = data
    signupUser({ email, password, username })
  }

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} /> */}
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            onSubmit={handleSubmit((data) => handleSubmitRegister(data))}
            component="form"
            noValidate
            sx={{ mt: 5 }}
          >
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="이름"
                  autoFocus
                  {...register('username', {
                    required: '사용자명은 필수 입력 항목입니다.',
                  })}
                />
                <S.ErrorMessage>{errors.username?.message as string}</S.ErrorMessage>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="이메일"
                  id="email"
                  autoComplete="email"
                  {...register('email', {
                    required: '이메일은 필수 입력 항목입니다.',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: '이메일 형식이 올바르지 않습니다.',
                    },
                  })}
                />
                <S.ErrorMessage>{errors.email?.message as string}</S.ErrorMessage>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="비밀번호"
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
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="비밀번호 확인"
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
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 4, mb: 2 }}>
              회원 가입
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  이미 가입된 계정이 있으신가요? 로그인
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <Toast isOpened={isOpened} handleClose={() => navigate('/')} message={`님 환영합니다!`} />
    </>
  )
}

export default SignupForm
