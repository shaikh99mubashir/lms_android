import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  LoginButton,
  AccessToken,
  Profile,
  LoginManager,
} from 'react-native-fbsdk-next';

const FacebookSigninButton = ({onSignInSuccess, title}: any) => {
  const signIn = async () => {
    try {
      LoginManager.logInWithPermissions(['public_profile', 'email']).then(
        (result: any) => {
          if (result.isCancelled) {
            console.log('Login cancelled');
          } else {
            AccessToken.getCurrentAccessToken().then((data: any) => {
              console.log('AccessToken:', data.accessToken);
              Profile.getCurrentProfile().then(currentProfile => {
                if (currentProfile) {
                  console.log('Current profile:', currentProfile);
                  console.log('Logged in user:', currentProfile.name);
                  console.log('User ID:', currentProfile.userID);
                }
              });
            });
          }
        },
        (error: any) => {
          console.log('Login failed with error:', error);
        },
      );
    } catch (e) {
      console.log(e);
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
        <Image source={require('../../Images/FacebookCircle.png')} />
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

export default FacebookSigninButton;

const styles = StyleSheet.create({});
