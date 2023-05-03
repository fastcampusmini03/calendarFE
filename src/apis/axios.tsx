import axios from 'axios'
import { DatesPayload } from '../types/dates'

export const getDates = async () => {
  const response = await axios.get<DatesPayload[]>('/annualDuty')
  return response.data
}
