import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Color} from '../../Constant';
import CustomButton from '../../Components/CustomButton';
import GoogleSignInButton from '../../Components/GoogleSignInButton';
import FacebookSigninButton from '../../Components/FacebookSigninButton';
import CustomButton3 from '../../Components/CustomButton3';
const GetStarted = ({navigation}: any) => {
  return (
    <View style={{backgroundColor: Color.GhostWhite, height: '100%'}}>
      <ScrollView showsHorizontalScrollIndicator={false}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 100,
          }}>
          <Image source={require('../../Images/logo.png')} />
        </View>
        <View>
          <Text
            style={{
              fontFamily: 'Circular Std Medium',
              color: 'black',
              textAlign: 'center',
              fontSize: 28,
              lineHeight: 40,
              marginTop: 80,
            }}>
            Let’s you in
          </Text>
        </View>
        <View style={{position: 'relative', left: -14}}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              marginTop: 40,
            }}>
            <GoogleSignInButton
              title="Continue with Google"
              // onSignInSuccess={}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              marginLeft: 20,
            }}>
            <FacebookSigninButton
              title="Continue with Facebook"
              // onSignInSuccess={(userInfo: any) => {
              //   console.log('User info:', userInfo);
              //   setUserInfo(userInfo);
              // }}
            />
          </TouchableOpacity>
          {/* <TouchableOpacity
            activeOpacity={0.8}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: -10,
            }}>
            <Image source={require('../../Images/AppleCircle.png')} />
            <Text
              style={{
                fontFamily: 'Circular Std Bold',
                color: 'black',
                gap: 20,
                fontSize: 18,
                lineHeight: 22,
              }}>
              Continue with Apple
            </Text>
          </TouchableOpacity> */}
        </View>

        <View>
          <Text
            style={{
              color: Color.IronsideGrey,
              textAlign: 'center',
              fontFamily: 'Circular Std Bold',
              marginVertical: 40,
              fontSize: 16,
              lineHeight: 20,
            }}>
            ( Or )
          </Text>
        </View>

        <View style={{marginHorizontal: 20, marginBottom: 20}}>
          <CustomButton3
            btnTitle="Login With Your Account"
            onPress={() => navigation.replace('Login')}
          />
        </View>

        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 15,
            flexDirection: 'row',
            gap: 5,
          }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.replace('SignUp')}>
            <Text
              style={{
                color: Color.IronsideGrey,
                alignSelf: 'center',
                fontSize: 16,
                fontFamily: 'Circular Std Medium',
              }}>
              Don’t have an Account?
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{flexDirection: 'row', gap: 4}}
            activeOpacity={0.8}
            onPress={() => navigation.replace('SignUp')}>
            <Text
              style={{
                color: Color.IronsideGrey,
                fontSize: 16,
                fontFamily: 'Circular Std Medium',
              }}>
              Let’s
            </Text>
            <Text
              style={{
                color: Color.Dune,
                fontSize: 16,
                borderBottomWidth: 2,
                borderBottomColor: Color.Primary,
                fontFamily: 'Circular Std Medium',
              }}>
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default GetStarted;

const styles = StyleSheet.create({
  btn: {
    // flex: 1,
    height: 50,
    // width:360,
    borderRadius: 30,
    flexShrink: 0,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  textType1: {
    fontWeight: '500',
    fontSize: 18,
    color: Color.white,
    fontFamily: 'Circular Std Black',
    lineHeight: 24,
  },
  textType2: {
    color: Color.IronsideGrey,
    alignSelf: 'center',
    fontWeight: '500',
    fontSize: 16,
  },
  textType3: {
    color: Color.Dune,
    fontWeight: '500',
    fontSize: 16,
    borderBottomWidth: 2,
    borderBottomColor: Color.Primary,
  },
});
