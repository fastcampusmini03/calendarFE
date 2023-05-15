import React, { useState } from 'react'

import { Container, Typography, Box, Link, CssBaseline, Button } from '@mui/material'
import { useAuth } from '../../hooks/useAuth'
import Toast from '../Common/Toast'
import { useNavigate } from 'react-router-dom'
import * as S from './style'

interface UserInput {
  email: string
  password: string
}

const LoginForm = () => {
  const { userLogin, isOpened, userName } = useAuth()
  const [userInput, setUserInput] = useState<UserInput>({ email: '', password: '' })

  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    userLogin.mutate(userInput as any)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserInput({
      ...userInput,
      [name]: value,
    })
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
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <S.Input
              onChange={handleChange}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoFocus
            />
            <S.Input
              onChange={handleChange}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
            />
            <Box sx={{ height: '10px' }} mb={2}>
              {userLogin.isError && (
                <Box sx={{ fontSize: 14, color: '#B71C1C' }}>아이디와 비밀번호를 확인해주세요</Box>
              )}
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: '#8294C4', color: '#DBDFEA' }}
            >
              로그인
            </Button>
            <Link href="/signup" variant="body2">
              {'아직 계정이 없으시나요? 회원 가입'}
            </Link>
          </Box>
        </Box>
      </Container>
      <Toast
        isOpened={isOpened}
        handleClose={() => navigate('/')}
        message={`${userName}님 환영합니다!`}
      />
    </>
  )
}

export default LoginForm
