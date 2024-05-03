import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const GoogleSignInButton = ({onSignInSuccess, title}: any) => {

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '1097034181399-if4p9lc56ici9qsmekus0n7k902fn4j9.apps.googleusercontent.com',
      offlineAccess: true,
    });
  }, [])

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      onSignInSuccess(userInfo)
      // console.log('userInfo',userInfo);
    } catch (error:any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('user cancelled the login flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log(' operation (e.g. sign in) is in progress already');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('play services not available or outdated');
      } else {
        console.log('some other error happened',error.message);
      }
    }
  };
  return (
    <View>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => signIn()}
        activeOpacity={0.8}>
        <Image source={require('../../Images/GoogleCircle.png')} />
        {title && (
          <Text
            style={{
              fontFamily: 'Circular Std Bold',
              color: 'black',
              gap: 20,
              fontSize: 18,
              lineHeight: 22,
            }}>
          {title}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default GoogleSignInButton;

const styles = StyleSheet.create({});
