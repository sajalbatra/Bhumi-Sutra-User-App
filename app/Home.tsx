import { View, Text } from 'react-native'
import React from 'react'
import HomeScreen from '@/components/Home/HomeScreen'
import MapViewScreen from '@/components/Home/MapViewScreen'
import ReportSubmission from '@/components/Reports/ReportSubmission'
import UserReport from '@/components/Reports/UserReport'
import NoReportsScreen from '@/components/Reports/NoReport'
import ProfileSettingsScreen from '@/components/Profile/UserProfile'
import FeedbackRatingsScreen from '@/components/Profile/GiveFeedback'
import HelpScreen from '@/components/Profile/HelpScreen'
import CommunityUpdatesScreen from '@/components/Reports/CommunityUpdates'
const Home = () => {
  return (
    <View>
      <CommunityUpdatesScreen/>
    </View>
  )
}

export default Home

