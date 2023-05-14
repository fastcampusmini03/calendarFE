import { Button, Paper, createTheme } from '@mui/material'
import InputBase from '@mui/material/InputBase'
import { styled, alpha } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#8294C4',
    },
    background: {
      default: '#DBDFEA',
    },
  },
  typography: {
    fontFamily: ['Gmarket Sans', 'Comfortaa'].join(','),
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `@font-face {
                    font-family: 'Gmarket Sans';
                    src: url('/fonts/GmarketSansTTFLight.ttf') format('truetype');
                    font-weight: 300;
                    font-style: normal;
                }
                @font-face {
                    font-family: 'Comfortaa';
                    src: url('/fonts/Comfortaa-Medium.ttf') format('truetype');
                }`,
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          textTransform: 'none',
        },
        /**
         * variant outlined type style
         */
        outlined: {
          backgroundColor: '#DBDFEA',
          border: 'none',
          color: 'red',
          '&:hover': {
            border: 'none',
            backgroundColor: 'red',
            color: '#fff',
          },
        },
        /**
         * variant text type style
         */
        text: {
          backgroundColor: '#DBDFEA',
          color: 'blue',
          transition: 'all 0.3s ease',
          padding: '3px 9px 3px 9px',

          '&:hover': {
            backgroundColor: 'blue',
            color: '#fff',
            filter: 'brightness(1.2)',
          },
          '&:disabled': {
            color: 'grey',
            backgroundColor: '#fff',
          },

          mypage: {
            color: '#000',
            transition: 'all 0.3s ease',
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontSize: '20px',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: ['Gmarket Sans', 'Comfortaa'].join(','),
        },
      },
    },
  },
})

export const LoginButton = styled(Button)`
  background-color: #c8c8c8;
  width: 200px;
`

export const MainLogoutButton = styled(Button)`
  background-color: #c8c8c8;
  width: 200px;
`

export const MainSignButton = styled(Button)`
  background-color: #fff;
  color: #0f9bf7;
`

export const ListPaper = styled(Paper)`
  background-color: '#fff';
  padding: theme.spacing(1);
  text-align: center;
  color: gray;
  transition: background-color 0.5s ease;

  &:hover {
    background-color: #1a2027;
    color: #fff;
  }
`
export const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

export const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha('#234234', 0.8),
  transition: 'all 0.5s ease',
  color: '#fff',
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
    color: alpha('#234234', 0.8),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  marginBottom: theme.spacing(2),
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: '80%',
  },
}))

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '40ch',
    },
  },
}))
