import AnnualDutyList from '../../components/AnnualDutyList'
import { useQuery } from 'react-query'
import {  getDeleteDates, getEditDates, getSaveDates } from '../../apis/axios'
import CalendarUI from '../../components/CalendarUI'
import { DatesPayload } from '../../types/dates'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

function AdminPage() {
  const { data: allDates } = useQuery<DatesPayload[]>('dates', getAllDates)
  const { data: saveDates, isLoading } = useQuery<DatesPayload[]>('savedates', getSaveDates)
  const { data: editDates } = useQuery<DatesPayload[]>('editDates', getEditDates)
  const { data: deleteDates } = useQuery<DatesPayload[]>('deleteDates', getDeleteDates)
  if (
    isLoading ||
    allDates === undefined ||
    saveDates === undefined ||
    editDates === undefined ||
    deleteDates === undefined
  ) {
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
          <CalendarUI view={'month'} dates={allDates} />
        </Grid>
        <Grid item xs={4}>
          <AnnualDutyList saveDates={saveDates} editDates={editDates} deleteDates={deleteDates} />
        </Grid>
      </Grid>
    </>
  )
}

export default AdminPage
