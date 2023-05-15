import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TwitterIcon from '@mui/icons-material/Twitter'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
export default function Footer() {
  return (
    <>
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
            <Typography variant="h4">
              <a style={{ textDecoration: 'none', color: '#000' }} href="/">
                Home
              </a>
            </Typography>
            <Typography variant="h4">ABOUT US</Typography>
            <Typography variant="h4">CONTACT</Typography>
          </Box>

          <Typography variant="h4" sx={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
            <TwitterIcon />
            <FacebookIcon />
            <InstagramIcon />
          </Typography>
          <Typography variant="h6">Copyright @ 2023 AduCalendar All rights reserved</Typography>
        </Box>
        <Box>
          <Typography variant="h6">BE : 유현주, 김태헌, 류동우, 정재은</Typography>
          <Typography variant="h6">FE : 정영찬, 신환수, 이찬영</Typography>
        </Box>
      </Box>
    </>
  )
}
