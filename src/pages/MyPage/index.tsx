// import React, { useEffect, useState } from 'react'
import PersistentDrawerRight from '../../components/Header'

import useVerify from '../../hooks/useVerify'
import MyprofileInfo from '../../components/MyProfileInfo'

import { Container, Box } from '@mui/material'
import MyDutyInfo from '../../components/MyDutyInfo'

const MyPage = () => {
  const { userInfo } = useVerify()

  return (
    <>
      <PersistentDrawerRight>
        <Container maxWidth="md">
          <Box sx={{ height: '100vh' }}>
            <MyprofileInfo userInfo={userInfo} />
            <MyDutyInfo userInfo={userInfo} />
          </Box>
        </Container>
      </PersistentDrawerRight>
    </>
  )
}

export default MyPage
