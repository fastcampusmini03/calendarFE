import AnnualDutyList from '../../components/AnnualDutyList'
import { useQuery, useQueryClient } from 'react-query'
import { getCalendarDates } from '../../apis/axios'
import CalendarUI from '../../components/CalendarUI'
import { CalendarData } from '../../types/dates'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import FaceIcon from '@mui/icons-material/Face'
import { removeCookie } from '../../utils/cookies'
import { ACCESSTOKEN_KEY } from '../../apis/instance'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
  useInfiniteDeleteDates,
  useInfiniteEditDates,
  useInfiniteSaveDates,
} from '../../hooks/useInfiniteDates'

// import { useState, useEffect } from 'react'

function AdminPage() {
  const [year, setYear] = useState(2023)
  const [month, setMonth] = useState(5)
  const { data: calendarDates, refetch } = useQuery<CalendarData[]>('dates', () =>
    getCalendarDates({ year, month }),
  )
  const {
    data: saveDates,
    isLoading,
    fetchNextPage: fetchNextPageSave,
    hasNextPage: hasNextSavePage,
  } = useInfiniteSaveDates()
  const {
    data: editDates,
    fetchNextPage: fetchNextPageEdit,
    hasNextPage: hasNextEditPage,
  } = useInfiniteEditDates()
  const {
    data: deleteDates,
    fetchNextPage: fetchNextPageDelete,
    hasNextPage: hasNextDeletePage,
  } = useInfiniteDeleteDates()

  useEffect(() => {
    refetch()
  }, [year, month])
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const handleLogout = () => {
    removeCookie(ACCESSTOKEN_KEY)
    queryClient.invalidateQueries(['auth', 'verify'])
    navigate('/')
  }

  if (
    isLoading ||
    calendarDates === undefined ||
    saveDates === undefined ||
    editDates === undefined ||
    deleteDates === undefined ||
    hasNextDeletePage === undefined ||
    hasNextEditPage === undefined ||
    hasNextSavePage === undefined
  ) {
    return <div>로딩중...</div>
  }
  return (
    <>
      <Box sx={{ background: 'default' }}>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="right"
          gap="10px"
        >
          <Box display="flex" gap="10px">
            <Chip icon={<FaceIcon />} label="Admin" variant="outlined" />
            <Button variant="outlined" onClick={handleLogout}>
              로그아웃
            </Button>
          </Box>
        </Box>
        <Grid container spacing={1}>
          <Grid item xs={8}>
            <CalendarUI
              view={'month'}
              dates={calendarDates}
              setYear={setYear}
              setMonth={setMonth}
            />
          </Grid>
          <Grid item xs={4}>
            <AnnualDutyList
              saveDates={saveDates}
              editDates={editDates}
              deleteDates={deleteDates}
              fetchNextPageSave={fetchNextPageSave}
              fetchNextPageEdit={fetchNextPageEdit}
              fetchNextPageDelete={fetchNextPageDelete}
              hasNextSavePage={hasNextSavePage}
              hasNextEditPage={hasNextEditPage}
              hasNextDeletePage={hasNextDeletePage}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default AdminPage
