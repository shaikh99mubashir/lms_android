import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SubjctsDetails from '../../Screens/Subjects';
import Home from '../../Screens/Home';
import CustomDrawer from './CustomDrawer';
import AllClassess from '../../Screens/AllClassess';
import StudentCourses from '../../Screens/StudentCourses';
import StudentProfile from '../../Screens/StudentProfile';
import Settings from '../../Screens/Settings';
import Subscriptions from '../../Screens/Subscriptions';
import LiveSessions from '../../Screens/LiveSessions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BaseUrl} from '../../Constant/BaseUrl';
const MyDrawer = ({navigation}: any) => {
  const Drawer = createDrawerNavigator();
  const [isSessionIsALlow, setIsSessionIsAllow] = useState();
  console.log('isSessionIsALlow,', isSessionIsALlow);

  const checkAllowLiveSession = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('studentAuth');
      if (jsonValue !== null) {
        const data = JSON.parse(jsonValue);
        console.log('Retrieved data:', data.token);
        axios
          .get(`${BaseUrl}allow-live-session`, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${data.token}`,
            },
          })
          .then((response: any) => {
            console.log('response', response.data.success);
            setIsSessionIsAllow(response.data.success);
          })
          .catch(error => {
            console.log('error', error);
          });
      } else {
        console.log('No data found in AsyncStorage for key studentAuth');
        navigation.replace('Login');
      }
    } catch (error) {
      console.error('Error retrieving data from AsyncStorage:', error);
      return null;
    }
  };

  useEffect(() => {
    checkAllowLiveSession();
  }, []);
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        // drawerActiveBackgroundColor: '#aa18ea',
        drawerActiveTintColor: 'black',
        drawerInactiveTintColor: 'black',
        drawerLabelStyle: {
          fontFamily: 'Circular Std Medium',
          fontSize: 16,
        },
      }}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Classess" component={AllClassess} />
      <Drawer.Screen name="StudentCourses" component={StudentCourses} />
      <Drawer.Screen name="Settings" component={Settings} />
      <Drawer.Screen name="Subscriptions" component={Subscriptions} />
      {isSessionIsALlow == true ? (
        <Drawer.Screen name="LiveSessions" component={LiveSessions} />
      ) : null}
    </Drawer.Navigator>
  );
};

export default MyDrawer;

const styles = StyleSheet.create({});
