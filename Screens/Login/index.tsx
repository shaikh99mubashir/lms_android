import {
  StyleSheet,
  Text,
  View,
  Image,
  ToastAndroid,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {Color} from '../../Constant';
import axios from 'axios';
import CustomLoader from '../../Components/CustomLoader';
import {BaseUrl} from '../../Constant/BaseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InputText2 from '../../Components/InputText2';
import PasswordInput2 from '../../Components/PasswordInput2';
import CustomButton from '../../Components/CustomButton';
import CustomButton2 from '../../Components/CustomButton2';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton3 from '../../Components/CustomButton3';
import MyDrawer from '../../Navigations/MyDrawer';

const Login = ({navigation}: any) => {
  const [login, setLogin] = useState<any>({
    emailOrPhone: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    emailOrPhone: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const verifyEmail = emailRegex.test(login.emailOrPhone);

  const handelSignin = () => {
    let newErrors = {emailOrPhone: '', password: ''};
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{6}$/;

    if (!login.emailOrPhone) {
      newErrors.emailOrPhone = 'Email is required';
    } else if (!emailRegex.test(login.emailOrPhone)) {
      newErrors.emailOrPhone = 'Invalid Email';
    }
    if (!login.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);

    if (Object.values(newErrors).some(error => error !== '')) {
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append('email', login.emailOrPhone);
    formData.append('password', login.password);
    axios
      .post(`${BaseUrl}login`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response: any) => {
        let studentData = response.data;
        console.log('response', response.data);
        setLoading(false);
        if (response.data) {
          ToastAndroid.show(
            `Welcome ${response.data.user.name}`,
            ToastAndroid.SHORT,
          );
          setLogin({
            emailOrPhone: '',
            password: '',
          });
          let mydata = JSON.stringify(studentData);
          AsyncStorage.setItem('studentAuth', mydata);
          navigation.replace('BottomNav');
        }
      })
      .catch(error => {
        if (error.response) {
          console.log('login Server responded with data:', error.response.data);
          console.log('login Status code:', error.response.status);
          console.log('login Headers:', error.response.headers);
        } else if (error.request) {
          console.log('login No response received:', error.request);
        } else {
          console.log('Error setting up the request: login', error.message);
        }
        setLoading(false);
      });
  };
  return (
    <View style={{backgroundColor: Color.white, height: '100%'}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{backgroundColor: Color.Primary, alignItems: 'center'}}>
          <Image
            source={require('../../Images/logo-white.png')}
            style={{
              width: Dimensions.get('screen').width / 2.3,
              top: -18,
            }}
            resizeMode="contain"
          />
        </View>
        <View
          style={{
            backgroundColor: Color.white,
            paddingHorizontal: 30,
            height: '100%',
            borderTopRightRadius: 40,
            borderTopLeftRadius: 40,
            zIndex: 1000,
            position: 'relative',
            top: -40,
          }}>
          <View style={{margin: 10}} />
          <Text
            style={[
              styles.textType1,
              {
                color: Color.Black,
                fontSize: 30,
              },
            ]}>
            Log In
          </Text>
          <View style={{marginTop: 5}} />
          <View style={{width: '100%'}}>
            <InputText2
              label="Enter Email"
              placeholder="your.email@example.com"
              onChangeText={(text: any) =>
                setLogin((prevState: any) => ({
                  ...prevState,
                  emailOrPhone: text,
                }))
              }
              value={login.emailOrPhone}
              error={errors.emailOrPhone}
              isCorrect={verifyEmail}
              style={{textTransform:'lowercase'}}
            />
            <View style={{marginTop: 10}} />
            <PasswordInput2
              label="Password"
              placeholder="***************"
              onChangeText={(text: any) =>
                setLogin((prevState: any) => ({
                  ...prevState,
                  password: text,
                }))
              }
              value={login.password}
              error={errors.password}
            />
            <View>
              <TouchableOpacity
                onPress={() => navigation.navigate('ForgotPassword')}
                activeOpacity={0.8}
                style={{
                  alignItems: 'flex-end',
                  position: 'relative',
                  marginVertical: 5,
                  top: 12,
                }}>
                <Text style={styles.textType2}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
            <View style={{margin: 5}}></View>
            <View style={{marginVertical: 15}}>
              <CustomButton3 onPress={handelSignin} btnTitle="PROCEED" />
              {/* <CustomButton3 onPress={()=>navigation.navigate('MyDrawer')} btnTitle="PROCEED" /> */}
            </View>
            {/* <View style={{margin: 5}}></View> */}
            <Text style={[styles.textType2, {textAlign: 'center'}]}>
              Or Log In With
            </Text>
            <View style={{margin: 5}}></View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginVertical: 10,
                gap: 10,
              }}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  flexDirection: 'row',
                  gap: 10,
                  borderWidth: 2,
                  width: 160,
                  paddingVertical: 10,
                  borderRadius: 30,
                  borderColor: Color.liteGrey,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image source={require('../../Images/google.png')} />
                <Text style={styles.textType2}>Google</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  flexDirection: 'row',
                  gap: 10,
                  borderWidth: 2,
                  width: 160,
                  paddingVertical: 10,
                  borderRadius: 30,
                  borderColor: Color.liteGrey,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image source={require('../../Images/facebook.png')} />
                <Text style={styles.textType2}>Facebook</Text>
              </TouchableOpacity>
            </View>
            <View style={{marginTop: 20}}></View>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                navigation.navigate('SignUp');
              }}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 15,
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  color: Color.IronsideGrey,
                  alignSelf: 'center',
                  fontFamily: 'Poppins-Medium',
                  fontSize: 16,
                  paddingRight: 5,
                }}>
                Don’t have an Account?
              </Text>
              <View style={{flexDirection: 'row', gap: 4}}>
                <Text
                  style={{
                    color: Color.IronsideGrey,
                    fontSize: 16,
                    fontFamily: 'Poppins-Medium',
                  }}>
                  Let’s
                </Text>
                <Text
                  style={{
                    color: Color.Primary,
                    fontSize: 16,
                    fontWeight: 'bold',
                    // borderBottomWidth: 2,
                    // borderBottomColor: Color.Primary,
                    fontFamily: 'Poppins-Medium',
                  }}>
                  Sign Up
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <CustomLoader visible={loading} />
      </ScrollView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },

  label: {
    color: Color.Dune,
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
  },
  textType2: {
    color: Color.IronsideGrey,
    fontWeight: '500',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
  textType1: {
    color: Color.IronsideGrey,
    fontWeight: '500',
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
  },
});