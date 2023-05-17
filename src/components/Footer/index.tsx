import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TwitterIcon from '@mui/icons-material/Twitter'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import { useLocation } from 'react-router-dom'
export default function Footer() {
  const location = useLocation()

  console.log(location.pathname)

  const positionStyle: React.CSSProperties =
    location.pathname === '/login' ||
    location.pathname === '/signup' ||
    location.pathname === '/admin/user'
      ? { position: 'fixed', bottom: 0, width: '100%' }
      : {}
  return (
    <div style={positionStyle}>
      <CssBaseline />
      <div style={{ width: '100%', height: '1px', border: '1px solid black' }} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '200px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '50px',
              margin: '20px 0 ',
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              <a style={{ textDecoration: 'none', color: '#000' }} href="/">
                Home
              </a>
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              ABOUT US
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              CONTACT
            </Typography>
          </Box>

          <Typography variant="h5" sx={{ paddingBottom: '10px' }}>
            BE : 유현주, 김태헌, 류동우, 정재은 FE : 정영찬, 신환수, 이찬영
          </Typography>

          <Typography variant="h5" sx={{ paddingBottom: '10px' }}>
            Copyright @ 2023 AduCalendar All rights reserved
          </Typography>
          <Typography variant="h5" sx={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
            <TwitterIcon />
            <FacebookIcon />
            <InstagramIcon />
          </Typography>
        </Box>
      </Box>
    </div>
  )
}
