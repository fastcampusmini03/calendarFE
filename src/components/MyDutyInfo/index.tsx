import React, { useState } from 'react'
import { Box, Grid, Tab, Tabs } from '@mui/material'
import { CalendarData } from '../../types/dates'
import { getCalendar, getSaveDates } from '../../apis/axios'
import { useQuery } from 'react-query'
import DateView from '../DateView'
import UserDutyList from '../UserDutyList'
import { User } from '../../types/user'

interface MyDutyInfoProps {
  userInfo: User
}

interface MyDutyInfoProps {
  userInfo: User
}

const MyDutyInfo = ({ userInfo }: MyDutyInfoProps) => {
  console.log({ userInfo })

  const [date, setDate] = useState({ year: 2023, month: 5 })

  const handleChangeDate = (year: number, month: number) => {
    setDate({
      year,
      month: month + 1,
    })
  }

  const [value, setValue] = useState('applied')
  const handleChange = (newValue: string) => {
    setValue(newValue)
  }

  const { data: calendarDates } = useQuery<CalendarData[] | any>(['dates', `${date.month}`], () =>
    getCalendar(date.year, date.month),
  )

  const { data: appliedData } = useQuery(['saveData'], () => getSaveDates())

  const appliedUserData: CalendarData[] | undefined = appliedData?.content.filter(
    (item: CalendarData) => item.user.email === userInfo?.email,
  )

  const userfilteredData: CalendarData[] = calendarDates?.filter(
    (item: CalendarData) => item.user.email === userInfo?.email,
  )

  const userApprovedData = userfilteredData?.filter((item) => item.status === '1')

  const userMonthData = userApprovedData?.filter(
    (item) => Number(item.startTime.slice(5, 7)) === date.month,
  )

  return (
    <Box>
      <Grid
        container
        spacing={2}
        mb={6}
        p={2}
        sx={{ border: 1, borderRadius: 2, borderColor: 'rgb(218,220,224)' }}
      >
        <Grid item xs={2}>
          <Box sx={{ fontWeight: 'bold' }} ml={1}>
            일정 정보
          </Box>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            sx={{ borderRight: 1, borderColor: 'divider' }}
          >
            <Tab label="신청한 일정" value="applied" sx={{ fontSize: '16px' }} />
            <Tab label="확정된 일정" value="confirmed" sx={{ fontSize: '16px' }} />
          </Tabs>
        </Grid>
        <Grid item xs={8}>
          {value === 'applied' ? (
            <UserDutyList userMonthData={appliedUserData as any} />
          ) : (
            <div>
              <DateView handleChangeDate={handleChangeDate} />
              <UserDutyList userMonthData={userMonthData} />
            </div>
          )}
        </Grid>
      </Grid>
    </Box>
  )
}

export default MyDutyInfo
