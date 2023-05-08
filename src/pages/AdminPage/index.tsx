import AnnualDutyList from '../../components/AnnualDutyList'
import { useQuery } from 'react-query'
import { getDates } from '../../apis/axios'
import CalendarUI from '../../components/CalendarUI'
import { DatesPayload } from '../../types/dates'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

function AdminPage() {
  //4, 5, 6      // 5, 6, 7
  const { data: dates, isLoading } = useQuery<DatesPayload[]>('dates', getDates)
  if (isLoading || dates === undefined) {
    return <div>로딩중...</div>
  }
  return (
    <>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        gap="10px"
        marginBottom="10px"
      >
        <Button>연차/당직</Button>
        <Button href="/admin/user">사용자 관리</Button>
      </Box>
      <Grid container spacing={1}>
        <Grid item xs={8}>
          <CalendarUI view={'month'} dates={dates} />
        </Grid>
        <Grid item xs={4}>
          <AnnualDutyList dates={dates} />
        </Grid>
      </Grid>
    </>
  )
}

export default AdminPage
