import { View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import NoReportsScreen from './NoReport';
import UserReport from './UserReport';
import useratom from '@/recoil/atoms/loginatom';
import { useRecoilValue } from 'recoil';

const ShowReports = () => {
  const user = useRecoilValue<any>(useratom);
  const [hasreports, sethasreports] = useState(false);

  // Update `hasreports` when `user` changes
  useEffect(() => {
    if (user?.reports != null) {
      sethasreports(true);
    } else {
      sethasreports(false);
    }
  }, [user]);

  // Conditional rendering
  if (hasreports) {
    return <UserReport />;
  }

  return (
    <View>
      <NoReportsScreen />
    </View>
  );
};

export default ShowReports;
