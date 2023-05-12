import { Box } from '@mui/material'
import { CalendarData } from '../../types/dates'

interface UserDutyListProps {
  userMonthData: CalendarData[]
}

const UserDutyList = ({ userMonthData }: UserDutyListProps) => {
  console.log('month', userMonthData)

  return (
    <div>
      {userMonthData?.map((item) => (
        <Box key={item.id} sx={{ display: 'flex' }} p={1}>
          <Box p={1}>{item.type ? '당직' : '연차'}</Box>
          <Box p={1}>{item.title}</Box>
          <Box p={1}>{item.startTime}</Box>
          <Box p={1}>{item.endTime}</Box>
        </Box>
      ))}
    </div>
  )
}

export default UserDutyList
