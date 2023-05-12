// import React, { useEffect, useState } from 'react'
import PersistentDrawerRight from '../../components/Header'

import useVerify from '../../hooks/useVerify'
import MyprofileInfo from '../../components/MyProfileInfo'

import { Container } from '@mui/material'
import MyDutyInfo from '../../components/MyDutyInfo'
import {
  getAllCalendarDates,
  getCalendarDates,
  getDeleteDates,
  getEditDates,
  getSaveDates,
  getUserDuty,
} from '../../apis/axios'
import { useEffect } from 'react'
import { ApproveData, CalendarData, DeleteData, EditData } from 'src/types/dates'
import { useQuery } from 'react-query'
// import { getUserDuty } from '../../apis/axios'

const MyPage = () => {
  const { userInfo, isAuthenticated } = useVerify()
  // const { data: calendarDates } = useQuery<CalendarData[]>('dates', getCalendarDates)
  // const { data: AllcalendarDates } = useQuery<CalendarData[]>('Alldates', getAllCalendarDates)
  // console.log({ AllcalendarDates })

  // console.log( calendarDates )

  // const approvedData = calendarDates?.filter((item) => item.status === '1')

  // const userApprovedData = approvedData?.filter((item) => item.user.email === userInfo.email)
  // console.log({ userApprovedData })

  // const userDutys = filteredData
  //   ?.map((item) => item.user)
  //   .filter((item) => item.email === userInfo.email)

  // console.log(calendarDates)
  // const filteredUser = filteredData?.filter((item) => item.email)

  // useEffect(async () => {

  //   const res = await getSaveDates()
  //   console.log({ res })
  // }, [])

  // const { data: saveDates } = useQuery<ApproveData>('saveDates', getSaveDates)
  // const { data: editDates } = useQuery<EditData>('editDates', getEditDates)
  // const { data: deleteDates } = useQuery<DeleteData>('deleteDates', getDeleteDates)
  // const { data: userDuty } = useQuery('userDuty', getUserDuty)

  // console.log({ deleteDates })
  // console.log({ editDates })
  // console.log({ saveDates })

  // console.log({ userInfo })
  // console.log({ isAuthenticated })

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
