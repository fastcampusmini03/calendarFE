import { useState } from 'react'
import { styled, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import CssBaseline from '@mui/material/CssBaseline'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import { Avatar, Badge, Button } from '@mui/material'
import { MainSignButton } from '../../style/style'
import Styled from '@emotion/styled'
import { getCookie, removeCookie } from '../../utils/cookies'
import { ACCESSTOKEN_KEY } from '../../apis/instance'
import { useQuery, useQueryClient } from 'react-query'
import { verify } from '../../apis/axios'
import { Link, useNavigate } from 'react-router-dom'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import Toast from '../Common/Toast'
// import { useAuth } from '../../hooks/useAuth'
const drawerWidth = 240
const WrapButton = Styled.div`
display: flex;
   justify-content: flex-end;
   margin-right: 20px;
`
const WrapTypography = Styled.div`
   text-align: start; 
   margin-left: 20px;
`
const Wrap = Styled.div`
   /* border: 1px solid #c8c8c8; */
   background-color: #F2F2F2;
   border-radius: 10px;
   padding: 10px 20px;
   margin: 5px;
   display: flex;
  
`
const UserName = Styled.span`
   font-size: 14px;
   margin-left: 10px;
`
const WrapUserName = Styled.div`
    display: flex;
    flex-direction: column;
`
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },

  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginRight: -drawerWidth,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  }),
}))
interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}))
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}))
export default function PersistentDrawerRight({ children }: any) {
  const accessToken = getCookie(ACCESSTOKEN_KEY)
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { data: verifyPayload, status } = useQuery(['verify', accessToken], verify, {
    retry: false,
  })
  // payload타입을 고려하기 아니면 server쪽 응답을 어떻게 보내주는가에 따라 타입이 바뀔 수 있다.axios에서 verify타입 확인
  const handleLogout = () => {
    removeCookie(ACCESSTOKEN_KEY)
    queryClient.invalidateQueries(['auth', 'verify'])
    navigate('/')
  }
  const theme = useTheme()
  const [open, setOpen] = useState(false)
  // const { logoutUser } = useAuth()
  const handleDrawerOpen = () => {
    setOpen(true)
  }
  const handleDrawerClose = () => {
    setOpen(false)
  }
  const [show, setShow] = useState(false)
  const handleClick = () => {
    setShow(true)
  }
  const handleClose = (reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setShow(false)
  }
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} color="transparent" style={{ color: 'green' }}>
        <WrapTypography>
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              sx={{ flexGrow: 1 }}
              component="div"
              style={{ color: 'black' }}
            >
              Adu Calendar
            </Typography>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerOpen}
              sx={{ ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </WrapTypography>
      </AppBar>
      <Main open={open}>
        <DrawerHeader />
        {verifyPayload && status !== 'error' ? ( // 로그인 상태인 경우에만 보이는 버튼들
          <WrapButton>
            <Wrap>
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant="dot"
              >
                <Avatar>
                  <AccountCircleOutlinedIcon fontSize="large" />
                </Avatar>
              </StyledBadge>
              {/* <Button onClick={handleLogout}>
                logout
              </Button> */}
              <WrapUserName>
                <UserName>{verifyPayload?.data.username}</UserName>
                <UserName>{verifyPayload?.data.email}</UserName>
              </WrapUserName>
            </Wrap>
          </WrapButton>
        ) : (
          // 로그인 상태가 아닌 경우에만 보이는 버튼들
          <WrapButton>
            <Button>
              <Link to="/login" style={{ textDecoration: 'none', color: 'white' }}>
                login
              </Link>
            </Button>
            <MainSignButton>
              <Link to="/signup" style={{ textDecoration: 'none' }}>
                singup
              </Link>
            </MainSignButton>
          </WrapButton>
        )}
        {children}
      </Main>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <Link to="/" style={{ textDecoration: 'none', color: 'lightcoral' }}>
            <ListItem key={'홈'} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <CalendarMonthOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary={'홈'} />
              </ListItemButton>
            </ListItem>
          </Link>
          {verifyPayload && status !== 'error' ? (
            <>
              {['Profile', '당직', '연차'].map((text, index) => (
                <Link to="/mypage" style={{ textDecoration: 'none', color: 'gray' }}>
                  <ListItem key={text} disablePadding>
                    <ListItemButton>
                      <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </ListItem>
                </Link>
              ))}
            </>
          ) : (
            <>
              {['Profile', '당직', '연차'].map((text, index) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton onClick={handleClick}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <ListItemText primary={text} />
                    <Toast
                      isOpened={show}
                      message="로그인 후에 시도해 주세요!"
                      handleClose={handleClose}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </>
          )}
        </List>
        <Divider />
        {verifyPayload && status !== 'error' ? (
          <List>
            {['로그아웃'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton onClick={handleLogout}>
                  <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                  <ListItemText primary={text} />
                  {/* <ListItemButton onClick={logoutUser}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton> */}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        ) : null}
      </Drawer>
    </Box>
  )
}