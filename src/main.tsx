import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import '@toast-ui/calendar/toastui-calendar.css'
import 'tui-date-picker/dist/tui-date-picker.min.css'
import 'tui-time-picker/dist/tui-time-picker.min.css'
import { worker } from './mocks/worker'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './style/style';
import './App.css'

if (process.env.NODE_ENV === 'development') {
  worker.start()
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {},
  },
})
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ThemeProvider>
  </QueryClientProvider>,
)
