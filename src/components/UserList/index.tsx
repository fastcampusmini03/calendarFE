import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { DatesPayload } from '../../types/dates'
import Stack from '@mui/material/Stack'

import SearchIcon from '@mui/icons-material/Search'
import { ListPaper, Search, SearchIconWrapper, StyledInputBase } from '../../style/style'

interface UserPageProps {
  dates: DatesPayload[]
}

export default function UserList({ dates }: UserPageProps) {
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
          placeholder="사용자 이름을 입력해주세요"
          inputProps={{ 'aria-label': 'search' }}
        />
      </Search>

      <Box sx={{ width: '40%', justifyItems: 'center' }}>
        <Stack spacing={2}>
          {dates.map((date) => (
            <>
              <ListPaper>
                <Typography variant="h5">
                  {date.username} ({date.email})
                </Typography>
              </ListPaper>
            </>
          ))}
        </Stack>
      </Box>
    </div>
  )
}
