import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import React from 'react'
import { theme } from '../../style/style'

type Props = {}

const ErrorPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          minHeight: '100vh',
          backgroundColor: theme.palette.primary.main,
        }}
      >
        <Typography variant="h1" style={{ color: 'white' }}>
          404
        </Typography>
        <Typography variant="h6" style={{ color: 'white' }}>
          존재하지 않는 페이지입니다
        </Typography>
        <Button variant="outlined" href="/" sx={{ marginTop: '10px' }}>
          홈으로 돌아가기
        </Button>
      </Box>
    </ThemeProvider>
  )
}

export default ErrorPage
