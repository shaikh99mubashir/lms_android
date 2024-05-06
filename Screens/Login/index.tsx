import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {Color} from '../../Constant';
import InputText from '../../Components/InputText';
import CustomButton from '../../Components/CustomButton';
import PasswordInput from '../../Components/PasswordInput';
import GoogleSignInButton from '../../Components/GoogleSignInButton';
import FacebookSigninButton from '../../Components/FacebookSigninButton';
import CustomTabView from '../../Components/CustomTabView';

const Login = ({navigation}: any) => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [emailOrPhoneError, setEmailOrPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [userInfo, setUserInfo] = useState<any>(null);

  const handleLogin = () => {
    navigation.replace('MyDrawer');
  };
  const [currentTab, setCurrentTab]: any = useState([
    {
      index: 0,
      name: 'Latest',
      selected: true,
    },
    {
      index: 1,
      name: 'Applied',
      selected: false,
    },
  ]);
  const activateTab = (index: any) => {
    const newTabs = currentTab.map((e: any) => ({
      ...e,
      selected: e.index === index,
    }));
    setCurrentTab(newTabs);
  };

  const firstRoute = useCallback(() => {
    return (
      <View style={{width: '100%'}}>
        <View style={{marginTop: 20}} />
        <InputText
          label="Enter Email"
          placeholder="your.email@example.com"
          onChangeText={(text: any) => setEmailOrPhone(text)}
          value={emailOrPhone}
          error={emailOrPhoneError}
        />
        <View style={{marginTop: 20}} />
        <PasswordInput
          label="Password"
          placeholder="***************"
          onChangeText={(text: any) => setPassword(text)}
          value={password}
          error={passwordError}
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
        <View style={{margin: 8}}></View>
        <View style={{marginVertical: 20}}>
          <CustomButton onPress={handleLogin} btnTitle="Sign in" />
        </View>
      </View>
    );
  }, [emailOrPhone, password]);
  const secondRoute = useCallback(() => {
    return (
      <View style={{width: '100%'}}>
        <View style={{marginTop: 20}} />
        <InputText
          label="Name"
          placeholder="Hello world"
          onChangeText={(text: any) => setEmailOrPhone(text)}
          value={emailOrPhone}
          error={emailOrPhoneError}
        />
          <View style={{marginTop: 20}} />
        <InputText
          label="Enter Email"
          placeholder="your.email@example.com"
          onChangeText={(text: any) => setEmailOrPhone(text)}
          value={emailOrPhone}
          error={emailOrPhoneError}
        />
        <View style={{marginTop: 20}} />
        <PasswordInput
          label="Password"
          placeholder="***************"
          onChangeText={(text: any) => setPassword(text)}
          value={password}
          error={passwordError}
        />
        {/* <View style={{marginTop: 20}} />
        <PasswordInput
          label="Confirm Password"
          placeholder="***************"
          onChangeText={(text: any) => setPassword(text)}
          value={password}
          error={passwordError}
        /> */}
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
          <CustomButton onPress={handleLogin} btnTitle="Sign in" />
        </View>
      </View>
    );
  }, []);

  return (
    <View
      style={{
        paddingHorizontal: 25,
        backgroundColor: Color.white,
        height: '100%',
      }}>
      <ScrollView showsHorizontalScrollIndicator={false}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <Image source={require('../../Images/logo.png')} />
        </View>
        <View style={{marginTop: 20}}></View>
        <Text style={[styles.textType1, {textAlign: 'center'}]}>
          Welcome to, <Text style={{color: Color.Primary}}>Lerness</Text>
        </Text>

        <View style={{marginTop: 30}}></View>
        <View>
          <CustomTabView
            currentTab={currentTab}
            firstRoute={firstRoute}
            secondRoute={secondRoute}
            activateTab={activateTab}
            firstRouteTitle="Sign in"
            secondRouteTitle="Sign up"
          />
        </View>
        <View>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              top: 12,
            }}>
            <View
              style={{
                borderWidth: 0.5,
                borderColor: Color.lineColor,
                width: '30%',
              }}></View>
            <View
              style={{
                borderWidth: 0.5,
                borderColor: Color.lineColor,
                width: '30%',
              }}></View>
          </View>

          <Text style={[styles.textType2, {textAlign: 'center'}]}>
            or Continue with
          </Text>
        </View>
        <View style={{marginTop: 20}}></View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginVertical: 20,
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
              alignItems:'center',
              justifyContent:'center'
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
              alignItems:'center',
              justifyContent:'center'
            }}>
            <Image source={require('../../Images/facebook.png')} />
            <Text style={styles.textType2}>Facebook</Text>
          </TouchableOpacity>
        </View>
        <View style={{marginTop: 10}}></View>
        <TouchableOpacity
         activeOpacity={0.8}
         onPress={() => {
           const currentIndex = currentTab.findIndex((tab:any) => tab.selected);
           const nextIndex = currentIndex === 0 ? 1 : 0;
           activateTab(nextIndex);
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
              fontFamily: 'Circular Std Medium',
              fontSize: 16,
            }}>
           {currentTab[1].selected ? "Already have an Account?" : "Don’t have an Account?"}
          </Text>
          <View
            style={{flexDirection: 'row', gap: 4}}
           >
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
             {currentTab[1].selected ? "Sign in" : "Sign up"}
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Login;

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
  textType1: {
    color: Color.IronsideGrey,
    fontWeight: '500',
    fontSize: 24,
    fontFamily: 'Circular Std Medium',
  },
});
