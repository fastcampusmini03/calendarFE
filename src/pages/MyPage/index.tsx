import React, { useEffect, useState } from 'react'
import PersistentDrawerRight from '../../components/Header'

import { useVerify } from '../../hooks/useVerifyUser'
import MyprofileInfo from "../../components/'MyProfileInfo"

import { Container } from '@mui/material'

const MyPage = () => {
  const { userInfo, isAuthenticated } = useVerify()

  console.log(userInfo)

  return (
    <>
      <PersistentDrawerRight>
        <Container maxWidth="xl">
          <MyprofileInfo userInfo={userInfo} />
        </Container>
      </PersistentDrawerRight>
    </>
  )
}

export default MyPage
