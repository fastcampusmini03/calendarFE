import List from '@mui/material/List'
import { DatesPayload } from '../../types/dates'
import Typography from '@mui/material/Typography'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import { Box, Button } from '@mui/material'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Container from '@mui/material/Container'
import { useState } from 'react'

interface AdminPageProps {
  saveDates: DatesPayload[]
  editDates: DatesPayload[]
  deleteDates: DatesPayload[]
}

function AnnualDutyList({ saveDates, editDates, deleteDates }: AdminPageProps) {
  const [value, setValue] = useState('approve')
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
                          flexDirection: 'column',
                          textAlign: 'center',
                        }}
                      >
                        <Container
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                          }}
                        >
                          <Box>
                            <ListItemText
                              primary={data.username + ' ' + data.role + ' ' + data.prevDate.title}
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
                          <Box>
                            <ListItemText
                              primary={data.username + ' ' + data.role + ' ' + data.title}
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
                        </Container>

                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                          <Button>승인</Button>
                          <Button variant="outlined">거부</Button>
                        </Box>
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
                      flexDirection: 'column',
                      textAlign: 'center',
                    }}
                  >
                    <Container
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                      }}
                    >
                      <Box>
                        <ListItemText
                          primary={data.username + ' ' + data.role + ' ' + data.title}
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
                    </Container>

                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                      <Button>승인</Button>
                      <Button variant="outlined">거부</Button>
                    </Box>
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
                      flexDirection: 'column',
                      textAlign: 'center',
                    }}
                  >
                    <Container
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                      }}
                    >
                      <Box>
                        <ListItemText
                          primary={data.username + ' ' + data.role + ' ' + data.title}
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
                    </Container>

                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                      <Button>승인</Button>
                      <Button variant="outlined">거부</Button>
                    </Box>
                  </ListItem>
                </>
              ))
          }
        })()}
      </List>
    </div>
  )
}

export default AnnualDutyList
