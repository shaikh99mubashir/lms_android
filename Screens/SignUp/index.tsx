import {
  StyleSheet,
  Text,
  View,
  Image,
  ToastAndroid,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import {Color} from '../../Constant';
import axios from 'axios';
import CustomLoader from '../../Components/CustomLoader';
import {BaseUrl, profileImage} from '../../Constant/BaseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InputText2 from '../../Components/InputText2';
import PasswordInput2 from '../../Components/PasswordInput2';
import CustomButton from '../../Components/CustomButton';
import CustomButton2 from '../../Components/CustomButton2';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton3 from '../../Components/CustomButton3';
import {launchImageLibrary} from 'react-native-image-picker';

const SignUp = ({navigation}: any) => {
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [classesData, setClassesData] = useState('');
  const [selectedClass, setSelectedClass] = useState<any>('');
  const [loading, setLoading] = useState(false);
  const [uri, setUri] = useState('');
  const [type, setType] = useState('');
  const [name, setName] = useState('');

  const [registerData, setRegisterData] = useState<any>({
    name: '',
    emailOrPhone: '',
    password: '',
  });
  console.log('registerData', registerData);

  const verifyEmail = emailRegex.test(registerData.emailOrPhone);
  const verifyName = registerData.name.length > 4;
  const [errors, setErrors] = useState({
    name: '',
    emailOrPhone: '',
    password: '',
  });
  
  const handelSignup = () => {
    let newErrors = {name: '', emailOrPhone: '', password: ''};
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{6}$/;

 
    if (!registerData.name) {
      newErrors.name = 'Name is required';
    }
    if (!registerData.emailOrPhone) {
      newErrors.emailOrPhone = 'Email is required';
    } else if (!emailRegex.test(registerData.emailOrPhone)) {
      newErrors.emailOrPhone = 'Invalid email or phone';
    }
    if (!registerData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);

    if (Object.values(newErrors).some(error => error !== '')) {
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append('name', registerData.name);
    formData.append('email', registerData.emailOrPhone);
    formData.append('password', registerData.password);
    formData.append('image', {
      uri: uri,
      type: type,
      name: name,
    });
    console.log('formData', formData);

    axios
      .post(`${BaseUrl}register`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response: any) => {
        console.log('response', response.data);
        setLoading(false);
        if (response.data) {
          ToastAndroid.show(`${response.message}`, ToastAndroid.SHORT);
          navigation.navigate('Login');
          AsyncStorage.setItem('OnBoarding', 'true');
          setRegisterData({
            name: '',
            emailOrPhone: '',
            password: '',
          });
        }
      })
      .catch((error: any) => {
        if (error.response) {
          console.log(
            'register Server responded with data:',
            error.response.data,
          );
          console.log('register Status code:', error.response.status);
          console.log('register Headers:', error.response.headers);
        } else if (error.request) {
          console.log('register No response received:', error.request);
        } else {
          console.log('Error setting up the request: register', error.message);
        }
        setLoading(false);
      });
  };


  const uploadProfilePicture = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs camera permission to upload profile picture',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission denied');
        return;
      }
    }

    console.log('running');
    const options: any = {
      title: 'Select Picture',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      maxWidth: 500,
      maxHeight: 500,
      quality: 0.5,
    };

    const result: any = await launchImageLibrary(options);

    if (result.didCancel) {
      console.log('Cancelled image selection');
    } else if (result.errorCode === 'permission') {
      console.log('Permission Not Satisfied');
    } else if (result.errorCode === 'others') {
      console.log(result.errorMessage);
    } else if (result.assets && result.assets.length > 0) {
      let selectedUri = result.assets[0].uri;
      let selectedType = result.assets[0].type;
      let selectedName = result.assets[0].fileName;

      setUri(selectedUri);
      setType(selectedType);
      setName(selectedName);
    }
  };

  console.log('name', name);
  console.log('uri', uri);

  return (
    <View>
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
            Sign Up
          </Text>
          <View style={{marginTop: 5}} />
          <View>
            <TouchableOpacity
              onPress={() => uploadProfilePicture()}
              activeOpacity={0.8}>
              <Image
                source={{
                  uri: name
                    ? `file://${uri}`
                    : `${profileImage}/storage/users/UserImage.png`,
                }}
                style={{width: 80, height: 80, borderRadius: 50}}
              />
              <View
                style={{
                  backgroundColor: Color.Primary,
                  bottom: 0,
                  left: 50,
                  width: 35,
                  height: 35,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 50,
                  position: 'absolute',
                }}>
                <Image
                  source={require('../../Images/upload.png')}
                  resizeMode="contain"
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: Color.white,
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{marginTop: 10}} />
          <View style={{width: '100%'}}>
            <InputText2
              label="Enter Name"
              placeholder="Enter Name"
              onChangeText={(text: any) =>
                setRegisterData((prevState: any) => ({
                  ...prevState,
                  name: text,
                }))
              }
              value={registerData.name}
              error={errors.name}
              isCorrect={verifyName}
            />
            <View style={{marginTop: 10}} />
            <InputText2
              label="Enter Email"
              placeholder="your.email@example.com"
              onChangeText={(text: any) =>
                setRegisterData((prevState: any) => ({
                  ...prevState,
                  emailOrPhone: text,
                }))
              }
              value={registerData.emailOrPhone}
              error={errors.emailOrPhone}
              isCorrect={verifyEmail}
            />
            <View style={{marginTop: 10}} />
            <PasswordInput2
              label="Password"
              placeholder="***************"
              onChangeText={(text: any) =>
                setRegisterData((prevState: any) => ({
                  ...prevState,
                  password: text,
                }))
              }
              value={registerData.password}
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
              <CustomButton3 onPress={handelSignup} btnTitle="PROCEED" />
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
                navigation.navigate('Login');
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
                  Login
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

export default SignUp;

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
