import React, { useEffect, useState } from 'react'
import PersistentDrawerRight from '../../components/Header'

import useVerify from '../../hooks/useVerify'
import MyprofileInfo from "../../components/MyProfileInfo"

import { Container } from '@mui/material'
import { getUserDuty } from '../../apis/axios'

const MyPage = () => {
  const { userInfo, isAuthenticated } = useVerify()

  // useEffect(async () => {
  //   const res = await getUserDuty()
  //   console.log({ res })
  // }, [])

  console.log({ userInfo })
  console.log({ isAuthenticated })

  return (
    <MyprofileInfo userInfo={userInfo} />
    // <>
    //   <PersistentDrawerRight>
    //     <Container maxWidth="md">

    //     </Container>
    //   </PersistentDrawerRight>
    // </>
  )
}

export default MyPage
