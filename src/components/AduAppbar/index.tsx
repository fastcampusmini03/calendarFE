import { styled } from '@mui/material/styles'

import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import CssBaseline from '@mui/material/CssBaseline'

import Typography from '@mui/material/Typography'

import Styled from '@emotion/styled'
import Box from '@mui/material/Box'

// import { useAuth } from '../../hooks/useAuth'
const drawerWidth = 240

const WrapTypography = Styled.div`
   text-align: start; 
   margin-left: 20px;
`

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

export default function AduAppbar() {
  return (
    <>
      <CssBaseline />
      <Box sx={{ marginTop: '60px' }}>
        <AppBar color="transparent" style={{ color: 'green' }}>
          <WrapTypography>
            <Toolbar>
              <Typography
                variant="h6"
                noWrap
                sx={{ flexGrow: 1 }}
                component="div"
                style={{ color: 'black' }}
              >
                <a href="/" style={{ textDecoration: 'none', color: 'black' }}>
                  Adu Calendar
                </a>
              </Typography>
            </Toolbar>
          </WrapTypography>
        </AppBar>
      </Box>
    </>
  )
}
