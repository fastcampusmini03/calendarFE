import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { DatesPayload, UsersPayload } from '../../types/dates'
import Stack from '@mui/material/Stack'

import SearchIcon from '@mui/icons-material/Search'
import { ListPaper, Search, SearchIconWrapper, StyledInputBase } from '../../style/style'
import Popover from '@mui/material/Popover'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import Toast from '../Common/Toast'
import { User, UserData } from '../../types/user'
import { updateRole } from '../../apis/axios'
import { useMutation } from 'react-query'

interface UserPageProps {
  users: UserData
}

export default function UserList({ users }: UserPageProps) {
  /** 검색 결과 state */
  const [searchResult, setSearchResult] = useState<User[]>(users.content)

  /** toast 컴포넌트 팝업 토글 */
  const [toastToggle, setToastToggle] = useState(false)

  /** input에 입력된 값에 따라  해당 유저의 이름과 일치하는 유저 리스트 데이터를 설정*/
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value
    if (input === '') {
      setSearchResult(users.content)
    } else {
      setSearchResult(users.content.filter((data) => data.username === input))
    }
  }

  /** popper 생성 위치 기준점 state */
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  /** api수정 메소드 요청에 필요한 요청 데이터 state */
  const [value, setValue] = useState<string>('')

  /** dialog 팝업 토글 */
  const [dialogOpen, setDialogOpen] = useState(false)

  /** 권한 변경 mutate */
  const { mutate: mutateUR } = useMutation((params: { email: string; role: string }) =>
    updateRole(params.email, params.role),
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
  const popupToggle = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget)
  }
  /** 사용자가 radioGroup 중 하나를 선택해서  selectedUser가 있을때만 토글하는 메소드*/
  const dialogToggle = () => {
    if (value === '') {
      alert('please select role')
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

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box display="flex" flexDirection="row" alignItems="center" gap="10px">
        <Button href="/admin">연차/당직</Button>
        <Button>사용자 관리</Button>
      </Box>
      <Typography variant="h2" color="initial" align="center">
        사용자 관리
      </Typography>
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

      <Box sx={{ width: '40%', justifyItems: 'center' }}>
        <Stack spacing={2}>
          {searchResult.map((data) => (
            <div key={data.id}>
              <ListPaper onClick={(event) => popupToggle(event)}>
                <Typography variant="h5">
                  {data.username} ({data.email})
                </Typography>
              </ListPaper>
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
                    sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
                  >
                    <RadioGroup value={value} onChange={editUserRole}>
                      <FormControlLabel value="USER" control={<Radio />} label="일반" />
                      <FormControlLabel value="ADMIN" control={<Radio />} label="관리자" />
                    </RadioGroup>
                    <Button onClick={dialogToggle}>변경</Button>
                    <Dialog open={dialogOpen}>
                      <DialogTitle id="alert-dialog-title">{'권한 변경'}</DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          '{data.username}'의 권한을 {value === 'USER' ? '일반' : '관리자'}(으)로
                          변경하시겠습니까?
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={editRole(data.email, value)}>예</Button>
                        <Button onClick={dialogToggle} autoFocus>
                          아니오
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </Box>
                </Box>
              </Popover>
            </div>
          ))}
        </Stack>
      </Box>
      {/*권한 변경 confirm시 나타나는 Toast*/}
      <Toast
        isOpened={toastToggle}
        handleClose={() => setToastToggle(false)}
        message={'권한변경 완료!'}
      />
    </div>
  )
}
