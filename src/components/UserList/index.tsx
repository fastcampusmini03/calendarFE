import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import SearchIcon from '@mui/icons-material/Search'
import { ListPaper, Search, SearchIconWrapper, StyledInputBase } from '../../style/style'
import Popover from '@mui/material/Popover'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import { useCallback, useEffect, useRef, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import Toast from '../Common/Toast'
import { User, UserData } from '../../types/user'
import { updateRole } from '../../apis/axios'
import { InfiniteData, useMutation, useQueryClient } from 'react-query'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import { debounce } from 'lodash'
interface UserPageProps {
  users: InfiniteData<UserData>
  fetchNextUser: () => void
  hasNextUserPage: boolean
}

type FetchParmas = {
  fetchNextPage: () => void
}

export default function UserList({ users, fetchNextUser, hasNextUserPage }: UserPageProps) {
  /** 검색 결과 state */
  const [searchResult, setSearchResult] = useState('')

  /** toast 컴포넌트 팝업 토글 */
  const [toastToggle, setToastToggle] = useState(false)
  const [roleToggle, setRoleToggle] = useState(false)

  /** input에 입력된 값에 따라  해당 유저의 이름과 일치하는 유저 리스트 데이터를 설정*/
  const handleInputChange = useCallback(
    debounce((event: React.ChangeEvent<HTMLInputElement>) => {
      const input = event.target.value
      setSearchResult(input)
    }, 500),
    [],
  )

  /** popper 생성 위치 기준점 state */
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  /** api수정 메소드 요청에 필요한 요청 데이터 state */
  const [value, setValue] = useState<string>('')
  const [userdata, setUserData] = useState<User | null>(null)

  /** dialog 팝업 토글 */
  const [dialogOpen, setDialogOpen] = useState(false)

  /** 권한 변경 mutate */
  const queryClient = useQueryClient()
  const { mutate: mutateUR } = useMutation(
    (params: { email: string; role: string }) => updateRole(params.email, params.role),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('users', { exact: true }).then(() => {
          queryClient.refetchQueries('users', { exact: true }).then(() => {
            setAnchorEl(null)
          })
        })
      },
    },
  )

  /**클릭시 팝업위치와 선택된 유저 정보를 바탕으로 정보수정을 요청하는 메소드*/
  const editRole = (email: string, role: string) => () => {
    setDialogOpen((prev) => !prev)
    setTimeout(() => {
      setToastToggle((prev) => !prev)
    }, 500) // 0.5초 후에 스낵바를 활성화

    //TODO 여기에 수정을 요청하는 메소드를 집어넣을것
    mutateUR({ email, role })
  }
  /**클릭시 팝업위치를 변경해서 popper를 나타나게 하는 메소드*/
  const popupToggle = (event: React.MouseEvent<HTMLDivElement>, data: User) => {
    setAnchorEl(event.currentTarget)
    setUserData(data)
  }
  /** 사용자가 radioGroup 중 하나를 선택해서  selectedUser가 있을때만 토글하는 메소드*/
  const dialogToggle = () => {
    if (value === '') {
      setTimeout(() => {
        setRoleToggle((prev) => !prev)
      }, 500) // 0.5초 후에 스낵바를 활성화
      return
    } else {
      setDialogOpen((prev) => !prev)
    }
  }
  /**  선택항 리스트의 user를 setState 하고 유저의 role 정보만 수정하여 저장하는 메소드 */
  const editUserRole = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }
  /** 팝업을 종료했을때 팝업 위치와 selectedUser데이터를 초기화 */
  const handleClose = () => {
    setAnchorEl(null)
    setValue('')
  }
  // 리스트를 클릭했을 때에만 팝업이 나타나게 설정
  const open = Boolean(anchorEl)

  /** IO */
  const useInfiniteScroll = ({ fetchNextPage }: FetchParmas) => {
    const sentinelRef = useRef(null)

    useEffect(() => {
      if (sentinelRef.current) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              console.log(users)
              fetchNextPage()
              console.log(users)
            }
          },
          { root: null, rootMargin: '0px 0px 10px 0px', threshold: 1 }, // 센티널 엘리먼트가 화면에 노출되기 이전에 fetchNextPage()를 호출하도록 rootMargin을 지정합니다.
        )

        observer.observe(sentinelRef.current)

        return () => {
          observer.disconnect()
        }
      }
    }, [sentinelRef, fetchNextPage])

    return sentinelRef
  }

  const sentinelRefUser = useInfiniteScroll({ fetchNextPage: fetchNextUser })

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <CssBaseline />
      <Typography
        variant="h2"
        color="initial"
        style={{ whiteSpace: 'nowrap', textAlign: 'center' }}
      >
        <span style={{ textAlign: 'center', marginLeft: '100px' }}>
          사용자 관리{' '}
          <a
            style={{
              fontSize: '20px',
              textDecoration: 'none',
              color: '#000',
            }}
            href="/admin"
          >
            일정 관리로 이동
          </a>
        </span>
      </Typography>
      <Container
        maxWidth="md"
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          border: '2px solid black',
          height: '90%',
          paddingTop: '20px',
        }}
      >
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            onChange={handleInputChange}
            placeholder="사용자 이름을 입력해주세요"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>

        <Box sx={{ width: '80%', justifyItems: 'center' }}>
          <Stack spacing={2}>
            {searchResult === '' ? (
              <>
                {users.pages.map((page) =>
                  page.content.map((data) => (
                    <div key={data.id}>
                      <ListPaper onClick={(event) => popupToggle(event, data)}>
                        <Typography variant="h5">
                          {data.username} ({data.email}) {data.role === 'USER' ? '일반' : '관리자'}
                        </Typography>
                      </ListPaper>
                    </div>
                  )),
                )}

                {hasNextUserPage ? (
                  <div ref={sentinelRefUser} style={{ textAlign: 'center' }}>
                    더 보시려먼 스크롤 해주세요!
                  </div>
                ) : (
                  <Typography variant="h4" align="center">
                    마지막 페이지입니다
                  </Typography>
                )}
              </>
            ) : (
              users.pages.map((page) =>
                page.content
                  .filter((data) => data.username.includes(searchResult))
                  .map((data) => (
                    <div key={data.id}>
                      <ListPaper onClick={(event) => popupToggle(event, data)}>
                        <Typography variant="h5">
                          {data.username} ({data.email}) {data.role === 'USER' ? '일반' : '관리자'}
                        </Typography>
                      </ListPaper>
                    </div>
                  )),
              )
            )}
            <Popover
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'center',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              <Box sx={{ padding: '10px' }}>
                <Typography variant="h6">권한을 선택하세요</Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <RadioGroup value={value} onChange={editUserRole}>
                    <FormControlLabel value="USER" control={<Radio />} label="일반" />
                    <FormControlLabel value="ADMIN" control={<Radio />} label="관리자" />
                  </RadioGroup>
                  <Button onClick={dialogToggle}>변경</Button>
                </Box>
              </Box>
            </Popover>
            <Dialog open={dialogOpen}>
              <DialogTitle id="alert-dialog-title">{'권한 변경'}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  '{userdata?.username}'의 권한을 {value === 'USER' ? '일반' : '관리자'}
                  (으)로 변경하시겠습니까?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={editRole(userdata?.email || '', value)}>예</Button>
                <Button onClick={() => setDialogOpen(false)} autoFocus>
                  아니오
                </Button>
              </DialogActions>
            </Dialog>
          </Stack>
        </Box>
        {/*권한 변경 confirm시 나타나는 Toast*/}
        <Toast
          isOpened={toastToggle}
          handleClose={() => setToastToggle(false)}
          message={'권한변경 완료!'}
        />
        <Toast
          isOpened={roleToggle}
          message="권한을 선택해주세요!"
          handleClose={() => setRoleToggle(false)}
        />
      </Container>
    </div>
  )
}
