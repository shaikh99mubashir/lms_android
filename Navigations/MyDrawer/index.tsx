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
  const [userProfile, setUserProfile] = useState<any>();
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
          axios
          .get(`${BaseUrl}users`, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${data.token}`,
            },
          })
          .then(response => {
            console.log('response=====?', response.data);
            setUserProfile(response.data.user);
          })
          .catch(error => {
            if (error.response) {
              console.log(
                'register Server responded with data:',
                error.response.data,
              );
              navigation.replace('Login');
              console.log('register Status code:', error.response.status);
              console.log('register Headers:', error.response.headers);
            } else if (error.request) {
              console.log('register No response received:', error.request);
            } else {
              console.log(
                'Error setting up the request: register',
                error.message,
              );
            }
          });
      } else {
        console.log('No data found in AsyncStorage for key studentAuth');
        // navigation.replace('Login');
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
      drawerContent={props => <CustomDrawer {...props}  userProfile={userProfile} />}
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
      <Drawer.Screen name="Classes" component={AllClassess} />
      <Drawer.Screen name="My Courses" component={StudentCourses} />
      <Drawer.Screen name="Settings" component={Settings} />
      <Drawer.Screen name="Subscriptions" component={Subscriptions} />
      {/* <Drawer.Screen name="LiveSessions" component={LiveSessions} /> */}
      {isSessionIsALlow == true ? (
        <Drawer.Screen name="LiveSessions" component={LiveSessions} />
      ) : null}
    </Drawer.Navigator>
  );
};

export default MyDrawer;

const styles = StyleSheet.create({});
