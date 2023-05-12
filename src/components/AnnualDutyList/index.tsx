import List from '@mui/material/List'
import { ApproveData, DeleteData, EditData } from '../../types/dates'
import Typography from '@mui/material/Typography'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import { Box, Button } from '@mui/material'
import Grid from '@mui/material/Grid'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Container from '@mui/material/Container'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import { useState } from 'react'
import Toast from '../Common/Toast'
import { useMutation, useQueryClient } from 'react-query'
import {
  acceptDelete,
  acceptSave,
  acceptUpdate,
  rejectDelete,
  rejectSave,
  rejectUpdate,
} from '../../apis/axios'

interface AdminPageProps {
  saveDates: ApproveData
  editDates: EditData
  deleteDates: DeleteData
}

function AnnualDutyList({ saveDates, editDates, deleteDates }: AdminPageProps) {
  const [value, setValue] = useState('approve')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [refuseOpen, setRefuseOpen] = useState(false)
  const [accToastOpen, setAccToastOpen] = useState(false)
  const [decToastOpen, setDecToastOpen] = useState(false)
  const queryClient = useQueryClient()
  const { mutate: mutateAS } = useMutation(acceptSave, {
    onSuccess: () => {
      queryClient.invalidateQueries('dates'), queryClient.invalidateQueries('saveDates')
    },
  })
  const { mutate: mutateRS } = useMutation(rejectSave, {
    onSuccess: () => {
      queryClient.invalidateQueries('dates'), queryClient.invalidateQueries('saveDates')
    },
  })
  const { mutate: mutateAE } = useMutation(acceptUpdate, {
    onSuccess: () => {
      queryClient.invalidateQueries('dates'), queryClient.invalidateQueries('editDates')
    },
  })
  const { mutate: mutateRE } = useMutation(rejectUpdate, {
    onSuccess: () => {
      queryClient.invalidateQueries('dates'), queryClient.invalidateQueries('editDates')
    },
  })
  const { mutate: mutateAD } = useMutation(acceptDelete, {
    onSuccess: () => {
      queryClient.invalidateQueries('dates'), queryClient.invalidateQueries('deleteDates')
    },
  })
  const { mutate: mutateRD } = useMutation(rejectDelete, {
    onSuccess: () => {
      queryClient.invalidateQueries('dates'), queryClient.invalidateQueries('deleteDates')
    },
  })

  const toggleDialog = () => {
    setDialogOpen((prev) => !prev)
  }
  const toggleRefuseDialog = () => {
    setRefuseOpen((prev) => !prev)
  }

  /** 데이터 수정 */
  const acceptDate = (id: number, value: string) => () => {
    setDialogOpen((prev) => !prev)
    setTimeout(() => {
      setAccToastOpen((prev) => !prev)
    }, 500) // 0.5초 후에 스낵바를 활성화

    //TODO value 값에 따라 동작하는 api 메소드를 다르게 설정하여 추가할것 (승인,수정,삭제)
    switch (value) {
      case 'approve':
        mutateAS(id)
        return
      case 'update':
        mutateAE(id)
        return
      case 'delete':
        mutateAD(id)
        return
      default:
        return
    }
  }

  const rejectDate = (id: number, value: string) => () => {
    setRefuseOpen((prev) => !prev)

    setTimeout(() => {
      setDecToastOpen((prev) => !prev)
    }, 500) // 0.5초 후에 스낵바를 활성화
    //TODO value 값에 따라 동작하는 api 메소드를 다르게 설정하여 추가할것(승인, 수정, 삭제)
    switch (value) {
      case 'approve':
        mutateRS(id)
        return
      case 'update':
        mutateRE(id)
        return
      case 'delete':
        mutateRD(id)
        return
      default:
        return
    }
  }
  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }
  const formatter = new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })

  return (
    <div>
      <Box>
        <Typography
          variant="h2"
          color="initial"
          style={{ whiteSpace: 'nowrap', textAlign: 'center' }}
        >
          연차 / 당직 관리
        </Typography>
        <Tabs value={value} onChange={handleChange} variant="fullWidth">
          <Tab label="승인" value="approve" />
          <Tab label="수정" value="update" />
          <Tab label="삭제" value="delete" />
        </Tabs>
      </Box>

      <List>
        {(() => {
          switch (value) {
            case 'update':
              return editDates.content.map((data) => (
                <>
                  <>
                    <Tabs variant="fullWidth">
                      <Tab label="수정 전" />
                      <Tab label="수정 후" />
                    </Tabs>

                    <ListItem
                      sx={{
                        border: '1px solid black',
                        marginBottom: '2px',
                        display: 'flex',
                        flexDirection: 'row',
                        textAlign: 'center',
                      }}
                    >
                      <Grid xs={1}>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '120px',
                            borderRadius: '20px',
                            background: data.annualDuty.type ? '#5c940d' : '#08D8C1',
                          }}
                        >
                          <Typography variant="h6" align="center" color="#FFF">
                            {data.annualDuty.type ? '당직' : '연차'}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid xs={11}>
                        <Container
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                          }}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            }}
                          >
                            <Box>
                              <ListItemText
                                primary={
                                  // data.username +
                                  ' ' +
                                  // data.role +
                                  ' ' +
                                  (data.annualDuty.title.length > 10
                                    ? `${data.annualDuty.title.substring(0, 10)}...`
                                    : data.annualDuty.title)
                                }
                              />

                              <ListItemText
                                secondary={
                                  <>
                                    <div>
                                      {formatter.format(new Date(data.annualDuty.startTime))}
                                    </div>
                                    <div>{' - '}</div>
                                    <div>{formatter.format(new Date(data.annualDuty.endTime))}</div>
                                  </>
                                }
                                sx={{ marginTop: '10px' }}
                              />
                            </Box>
                            <Box sx={{ marginRight: '20px' }}>
                              <ListItemText
                                primary={
                                  // data.username +
                                  ' ' +
                                  // data.role +
                                  ' ' +
                                  (data.title.length > 10
                                    ? `${data.title.substring(0, 10)}...`
                                    : data.title)
                                }
                              />
                              <ListItemText
                                secondary={
                                  <>
                                    <div>{formatter.format(new Date(data.startTime))}</div>
                                    <div>{' - '}</div>
                                    <div>{formatter.format(new Date(data.endTime))}</div>
                                  </>
                                }
                                sx={{ marginTop: '10px' }}
                              />
                            </Box>
                          </Box>

                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'row',
                              gap: '10px',
                              justifyContent: 'center',
                              marginRight: '20px',
                            }}
                          >
                            <Button onClick={toggleDialog}>승인</Button>
                            <Button variant="outlined" onClick={toggleRefuseDialog}>
                              거부
                            </Button>
                          </Box>
                        </Container>
                      </Grid>

                      <Dialog open={dialogOpen}>
                        <DialogTitle id="alert-dialog-title">{'권한 변경'}</DialogTitle>
                        <DialogContent>
                          <DialogContentText id="alert-dialog-description">
                            승인하시겠습니까?
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
                          <Button onClick={acceptDate(data.id, value)}>예</Button>
                          <Button autoFocus onClick={toggleDialog}>
                            아니오
                          </Button>
                        </DialogActions>
                      </Dialog>
                      <Dialog open={refuseOpen}>
                        <DialogTitle id="alert-dialog-title">{'권한 변경'}</DialogTitle>
                        <DialogContent>
                          <DialogContentText id="alert-dialog-description">
                            거부하시겠습니까?
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
                          <Button onClick={rejectDate(data.id, value)}>예</Button>
                          <Button autoFocus onClick={toggleRefuseDialog}>
                            아니오
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </ListItem>
                  </>
                </>
              ))
            case 'delete':
              return deleteDates.content.map((data) => (
                <>
                  <ListItem
                    sx={{
                      border: '1px solid black',
                      marginBottom: '2px',
                      display: 'flex',
                      flexDirection: 'row',
                      textAlign: 'center',
                    }}
                  >
                    <Grid xs={1}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: '120px',
                          borderRadius: '20px',
                          background: data.type ? '#5c940d' : '#08D8C1',
                        }}
                      >
                        <Typography variant="h6" align="center" color="#FFF">
                          {data.type ? '당직' : '연차'}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid xs={11}>
                      <Container
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                          }}
                        >
                          <Box sx={{ marginRight: '20px' }}>
                            <ListItemText
                              primary={
                                data.user.username +
                                ' ' +
                                data.user.role +
                                ' ' +
                                (data.title.length > 10
                                  ? `${data.title.substring(0, 10)}...`
                                  : data.title)
                              }
                            />
                            <ListItemText
                              secondary={
                                <>
                                  <div>{formatter.format(new Date(data.startTime))}</div>
                                  <div>{' - '}</div>
                                  <div>{formatter.format(new Date(data.endTime))}</div>
                                </>
                              }
                              sx={{ marginTop: '10px' }}
                            />
                          </Box>
                        </Box>

                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '10px',
                            justifyContent: 'center',
                            marginRight: '20px',
                          }}
                        >
                          <Button onClick={toggleDialog}>승인</Button>
                          <Button variant="outlined" onClick={toggleRefuseDialog}>
                            거부
                          </Button>
                        </Box>
                      </Container>
                    </Grid>

                    <Dialog open={dialogOpen}>
                      <DialogTitle id="alert-dialog-title">{'권한 변경'}</DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          승인하시겠습니까?
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button onClick={acceptDate(data.id, value)}>예</Button>
                        <Button autoFocus onClick={toggleDialog}>
                          아니오
                        </Button>
                      </DialogActions>
                    </Dialog>
                    <Dialog open={refuseOpen}>
                      <DialogTitle id="alert-dialog-title">{'권한 변경'}</DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          거부하시겠습니까?
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button onClick={rejectDate(data.id, value)}>예</Button>
                        <Button autoFocus onClick={toggleRefuseDialog}>
                          아니오
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </ListItem>
                </>
              ))
            default:
              return saveDates.content.map((data) => (
                <>
                  <ListItem
                    sx={{
                      border: '1px solid black',
                      marginBottom: '2px',
                      display: 'flex',
                      flexDirection: 'row',
                      textAlign: 'center',
                    }}
                  >
                    <Grid xs={1}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: '120px',
                          borderRadius: '20px',
                          background: data.type ? '#5c940d' : '#08D8C1',
                        }}
                      >
                        <Typography variant="h6" align="center" color="#FFF">
                          {data.type ? '당직' : '연차'}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid xs={11}>
                      <Container
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                          }}
                        >
                          <Box sx={{ marginRight: '20px' }}>
                            <ListItemText
                              primary={
                                data.user.username +
                                ' ' +
                                data.user.role +
                                ' ' +
                                (data.title.length > 10
                                  ? `${data.title.substring(0, 10)}...`
                                  : data.title)
                              }
                            />
                            <ListItemText
                              secondary={
                                <>
                                  <div>{formatter.format(new Date(data.startTime))}</div>
                                  <div>{' - '}</div>
                                  <div>{formatter.format(new Date(data.endTime))}</div>
                                </>
                              }
                              sx={{ marginTop: '10px' }}
                            />
                          </Box>
                        </Box>

                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '10px',
                            justifyContent: 'center',
                            marginRight: '20px',
                          }}
                        >
                          <Button onClick={toggleDialog}>승인</Button>
                          <Button variant="outlined" onClick={toggleRefuseDialog}>
                            거부
                          </Button>
                        </Box>
                      </Container>
                    </Grid>

                    <Dialog open={dialogOpen}>
                      <DialogTitle id="alert-dialog-title">{'권한 변경'}</DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          승인하시겠습니까?
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button onClick={acceptDate(data.id, value)}>예</Button>
                        <Button autoFocus onClick={toggleDialog}>
                          아니오
                        </Button>
                      </DialogActions>
                    </Dialog>
                    <Dialog open={refuseOpen}>
                      <DialogTitle id="alert-dialog-title">{'권한 변경'}</DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          거부하시겠습니까?
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button onClick={rejectDate(data.id, value)}>예</Button>
                        <Button autoFocus onClick={toggleRefuseDialog}>
                          아니오
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </ListItem>
                </>
              ))
          }
        })()}
      </List>
      <Toast
        isOpened={accToastOpen}
        handleClose={() => setAccToastOpen(false)}
        message={`승인되었습니다!`}
      />
      <Toast
        isOpened={decToastOpen}
        handleClose={() => setDecToastOpen(false)}
        message={`거부되었습니다!`}
      />
    </div>
  )
}

export default AnnualDutyList
