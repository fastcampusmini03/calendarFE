import List from '@mui/material/List'
import { DatesPayload } from '../../types/dates'
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
import { justifyContent } from 'styled-system'
import Toast from '../Common/Toast'

interface AdminPageProps {
  saveDates: DatesPayload[]
  editDates: DatesPayload[]
  deleteDates: DatesPayload[]
}

function AnnualDutyList({ saveDates, editDates, deleteDates }: AdminPageProps) {
  const [value, setValue] = useState('approve')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [refuseOpen, setRefuseOpen] = useState(false)
  const [accToastOpen, setAccToastOpen] = useState(false)
  const [decToastOpen, setDecToastOpen] = useState(false)
  const toggleDialog = () => {
    setDialogOpen((prev) => !prev)
  }
  const toggleRefuseDialog = () => {
    setRefuseOpen((prev) => !prev)
  }

  const approveDate = () => {
    setDialogOpen((prev) => !prev)
    setTimeout(() => {
      setAccToastOpen((prev) => !prev)
    }, 500) // 0.5초 후에 스낵바를 활성화

    //TODO value 값에 따라 동작하는 api 메소드를 다르게 설정하여 추가할것 (승인,수정,삭제)
  }

  const declineDate = () => {
    setRefuseOpen((prev) => !prev)

    setTimeout(() => {
      setDecToastOpen((prev) => !prev)
    }, 500) // 0.5초 후에 스낵바를 활성화
    //TODO value 값에 따라 동작하는 api 메소드를 다르게 설정하여 추가할것(승인, 수정, 삭제)
  }
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
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
          <Tab label="수정" value="edit" />
          <Tab label="삭제" value="delete" />
        </Tabs>
      </Box>

      <List>
        {(() => {
          switch (value) {
            case 'edit':
              return editDates.map((data) => (
                <>
                  {data.prevDate && (
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
                              background: data.isAllday ? '#5c940d' : '#08D8C1',
                            }}
                          >
                            <Typography variant="h6" align="center" color="#FFF">
                              {data.isAllday ? '당직' : '연차'}
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
                                    data.username +
                                    ' ' +
                                    data.role +
                                    ' ' +
                                    (data.prevDate.title.length > 10
                                      ? `${data.prevDate.title.substring(0, 10)}...`
                                      : data.prevDate.title)
                                  }
                                />

                                <ListItemText
                                  secondary={
                                    <>
                                      <div>{formatter.format(new Date(data.prevDate.start))}</div>
                                      <div>{' - '}</div>
                                      <div>{formatter.format(new Date(data.prevDate.end))}</div>
                                    </>
                                  }
                                  sx={{ marginTop: '10px' }}
                                />
                              </Box>
                              <Box sx={{ marginRight: '20px' }}>
                                <ListItemText
                                  primary={
                                    data.username +
                                    ' ' +
                                    data.role +
                                    ' ' +
                                    (data.title.length > 10
                                      ? `${data.title.substring(0, 10)}...`
                                      : data.title)
                                  }
                                />
                                <ListItemText
                                  secondary={
                                    <>
                                      <div>{formatter.format(new Date(data.start))}</div>
                                      <div>{' - '}</div>
                                      <div>{formatter.format(new Date(data.end))}</div>
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
                            <Button onClick={approveDate}>예</Button>
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
                            <Button onClick={declineDate}>예</Button>
                            <Button autoFocus onClick={toggleRefuseDialog}>
                              아니오
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </ListItem>
                    </>
                  )}
                </>
              ))
            case 'delete':
              return deleteDates.map((data) => (
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
                          background: data.isAllday ? '#5c940d' : '#08D8C1',
                        }}
                      >
                        <Typography variant="h6" align="center" color="#FFF">
                          {data.isAllday ? '당직' : '연차'}
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
                                data.username +
                                ' ' +
                                data.role +
                                ' ' +
                                (data.title.length > 10
                                  ? `${data.title.substring(0, 10)}...`
                                  : data.title)
                              }
                            />
                            <ListItemText
                              secondary={
                                <>
                                  <div>{formatter.format(new Date(data.start))}</div>
                                  <div>{' - '}</div>
                                  <div>{formatter.format(new Date(data.end))}</div>
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
                        <Button onClick={approveDate}>예</Button>
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
                        <Button onClick={declineDate}>예</Button>
                        <Button autoFocus onClick={toggleRefuseDialog}>
                          아니오
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </ListItem>
                </>
              ))
            default:
              return saveDates.map((data) => (
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
                          background: data.isAllday ? '#5c940d' : '#08D8C1',
                        }}
                      >
                        <Typography variant="h6" align="center" color="#FFF">
                          {data.isAllday ? '당직' : '연차'}
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
                                data.username +
                                ' ' +
                                data.role +
                                ' ' +
                                (data.title.length > 10
                                  ? `${data.title.substring(0, 10)}...`
                                  : data.title)
                              }
                            />
                            <ListItemText
                              secondary={
                                <>
                                  <div>{formatter.format(new Date(data.start))}</div>
                                  <div>{' - '}</div>
                                  <div>{formatter.format(new Date(data.end))}</div>
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
                        <Button onClick={approveDate}>예</Button>
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
                        <Button onClick={declineDate}>예</Button>
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
