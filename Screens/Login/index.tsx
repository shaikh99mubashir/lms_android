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
      console.log("newTabs",newTabs);
      
      setCurrentTab(newTabs);
    };

    const firstRoute = useCallback(() => {

     
  
      return (
        <View style={{flex:1}}>
          <Text>Signup</Text>
        </View>
      );
    }, []);
    const secondRoute = useCallback(() => {

     
  
      return (
        <View style={{flex:1}}>
          <Text>Signup</Text>
        </View>
      );
    }, []);
  
  
    return (
      // <View
      //   style={{
      //     paddingHorizontal: 25,
      //     backgroundColor: Color.PattensBlue,
      //     height: '100%',
      //   }}>
      //   <ScrollView showsHorizontalScrollIndicator={false}>
      //       <View style={{justifyContent:'center', alignItems:'center', marginTop: 70}}>
      //           <Image source={require('../../Images/logo.png')}/>
      //       </View>
      //     <View style={{gap: 5, marginTop: 70}}>
      //       <InputText
      //         label="Enter Email"
      //         placeholder="your.email@example.com"
      //         onChangeText={(text: any) => setEmailOrPhone(text)}
      //         value={emailOrPhone}
      //         error={emailOrPhoneError}
      //       />
      //     </View>
      //     <View style={{margin: 3}}></View>
      //     <View>
      //       <PasswordInput
      //         label="Password"
      //         placeholder="***************"
      //         onChangeText={(text: any) => setPassword(text)}
      //         value={password}
      //         error={passwordError}
      //       />
      //     </View>
  
      //     <View>
      //       <TouchableOpacity
      //         onPress={() => navigation.navigate('ForgotPassword')}
      //         activeOpacity={0.8}
      //         style={{
      //           alignItems: 'flex-end',
      //           position: 'relative',
      //           marginVertical: 5,
      //           top: 12,
      //         }}>
      //         <Text style={styles.textType2}>Forgot Password?</Text>
      //       </TouchableOpacity>
      //     </View>
      //     <View style={{margin: 8}}></View>
      //     <View style={{marginVertical: 20}}>
      //       <CustomButton onPress={handleLogin} btnTitle="Login" />
      //     </View>
         
       
      //     <View
      //       style={{
      //         alignItems: 'center',
      //         justifyContent: 'center',
      //         marginBottom: 15,
      //         flexDirection: 'row',
      //         marginTop: 60,
      //       }}>
      //       <Text
      //         style={{
      //           color: Color.IronsideGrey,
      //           alignSelf: 'center',
      //           fontFamily: 'Circular Std Medium',
      //           fontSize: 16,
      //         }}>
      //         Don’t have an Account?{' '}
      //       </Text>
      //       <TouchableOpacity
      //         style={{flexDirection: 'row', gap: 4}}
      //         activeOpacity={0.8}
      //         onPress={() => navigation.navigate('SignUp')}>
      //         <Text
      //           style={{
      //             color: Color.IronsideGrey,
      //             fontSize: 16,
      //             fontFamily: 'Circular Std Medium',
      //           }}>
      //           Let’s
      //         </Text>
      //         <Text
      //           style={{
      //             color: Color.Dune,
      //             fontSize: 16,
      //             borderBottomWidth: 2,
      //             borderBottomColor: Color.Primary,
      //             fontFamily: 'Circular Std Medium',
      //           }}>
      //           SignUp
      //         </Text>
      //       </TouchableOpacity>
      //     </View>
      //   </ScrollView>
      // </View>
         <View
        style={{
          paddingHorizontal: 25,
          backgroundColor: Color.white,
          height: '100%',
        }}>
        <ScrollView showsHorizontalScrollIndicator={false}>
            <View style={{justifyContent:'center', alignItems:'center', marginTop: 20}}>
                <Image source={require('../../Images/logo.png')}/>
            </View>

            <CustomTabView
            currentTab={currentTab}
            firstRoute={firstRoute}
            secondRoute={secondRoute}
            activateTab={activateTab}
            firstRouteTitle="Latest"
            secondRouteTitle={`Applied (148)`}
          />

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
  });
  