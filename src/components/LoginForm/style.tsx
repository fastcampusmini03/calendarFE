import { styled } from '@mui/system'
import { TextField, Link } from '@mui/material'

// export const Input = styled(TextField)`
//   color: red;
//   &:focus {
//     border-color: #8294c4;
//   }
// `

export const Input = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: '#8294c4', // change border color when focused
    },
  },
})

export const MoveSignup = styled(Link)({
  color: '#8294C4',
  '&:hover': {
    color: '#8294C4', // Replace with your desired hover color
  },
})
