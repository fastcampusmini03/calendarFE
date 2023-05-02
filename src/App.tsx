import '@toast-ui/calendar/toastui-calendar.css';
import 'tui-date-picker/dist/tui-date-picker.min.css';
import 'tui-time-picker/dist/tui-time-picker.min.css';
// import './App.css'
import  { CalendarApp } from './components/calendar'
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './style/style';

function App() {


  return (
    <ThemeProvider theme={theme}>
      <CalendarApp view="month"/>
    </ThemeProvider>
  )
}

export default App
