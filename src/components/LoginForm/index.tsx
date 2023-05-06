import React, { useState } from 'react'

import { Container, Typography, Box, Link, TextField, CssBaseline, Button } from '@mui/material'
import { useAuth } from '../../hooks/useAuth'
import Toast from '../Common/Toast'
import { useNavigate } from 'react-router-dom'

interface UserInput {
  email: string
  password: string
}

const LoginForm = () => {
  const { loginUser, isOpened } = useAuth()
  const [userInput, setUserInput] = useState<UserInput>({ email: '', password: '' })

  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    loginUser(userInput)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserInput({
      ...userInput,
      [name]: value,
    })

    console.log(userInput)
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
          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar> */}
          <Typography component="h1" variant="h5">
            Login In
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              onChange={handleChange}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoFocus
            />
            <TextField
              onChange={handleChange}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              로그인
            </Button>
            <Link href="/signup" variant="body2">
              {'아직 계정이 없으시나요? 회원 가입'}
            </Link>
          </Box>
        </Box>
      </Container>
      <Toast isOpened={isOpened} handleClose={() => navigate('/')} message={`님 환영합니다!`} />
    </>
  )
}

export default LoginForm
