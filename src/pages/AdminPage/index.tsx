import AnnualDutyList from '../../components/AnnualDutyList'
import { useQuery } from 'react-query'
import { getDates } from '../../apis/axios'
import CalendarUI from '../../components/CalendarUI'
import { DatesPayload } from '../../types/dates'
import Grid from '@mui/material/Grid'

function AdminPage() {
  const { data: dates, isLoading } = useQuery<DatesPayload[]>('dates', getDates)
  if (isLoading || dates === undefined) {
    return <div>로딩중...</div>
  }
  return (
    <Grid container spacing={1}>
      <Grid item xs={9}>
        <CalendarUI view={'month'} dates={dates} />
      </Grid>
      <Grid item xs={3}>
        <AnnualDutyList dates={dates} />
      </Grid>
    </Grid>
  )
}

export default AdminPage
