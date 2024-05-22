import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = ({navigation}:any) => {
  const check = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('studentAuth');
      if (jsonValue !== null) {
        console.log("running");
        const data = JSON.parse(jsonValue);
        console.log('Retrieved data:', data.token);
        console.log('data.token',data.token);
        setTimeout(() => {
          if (data.token) {
            console.log('data.token',data.token);
            navigation.replace('MyDrawer');
          } 
        }, 3000);
      }
      else{
        setTimeout(() => {
          navigation.replace('OnBoarding');
        }, 3000);
      }
    } catch (error) {
      console.error('Error retrieving data from AsyncStorage:', error);
      return null;
    }
  };

  useEffect(() => {
    check();
    // setTimeout(() => {
    //     navigation.replace('OnBoarding');
    // }, 3000);
  }, []);
  return (
    <View>
      <LinearGradient
        colors={['#8154e2', '#4e22b5']}
        useAngle={true}
        angle={45}
        style={{
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image source={require('../../Images/logo-white.png')} />
      </LinearGradient>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({});
