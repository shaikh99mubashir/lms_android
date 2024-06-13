import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../../Screens/Home';
import Splash from '../../Screens/Splash';
import {Color} from '../../Constant';
import AllClassess from '../../Screens/AllClassess';
import LiveSessions from '../../Screens/LiveSessions';
import Profile from '../../Screens/Profile';
import Settings from '../../Screens/Settings';
import {BaseUrl, profileImage} from '../../Constant/BaseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useIsFocused} from '@react-navigation/native';
import CustomLoader from '../../Components/CustomLoader';
import ProfileMenu from '../../Screens/ProfileMenu';
import Live from '../../Svgs/live'
import HomeIcon from '../../Svgs/Home'
import ClassesIcon from '../../Svgs/classes'
import SettingsIcon from '../../Svgs/settings'
const Tab = createBottomTabNavigator();

const BottomNav = ({navigation}: any) => {
  const [userProfile, setUserProfile] = useState<any>();
  const [loading, setLoading] = useState(false);
  const focus = useIsFocused();

  const getDataFromStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('studentAuth');
      if (jsonValue !== null) {
        const data = JSON.parse(jsonValue);
        console.log('Retrieved data:', data.token);
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
            setLoading(false);
          })
          .catch(error => {
            setLoading(false);
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
        return null;
      }
    } catch (error) {
      console.error('Error retrieving data from AsyncStorage:', error);
      return null;
    }
  };

  useEffect(() => {
    getDataFromStorage();
  }, [focus]);
  return (
    <>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarInactiveTintColor: 'grey',
          tabBarStyle: styles.tabBarStyle,
          tabBarActiveTintColor: 'black',
        })}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({focused, color}) => (
              <View>
                {focused == true ? (
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'row',
                      // backgroundColor:'#1FC07D',
                    }}>
                    <HomeIcon color={Color.Primary}/>
                  </View>
                ) : (
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'row',
                    }}>
                    <HomeIcon/>
                  </View>
                )}
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="AllClassess"
          component={AllClassess}
          options={{
            tabBarIcon: ({focused, color}) => (
              <View>
                {focused == true ? (
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'row',
                      padding: 5,
                      borderRadius: 5,
                    }}>
                    <ClassesIcon color={Color.Primary}/>
                  </View>
                ) : (
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'row',
                    }}>
                    <ClassesIcon/>
                  </View>
                )}
              </View>
            ),
          }}
        />

        <Tab.Screen
          name="LiveSessions"
          component={LiveSessions}
          options={{
            tabBarIcon: ({focused, color}) => (
              <View>
                {focused == true ? (
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'row',
                      padding: 5,
                      borderRadius: 5,
                    }}>
                  
                    <Live color={Color.Primary}/>
                  </View>
                ) : (
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'row',
                    }}>
                    
                      <Live/>
                  </View>
                )}
              </View>
            ),
          }}
        />

        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarIcon: ({focused, color}) => (
              <View>
                {focused == true ? (
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'row',
                      padding: 5,
                      borderRadius: 5,
                    }}>
                    <SettingsIcon color={Color.Primary}/>
                  </View>
                ) : (
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'row',
                    }}>
                    <SettingsIcon/>
                  </View>
                )}
              </View>
            ),
          }}
        />

        <Tab.Screen
          name="ProfileMenu"
          component={ProfileMenu}
          options={{
            tabBarIcon: ({focused, color}) => (
              <View>
                {focused == true ? (
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'row',
                      padding: 5,
                      borderRadius: 5,
                    }}>
                    <Image
                      source={{
                        uri: userProfile?.full_image_url
                          ? userProfile?.full_image_url
                          : `${profileImage}/storage/users/UserImage.png`,
                      }}
                      style={{width: 26, height: 26, borderRadius: 50}}
                    />
                  </View>
                ) : (
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'row',
                    }}>
                    <Image
                      source={{
                        uri: userProfile?.full_image_url
                          ? userProfile?.full_image_url
                          : `${profileImage}/storage/users/UserImage.png`,
                      }}
                      style={{width: 26, height: 26, borderRadius: 50}}
                    />
                  </View>
                )}
              </View>
            ),
          }}
        />
      </Tab.Navigator>
      <CustomLoader visible={loading} />
    </>
  );
};

export default BottomNav;

const styles = StyleSheet.create({
  tabBarStyle: {
    // position: 'absolute',
    borderTopWidth: 0,
    height: 65,
    // borderTopLeftRadius: 50,
    // borderTopRightRadius: 50,
    backgroundColor: Color.white,
  },
});
