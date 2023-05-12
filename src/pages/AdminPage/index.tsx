import AnnualDutyList from '../../components/AnnualDutyList'
import { useQuery, useQueryClient } from 'react-query'
import { getCalendarDates, getDeleteDates, getEditDates, getSaveDates } from '../../apis/axios'
import CalendarUI from '../../components/CalendarUI'
import { ApproveData, CalendarData, DeleteData, EditData } from '../../types/dates'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import FaceIcon from '@mui/icons-material/Face'
import { removeCookie } from '../../utils/cookies'
import { ACCESSTOKEN_KEY } from '../../apis/instance'
import { useNavigate } from 'react-router-dom'
// import { useState, useEffect } from 'react'

function AdminPage() {
  const { data: calendarDates } = useQuery<CalendarData[]>('dates', getCalendarDates)
  const { data: saveDates, isLoading } = useQuery<ApproveData>('saveDates', getSaveDates)
  const { data: editDates } = useQuery<EditData>('editDates', getEditDates)
  const { data: deleteDates } = useQuery<DeleteData>('deleteDates', getDeleteDates)
  // const [created, setCreated] = useState<[]>([])
  // const [updated, setUpdated] = useState<[]>([])
  // const [deleted, setDeleted] = useState<[]>([])

  // useEffect(() => {
  //   console.log('=============created===================')
  //   console.log(created)

  //   console.log('=============updated===================')
  //   console.log(updated)

  //   console.log('=============deleted===================')
  //   console.log(deleted)
  // }, [created, updated, deleted])
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
        justifyContent="space-between"
        gap="10px"
        marginBottom="10px"
      >
        <Box display="flex" gap="10px">
          <Button>연차/당직</Button>
          <Button href="/admin/user">사용자 관리</Button>
        </Box>

        <Box display="flex" gap="10px">
          <Button variant="outlined" onClick={handleLogout}>
            로그아웃
          </Button>
          <Chip icon={<FaceIcon />} label="Admin" variant="outlined" />
        </Box>
      </Box>
      <Grid container spacing={1}>
        <Grid item xs={8}>
          <CalendarUI
            view={'month'}
            dates={calendarDates}
            // setCreated={setCreated}
            // setUpdated={setUpdated}
            // setDeleted={setDeleted}
          />
        </Grid>
        <Grid item xs={4}>
          <AnnualDutyList saveDates={saveDates} editDates={editDates} deleteDates={deleteDates} />
        </Grid>
      </Grid>
    </>
  )
}

export default AdminPage
