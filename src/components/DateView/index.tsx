import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

const DateView = ({ handleChangeDate, setDate }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker', 'DatePicker', 'DatePicker']}>
        <DatePicker
          onChange={(e) => handleChangeDate(e.$y, e.$M)}
          label={'"month" and "year"'}
          views={['month', 'year']}
        />
      </DemoContainer>
    </LocalizationProvider>
  )
}

export default DateView
