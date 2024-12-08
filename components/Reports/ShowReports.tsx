import { View, Text } from 'react-native'
import React from 'react'
import NoReportsScreen from './NoReport'
import UserReport from './UserReport'
const ShowReports = () => {
  const hasreports=false
  if(hasreports){
    return <UserReport/>
  }
  return (
    <View>
     <NoReportsScreen/>
    </View>
  )
}

export default ShowReports