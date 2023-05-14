import React, { useState } from 'react'
import { Box, Tab, Tabs } from '@mui/material'
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
  const [date, setDate] = useState({ year: 2023, month: 5 })

  const handleChangeDate = (year: number, month: number) => {
    setDate({
      year,
      month: month + 1,
    })
  }

  const [value, setValue] = useState('applied')
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    console.log(event)
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
    <>
      <Box display="flex" alignItems="center" borderBottom={1} pb={1}>
        <Box sx={{ fontWeight: 'bold' }} ml={1}>
          신척내역
        </Box>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="신청한 일정" value="applied" sx={{ fontSize: '16px' }} />
          <Tab label="승인된 일정" value="confirmed" sx={{ fontSize: '16px' }} />
        </Tabs>
        <Box ml={2} flex={1}>
          {value === 'confirmed' && <DateView handleChangeDate={handleChangeDate} />}
        </Box>
      </Box>
      <Box display="flex" p={2} sx={{ borderBottom: '1px solid #808080' }}>
        <Box flex={1} textAlign="center">
          종류
        </Box>
        <Box flex={3} textAlign="center">
          신청 제목
        </Box>
        <Box flex={4} textAlign="center">
          일정 날짜
        </Box>
      </Box>
      <Box>
        {value === 'applied' ? (
          <UserDutyList userMonthData={appliedUserData as any} />
        ) : (
          <UserDutyList userMonthData={userMonthData} />
        )}
      </Box>
    </>
  )
}

export default MyDutyInfo
