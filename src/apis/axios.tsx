import axios from 'axios'

export const getDates = async () => {
  const response = await axios.get('/annualDuty')
  return response.data
}
