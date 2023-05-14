import { Box } from '@mui/material'
import { CalendarData } from '../../types/dates'

interface UserDutyListProps {
  userMonthData: CalendarData[]
}

const UserDutyList = ({ userMonthData }: UserDutyListProps) => {
  console.log({ userMonthData })
  return (
    <Box>
      {userMonthData?.map((item) => (
        <Box key={item.id} sx={{ display: 'flex', borderColor: '#808080' }} p={2} borderBottom={1}>
          <Box flex={1} textAlign="center">
            {item.type ? '당직' : '연차'}
          </Box>
          <Box flex={3} textAlign="center">
            {item.title}
          </Box>
          <Box flex={4} textAlign="center">
            {item.startTime.split('T')[0]} - {item.endTime.split('T')[0]}
          </Box>
        </Box>
      ))}
    </Box>
  )
}

export default UserDutyList
