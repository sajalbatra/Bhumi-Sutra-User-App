import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
// Import all your screen components
import LoginScreen from '@/components/login/Login';
import SignUpScreen from '@/components/login/Register';
import HomeScreen from '@/components/Home/HomeScreen';
import ReportSubmission from '@/components/Reports/ReportSubmission';
import ShowReports from '@/components/Reports/ShowReports';
import ProfileSettingsScreen from '@/components/Profile/UserProfile';
import FeedbackRatingsScreen from '@/components/Profile/GiveFeedback';
import HelpScreen from '@/components/Profile/HelpScreen';
import CommunityUpdatesScreen from '@/components/Reports/CommunityUpdates';
import EngageLandingScreen from '@/components/LandingScreens/EngageLandingScreen';
import GetStartedLandingScreen from '@/components/LandingScreens/GetStarted';
import ReportLandingScreen from '@/components/LandingScreens/ReportLandingScreen';
import SecureBlockchainLandingScreen from '@/components/LandingScreens/SecureBlockChain';
import TrackLandingScreen from '@/components/LandingScreens/TrackLandingScreen';
import LandingScreen from '@/components/LandingScreens/LandingScreen';
import { Ionicons } from '@expo/vector-icons';
import MapViewScreen from '@/components/Home/MapViewScreen';
import { RecoilRoot, useRecoilState } from 'recoil';

import useratom from '@/recoil/atoms/loginatom';
import { useRecoilValue } from 'recoil';

const Stack = createNativeStackNavigator<any>();
const Tab = createBottomTabNavigator<any>();


const TabFlow = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarStyle: {
        backgroundColor: '#030712',
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
        height: 60,
        paddingBottom: 5,
        paddingTop: 5,
      },
      tabBarLabelStyle: {
        fontSize: 10,
        fontWeight: '600',
        marginTop: 2,
      },
      tabBarActiveTintColor: '#FFF0F0',
      tabBarInactiveTintColor: '#A09CAB',
      tabBarIcon: ({ focused }) => {
        let iconName: 'home' | 'home-outline' | 'add-circle' | 'add-circle-outline' | 'document' | 'document-outline' | 'person' | 'person-outline'
        let color = focused ? '#FFF0F0' : '#A09CAB';

        switch (route.name) {
          case 'Home':
            iconName = focused ? 'home' : 'home-outline';
            break;
          case 'Submit Report':
            iconName = focused ? 'add-circle' : 'add-circle-outline';
            break;
          case 'Reports':
            iconName = focused ? 'document' : 'document-outline';
            break;
          case 'Profile':
            iconName = focused ? 'person' : 'person-outline';
            break;
          default:
            iconName = 'home';
        }

        return <Ionicons name={iconName} size={24} color={color} />;
      },
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Submit Report" component={ReportSubmission} />
    <Tab.Screen name="Reports" component={ShowReports} />
    <Tab.Screen name="Profile" component={ProfileSettingsScreen} />
  </Tab.Navigator>
);


const AuthenticatedFlow = () => (
  <Stack.Navigator initialRouteName="Main" screenOptions={{ animation: 'fade', headerShown: false, presentation: "transparentModal" }}>
    <Stack.Screen name="Main" component={TabFlow} />
    <Stack.Screen name="Help" component={HelpScreen} />
    <Stack.Screen name="Feedback" component={FeedbackRatingsScreen} />
    <Stack.Screen name="SubmitReport" component={ReportSubmission} />
    <Stack.Screen name="Reports" component={ShowReports} />
    {/* <Stack.Screen name="Profile" component={ProfileSettingsScreen} /> */}
    <Stack.Screen name="MapView" component={MapViewScreen} />
    <Stack.Screen name="Community" component={CommunityUpdatesScreen} />
    {/* <Stack.Screen name="Home" component={HomeScreen} /> */}

  </Stack.Navigator>
);

// Unauthenticated Flow Navigator
const UnauthenticatedFlow = () => (
  <Stack.Navigator initialRouteName="Landing" screenOptions={{ headerShown: false, animation: 'fade', presentation: "transparentModal" }}>
    <Stack.Screen name="Landing" component={LandingScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={SignUpScreen} />
    <Stack.Screen name="EngageLanding" component={EngageLandingScreen} />
    <Stack.Screen name="TrackLanding" component={TrackLandingScreen} />
    <Stack.Screen name="ReportLanding" component={ReportLandingScreen} />
    <Stack.Screen name="GetStartedLanding" component={GetStartedLandingScreen} />
    <Stack.Screen name="SecureBlockchainLanding" component={SecureBlockchainLandingScreen} />
  </Stack.Navigator>
);

const RootNavigator = () => {
  const [user, setUser] = useRecoilState(useratom);

  // useEffect(() => {
  //   console.log("user atom changed:", user);
  // }, [user]); // Runs whenever `user` changes

  return user ? <AuthenticatedFlow /> : <UnauthenticatedFlow />;
};


export default function App() {
  return (
    <RecoilRoot>
      <RootNavigator />
    </RecoilRoot>
  );
}

