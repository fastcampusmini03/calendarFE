// import React from 'react'
import { Alert, Snackbar } from '@mui/material'

interface ToastProps {
  isOpened: boolean
  handleClose: () => void
  message: string
}

const Toast = ({ isOpened, handleClose, message }: ToastProps) => {
  return (
    <Snackbar open={isOpened} autoHideDuration={1500} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  )
}

export default Toast
