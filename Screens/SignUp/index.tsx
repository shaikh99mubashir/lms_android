import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from 'react-native';
  import React, {useState} from 'react';
  import {Color} from '../../Constant';
  import InputText from '../../Components/InputText';
  import CustomButton from '../../Components/CustomButton';
  import PasswordInput from '../../Components/PasswordInput';
  import GoogleSignInButton from '../../Components/GoogleSignInButton';
  import FacebookSigninButton from '../../Components/FacebookSigninButton';
  
  const SignUp = ({navigation}: any) => {
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [password, setPassword] = useState('');
    const [emailOrPhoneError, setEmailOrPhoneError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [userInfo, setUserInfo] = useState<any>(null);
  
    const handleLogin = () => {
      navigation.replace('Login');
    };
  
    return (
      <View
        style={{
          paddingHorizontal: 25,
          backgroundColor: Color.PattensBlue,
          height: '100%',
        }}>
        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
            <View style={{justifyContent:'center', alignItems:'center', marginTop: 70}}>
                <Image source={require('../../Images/logo.png')}/>
            </View>
          <View style={{gap: 5, marginTop: 70}}>
            <InputText
              label="Enter Full Name"
              placeholder="Full Name"
              onChangeText={(text: any) => setEmailOrPhone(text)}
              value={emailOrPhone}
              error={emailOrPhoneError}
            />
          </View>
          <View style={{gap: 5, marginTop: 3}}>
            <InputText
              label="Enter Email"
              placeholder="your.email@example.com"
              onChangeText={(text: any) => setEmailOrPhone(text)}
              value={emailOrPhone}
              error={emailOrPhoneError}
            />
          </View>
          <View style={{margin: 3}}></View>
          <View>
            <PasswordInput
              label="Password"
              placeholder="***************"
              onChangeText={(text: any) => setPassword(text)}
              value={password}
              error={passwordError}
            />
          </View>
          <View style={{margin: 3}}></View>
          <View>
            <PasswordInput
              label="Confirm Password"
              placeholder="***************"
              onChangeText={(text: any) => setPassword(text)}
              value={password}
              error={passwordError}
            />
          </View>
  
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
          <View style={{margin: 8}}></View>
          <View style={{marginVertical: 20}}>
            <CustomButton onPress={handleLogin} btnTitle="Signup" />
          </View>
         
       
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 15,
              flexDirection: 'row',
              marginTop: 0,
            }}>
            <Text
              style={{
                color: Color.IronsideGrey,
                alignSelf: 'center',
                fontFamily: 'Circular Std Medium',
                fontSize: 16,
              }}>
             already have an Account?{' '}
            </Text>
            <TouchableOpacity
              style={{flexDirection: 'row', gap: 4}}
              activeOpacity={0.8}
              onPress={() => navigation.replace('Login')}>
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
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  };
  
  export default SignUp;
  
  const styles = StyleSheet.create({
    label: {
      color: Color.Dune,
      fontFamily: 'Circular Std Bold',
      fontSize: 16,
    },
    textType2: {
      color: Color.IronsideGrey,
      fontWeight: '500',
      fontSize: 16,
      fontFamily: 'Circular Std Medium',
    },
  });
  