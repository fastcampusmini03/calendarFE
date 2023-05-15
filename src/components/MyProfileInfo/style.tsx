import { styled } from '@mui/system'
import { TextField, Box, Button } from '@mui/material'

export const Input = styled(TextField)`
  & input {
    height: 20px;
    padding: 8px;
  }
`

export const ErrorMessage = styled(Box)`
  color: red;
  font-size: 12px;
  height: 12px;
`
export const Btn = styled(Button)`
  font-size: 20px;
  color: #000;
`
