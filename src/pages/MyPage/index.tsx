import React, { useEffect, useState } from 'react'
import PersistentDrawerRight from '../../components/Header'

import { useVerify } from '../../hooks/useVerify'
import MyprofileInfo from "../../components/'MyProfileInfo"

import { Container } from '@mui/material'

const MyPage = () => {
  const { userInfo, isAuthenticated } = useVerify()

  return (
    <>
      <PersistentDrawerRight>
        <Container maxWidth="md">
          <MyprofileInfo userInfo={userInfo} />
        </Container>
      </PersistentDrawerRight>
    </>
  )
}

export default MyPage
