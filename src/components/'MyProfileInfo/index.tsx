import React, { useState } from 'react'
import * as S from './style'

import { Box, Grid, TextField, CssBaseline, Button } from '@mui/material'

const MyprofileInfo = ({ userInfo }) => {
  const [isClicked, setIsClicked] = useState(false)

  console.log(userInfo)

  return (
    <Box sx={{ height: '100vh' }}>
      <Box component="h1">내 정보</Box>
      <Grid container spacing={2} mb={6}>
        <Grid item xs={2}>
          <Box sx={{ fontWeight: 'bold' }} ml={1}>
            개인 정보
          </Box>
        </Grid>
        <Grid item xs={8}>
          <Box
            sx={{
              width: '500px',
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Box mb={2}>이름</Box>
                  </Grid>
                  <Grid item xs={6}>
                    {!isClicked ? <Box mb={2}>{userInfo?.username}</Box> : <S.Input />}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Box mb={2}>이메일</Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box mb={2}>{userInfo?.email}</Box>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Box mb={2}>권한</Box>
                  </Grid>
                  <Grid item xs={6}>
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
                      <StyledTextField />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Box mb={3}>새 비밀번호 (확인)</Box>
                    </Grid>
                    <Grid item xs={6}>
                      <StyledTextField />
                    </Grid>
                  </Grid>
                </Grid>
              )}
            </Grid>
            <Box mt={2} sx={{ textAlign: 'right' }}>
              <Button sx={{ mr: 1 }} onClick={() => setIsClicked((prev) => !prev)}>
                {!isClicked ? '수정' : '취소'}
              </Button>
              {isClicked && <Button>저장</Button>}
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Grid item xs={2}>
        <Box sx={{ fontWeight: 'bold' }} ml={1}>
          일정 정보
        </Box>
      </Grid>
    </Box>
  )
}

export default MyprofileInfo
