import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

interface DateViewProps {
  handleChangeDate: (year: number, month: number) => void
}

const DateView = ({ handleChangeDate }: DateViewProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker', 'DatePicker', 'DatePicker']}>
        <DatePicker
          onChange={(e: any) => handleChangeDate(e.$y, e.$M)}
          label={'"month" and "year"'}
          views={['month', 'year']}
        />
      </DemoContainer>
    </LocalizationProvider>
  )
}

export default DateView
