import React, { useState } from 'react'
import PersistentDrawerRight from '../../components/Header'

import MyprofileInfo from '../../components/MyProfileInfo'

import { Box, Tabs, Tab } from '@mui/material'
import MyDutyInfo from '../../components/MyDutyInfo'

const MyPage = () => {
  // console.log({ userInfo })

  // if (!userInfo) {
  //   return <div>Loading...</div>
  // }

  const [value, setValue] = useState('personalInfo')

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    console.log(event)
    setValue(newValue)
  }

  return (
    <>
      <PersistentDrawerRight>
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ borderRight: '1px solid #808080', width: '15%', height: '100vh' }}>
            <Tabs orientation="vertical" value={value} onChange={handleChange}>
              <Tab label="개인정보 수정" value="personalInfo" sx={{ fontSize: '20px' }} />
              <Tab label="신청 내역 확인" value="dutyInfo" sx={{ fontSize: '20px' }} />
            </Tabs>
          </Box>
          <Box ml={10} mt={3} sx={{ width: '60%' }}>
            {value === 'personalInfo' ? <MyprofileInfo /> : <MyDutyInfo />}
          </Box>
        </Box>
      </PersistentDrawerRight>
    </>
  )
}

export default MyPage
