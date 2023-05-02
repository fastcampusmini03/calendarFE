import { Button, createTheme } from "@mui/material"
import { styled } from '@mui/material/styles';

export const theme = createTheme({
    components: {
        MuiCssBaseline: {
            styleOverrides: `@font-face {
                    font-family: 'Pretendard-Regular';
                    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
                    font-weight: 400;
                    font-style: normal;
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
                    backgroundColor: '#c8c8c8',
                    color: '#5c940d',
                    '&:hover': {
                        backgroundColor: '#9E5FFF',
                        color: '#fff',
                    },
                },
                /**
                 * variant text type style
                 */
                text: {
                    backgroundColor: '#2CDFFF',
                    color: '#fff',
                    transition: 'all 0.3s ease',
                    padding: '3px 9px 3px 9px',
                    '&:hover': {
                        backgroundColor: '#08D8C1',
                        color: '#fff',
                        filter: 'brightness(1.2)',
                    },
                    '&:disabled': {
                        color: 'grey',
                        backgroundColor: '#fff'
                    }
                },
            },
        },
    },
})

export const LoginButton = styled(Button)`
    background-color: #c8c8c8;
    width: 200px;
`;

export const LogoutButton = styled(Button)`
    background-color: #c8c8c8;
    width: 200px;
`;

export const MainSignButton = styled(Button)`
    background-color: #fff;
    color: #0F9BF7;
`;