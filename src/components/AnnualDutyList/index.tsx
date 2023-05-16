import List from '@mui/material/List'
import { ApproveData, DeleteData, EditData } from '../../types/dates'
import Typography from '@mui/material/Typography'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import { Box, Button, CssBaseline } from '@mui/material'
import Grid from '@mui/material/Grid'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Container from '@mui/material/Container'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import { useEffect, useRef, useState } from 'react'
import Toast from '../Common/Toast'
import { InfiniteData, useMutation, useQueryClient } from 'react-query'
import {
  acceptDelete,
  acceptSave,
  acceptUpdate,
  rejectDelete,
  rejectSave,
  rejectUpdate,
} from '../../apis/axios'

interface AdminPageProps {
  saveDates: InfiniteData<ApproveData>
  editDates: InfiniteData<EditData>
  deleteDates: InfiniteData<DeleteData>
  fetchNextPageSave: () => void
  fetchNextPageEdit: () => void
  fetchNextPageDelete: () => void
  hasNextSavePage: boolean
  hasNextEditPage: boolean
  hasNextDeletePage: boolean
}

type FetchParams = {
  value: string
  fetchNextPage: () => void
}

function AnnualDutyList({
  saveDates,
  editDates,
  deleteDates,
  fetchNextPageSave,
  fetchNextPageDelete,
  fetchNextPageEdit,
  hasNextSavePage,
  hasNextEditPage,
  hasNextDeletePage,
}: AdminPageProps) {
  console.log(saveDates)
  const [value, setValue] = useState('approve')
  const [dataValue, setDataValue] = useState(0)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [refuseOpen, setRefuseOpen] = useState(false)
  const [accToastOpen, setAccToastOpen] = useState(false)
  const [decToastOpen, setDecToastOpen] = useState(false)

  const queryClient = useQueryClient()
  const { mutate: mutateAS } = useMutation(acceptSave, {
    onSuccess: () => {
      queryClient.invalidateQueries('saveDates'), queryClient.invalidateQueries('dates')
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

  /** Dialog  승인 토글 기능 */
  const toggleDialog = (id: number) => () => {
    setDialogOpen((prev) => !prev)
    setDataValue(id)
  }
  /** Dialog  거절 토글 기능 */
  const toggleRefuseDialog = () => {
    setRefuseOpen((prev) => !prev)
  }

  /** 데이터 수정 */
  const acceptDate = (id: number, value: string) => {
    return () => {
      setDialogOpen(false)
      setTimeout(() => {
        setAccToastOpen((prev) => !prev)
      }, 500) // 0.5초 후에 스낵바를 활성화
      console.log(id)
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

  /** IO */
  const useInfiniteScroll = ({ value, fetchNextPage }: FetchParams) => {
    const sentinelRef = useRef(null)

    useEffect(() => {
      if (sentinelRef.current) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              fetchNextPage()
            }
          },
          { root: null, rootMargin: '0px 0px 0px 0px', threshold: 0 }, // 센티널 엘리먼트가 화면에 노출되기 이전에 fetchNextPage()를 호출하도록 rootMargin을 지정합니다.
        )

        observer.observe(sentinelRef.current)

        return () => {
          observer.disconnect()
        }
      }
    }, [value, sentinelRef, fetchNextPage])

    return sentinelRef
  }

  const sentinelRefSave = useInfiniteScroll({ value: 'save', fetchNextPage: fetchNextPageSave })
  const sentinelRefEdit = useInfiniteScroll({ value: 'update', fetchNextPage: fetchNextPageEdit })
  const sentinelRefDelete = useInfiniteScroll({
    value: 'delete',
    fetchNextPage: fetchNextPageDelete,
  })

  return (
    <div>
      <CssBaseline />
      <Box>
        <Typography
          variant="h2"
          color="initial"
          style={{ whiteSpace: 'nowrap', textAlign: 'center' }}
        >
          <span>
            일정 관리
            <a
              style={{
                fontSize: '20px',
                textDecoration: 'none',
                color: '#000',
                marginLeft: '20px',
              }}
              href="/admin/user"
            >
              사용자 관리로 이동
            </a>
          </span>
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
              return (
                <>
                  <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                    <Typography variant="h6">수정 전</Typography>
                    <Typography variant="h6">수정 후</Typography>
                  </Box>

                  <div style={{ overflow: 'auto', height: '700px' }}>
                    {editDates.pages.map((page) =>
                      page.content.map((data) => (
                        <div>
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
                                    justifyContent: 'center',
                                    gap: '60px',
                                  }}
                                >
                                  <Box>
                                    <ListItemText
                                      primary={
                                        <div>
                                          {data.annualDuty.user.username}{' '}
                                          {data.annualDuty.user.role === 'USER' ? '일반' : '관리자'}{' '}
                                          {data.annualDuty.title.length > 10
                                            ? `${data.annualDuty.title.substring(0, 10)}...`
                                            : data.annualDuty.title}
                                        </div>
                                      }
                                    />

                                    <ListItemText
                                      secondary={
                                        <>
                                          <div>
                                            {formatter.format(new Date(data.annualDuty.startTime))}
                                          </div>
                                          <div>{' - '}</div>
                                          <div>
                                            {formatter.format(new Date(data.annualDuty.endTime))}
                                          </div>
                                        </>
                                      }
                                      sx={{ marginTop: '10px' }}
                                    />
                                  </Box>
                                  <Box>
                                    <ListItemText
                                      primary={
                                        <div>
                                          {data.annualDuty.user.username}{' '}
                                          {data.annualDuty.user.role === 'USER' ? '일반' : '관리자'}{' '}
                                          {data.title.length > 10
                                            ? `${data.title.substring(0, 10)}...`
                                            : data.title}
                                        </div>
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
                                  }}
                                >
                                  <Button onClick={toggleDialog(data.id)} sx={{ flex: '1' }}>
                                    승인
                                  </Button>
                                  <Button
                                    variant="outlined"
                                    onClick={toggleRefuseDialog}
                                    sx={{ flex: '1' }}
                                  >
                                    거부
                                  </Button>
                                </Box>
                              </Container>
                            </Grid>
                          </ListItem>
                        </div>
                      )),
                    )}
                    {hasNextEditPage ? (
                      <div ref={sentinelRefEdit}>감지중</div>
                    ) : (
                      <Typography variant="h4" align="center">
                        마지막 페이지입니다
                      </Typography>
                    )}
                  </div>
                  <Dialog open={dialogOpen}>
                    <DialogTitle id="alert-dialog-title">{'권한 변경'}</DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        승인하시겠습니까?
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
                      <Button onClick={acceptDate(dataValue, value)}>예</Button>
                      <Button autoFocus onClick={() => setDialogOpen(false)}>
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
                      <Button onClick={rejectDate(dataValue, value)}>예</Button>
                      <Button autoFocus onClick={toggleRefuseDialog}>
                        아니오
                      </Button>
                    </DialogActions>
                  </Dialog>
                </>
              )

            case 'delete':
              return (
                <>
                  <div style={{ height: '800px', overflow: 'auto' }}>
                    {deleteDates.pages.map((page) =>
                      page.content.map((data) => (
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
                                        <div>
                                          {data.user.username}{' '}
                                          {data.user.role === 'USER' ? '일반' : '관리자'}{' '}
                                          {data.title.length > 10
                                            ? `${data.title.substring(0, 10)}...`
                                            : data.title}
                                        </div>
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
                                  }}
                                >
                                  <Button onClick={toggleDialog(data.id)} sx={{ flex: '1' }}>
                                    승인
                                  </Button>
                                  <Button
                                    variant="outlined"
                                    onClick={toggleRefuseDialog}
                                    sx={{ flex: '1' }}
                                  >
                                    거부
                                  </Button>
                                </Box>
                              </Container>
                            </Grid>
                          </ListItem>
                        </>
                      )),
                    )}
                    {hasNextDeletePage ? (
                      <div ref={sentinelRefDelete}>감지중</div>
                    ) : (
                      <Typography variant="h4" align="center">
                        마지막 페이지입니다
                      </Typography>
                    )}
                  </div>
                  <Dialog open={dialogOpen}>
                    <DialogTitle id="alert-dialog-title">{'권한 변경'}</DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        승인하시겠습니까?
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
                      <Button onClick={acceptDate(dataValue, value)}>예</Button>
                      <Button autoFocus onClick={() => setDialogOpen(false)}>
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
                      <Button onClick={rejectDate(dataValue, value)}>예</Button>
                      <Button autoFocus onClick={toggleRefuseDialog}>
                        아니오
                      </Button>
                    </DialogActions>
                  </Dialog>
                </>
              )

            default:
              return (
                <>
                  <div style={{ height: '800px', overflow: 'auto' }}>
                    {saveDates.pages.map((page) => {
                      return (
                        <div key={new Date().getMilliseconds()}>
                          {page.content.map((data, idx) => (
                            <div key={idx}>
                              <ListItem
                                sx={{
                                  border: '1px solid black',
                                  marginBottom: '2px',
                                  display: 'flex',
                                  flexDirection: 'row',
                                  textAlign: 'center',
                                }}
                              >
                                <Grid xs={1} item>
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
                                <Grid xs={11} item>
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
                                            <div>
                                              {data.user.username}{' '}
                                              {data.user.role === 'USER' ? '일반' : '관리자'}{' '}
                                              {data.title.length > 10
                                                ? `${data.title.substring(0, 10)}...`
                                                : data.title}
                                            </div>
                                          }
                                        />
                                        <ListItemText
                                          secondary={
                                            <>
                                              <div>
                                                {formatter.format(new Date(data.startTime))}
                                              </div>
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
                                      }}
                                    >
                                      <Button onClick={toggleDialog(data.id)} sx={{ flex: '1' }}>
                                        승인
                                      </Button>
                                      <Button
                                        variant="outlined"
                                        onClick={toggleRefuseDialog}
                                        sx={{ flex: '1' }}
                                      >
                                        거부
                                      </Button>
                                    </Box>
                                  </Container>
                                </Grid>
                              </ListItem>
                            </div>
                          ))}
                        </div>
                      )
                    })}
                    {hasNextSavePage ? (
                      <div ref={sentinelRefSave}>감지중</div>
                    ) : (
                      <Typography variant="h4" align="center">
                        마지막 페이지입니다
                      </Typography>
                    )}
                  </div>

                  <Dialog open={dialogOpen}>
                    <DialogTitle id="alert-dialog-title">{'승인 확인'}</DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        승인하시겠습니까?
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
                      <Button onClick={acceptDate(dataValue, value)}>예</Button>
                      <Button autoFocus onClick={() => setDialogOpen(false)}>
                        아니오
                      </Button>
                    </DialogActions>
                  </Dialog>
                  <Dialog open={refuseOpen}>
                    <DialogTitle id="alert-dialog-title">{'거부 확인'}</DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        거부하시겠습니까?
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
                      <Button onClick={rejectDate(dataValue, value)}>예</Button>
                      <Button autoFocus onClick={toggleRefuseDialog}>
                        아니오
                      </Button>
                    </DialogActions>
                  </Dialog>
                </>
              )
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
