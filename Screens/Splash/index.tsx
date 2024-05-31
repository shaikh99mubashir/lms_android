import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Color } from '../../Constant';

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
        navigateToHomeScreen()
      }
    } catch (error) {
      console.error('Error retrieving data from AsyncStorage:', error);
      return null;
    }
  };

  const navigateToHomeScreen = async () => {
    let OnBoarding = await AsyncStorage.getItem('OnBoarding');
    setTimeout(async () => {
      if (OnBoarding === 'true') {
        navigation.replace('GetStarted');
      } else {
        navigation.replace('OnBoarding');
      }
    }, 3000);
  };

  useEffect(() => {
    check();
    // setTimeout(() => {
    //     navigation.replace('OnBoarding');
    // }, 3000);
  }, []);
  return (
    <View style={{
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:Color.white
    }}>
     
        <Image source={require('../../Images/Logo00.png')} 
        resizeMode='contain'
         style={{width:Dimensions.get('screen').width/1.5}}/>

    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({});
