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
          ToastAndroid.show(`${response.message}`, ToastAndroid.SHORT);
          setLogin({
            emailOrPhone: '',
            password: '',
          });
          let mydata = JSON.stringify(studentData);
          AsyncStorage.setItem('studentAuth', mydata);
          navigation.replace('MyDrawer');
        }
      })
      .catch(error => {
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
  return (
    <View>
        <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{backgroundColor: '#4718ad'}}>
        <Image
          source={require('../../Images/login.png')}
          style={{
            width: Dimensions.get('screen').width,
            height: Dimensions.get('screen').height / 3,
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
              color: Color.purple,
              fontSize: 36,
              textAlign: 'center',
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
            {/* <CustomButton3 onPress={handelSignin} btnTitle="PROCEED" /> */}
            <CustomButton3 onPress={()=>navigation.navigate('MyDrawer')} btnTitle="PROCEED" />
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
                  color: Color.purple,
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

// import {
//   Image,
//   ScrollView,
//   StyleSheet,
//   Text,
//   ToastAndroid,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import React, {useCallback, useEffect, useState} from 'react';
// import {Color} from '../../Constant';
// import InputText from '../../Components/InputText';
// import CustomButton from '../../Components/CustomButton';
// import PasswordInput from '../../Components/PasswordInput';
// import GoogleSignInButton from '../../Components/GoogleSignInButton';
// import FacebookSigninButton from '../../Components/FacebookSigninButton';
// import CustomTabView from '../../Components/CustomTabView';
// import CustomDropDown from '../../Components/CustomDropDown';
// import axios from 'axios';
// import {BaseUrl} from '../../Constant/BaseUrl';
// import CustomLoader from '../../Components/CustomLoader';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import InputText2 from '../../Components/InputText2';
// import PasswordInput2 from '../../Components/PasswordInput2';

// const Login = ({navigation}: any) => {
//   const [emailOrPhone, setEmailOrPhone] = useState('');
//   const [password, setPassword] = useState('');
//   const [emailOrPhoneError, setEmailOrPhoneError] = useState('');
//   const [passwordError, setPasswordError] = useState('');
//   const [userInfo, setUserInfo] = useState<any>(null);
//   const [loading, setLoading] = useState(false);

//   const handleLogin = () => {
//     navigation.replace('MyDrawer');
//   };
//   const [currentTab, setCurrentTab]: any = useState([
//     {
//       index: 0,
//       name: 'Latest',
//       selected: true,
//     },
//     {
//       index: 1,
//       name: 'Applied',
//       selected: false,
//     },
//   ]);
//   const activateTab = (index: any) => {
//     const newTabs = currentTab.map((e: any) => ({
//       ...e,
//       selected: e.index === index,
//     }));
//     setCurrentTab(newTabs);
//   };

//   const [login, setLogin] = useState<any>({
//     emailOrPhone: '',
//     password: '',
//   });
//   const [errors, setErrors] = useState({
//     emailOrPhone: '',
//     password: '',
//   });
//   const firstRoute = useCallback(() => {
//     let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const verifyEmail = emailRegex.test(login.emailOrPhone)
//     console.log('verifyEmail',verifyEmail);

//     const handelSignin = () => {
//       let newErrors = { emailOrPhone: '', password: ''};
//       let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//       const phoneRegex = /^[0-9]{6}$/;

//       if (!login.emailOrPhone) {
//         newErrors.emailOrPhone = 'Email is required';
//       } else if (!emailRegex.test(login.emailOrPhone)) {
//         newErrors.emailOrPhone = 'Invalid Email';
//       }
//       if (!login.password) {
//         newErrors.password = 'Password is required';
//       }

//       setErrors(newErrors);

//       if (Object.values(newErrors).some(error => error !== '')) {
//         return;
//       }
//       setLoading(true)
//       const formData = new FormData();
//       formData.append('email', login.emailOrPhone);
//       formData.append('password', login.password);
//       axios
//         .post(`${BaseUrl}login`, formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         })
//         .then((response:any)=>{
//           let studentData = response.data
//           console.log('response',response.data);
//           setLoading(false)
//           if(response.data){
//             ToastAndroid.show(
//               `${response.message}`,
//                ToastAndroid.SHORT,
//              );
//              setLogin({
//                emailOrPhone: '',
//                password: '',
//              });
//              let mydata = JSON.stringify(studentData);
//              AsyncStorage.setItem('studentAuth', mydata);
//              navigation.replace('MyDrawer')
//           }
//         })
//         .catch((error)=>{
//           if (error.response) {
//             console.log('register Server responded with data:', error.response.data);
//             console.log('register Status code:', error.response.status);
//             console.log('register Headers:', error.response.headers);
//           } else if (error.request) {
//             console.log('register No response received:', error.request);
//           } else {
//             console.log('Error setting up the request: register', error.message);
//           }
//           setLoading(false)
//         })
//     };
//     return (
//       <View style={{width: '100%'}}>
//         <View style={{marginTop: 20}} />
//         <InputText2
//           label="Enter Email"
//           placeholder="your.email@example.com"
//           onChangeText={(text: any) =>
//             setLogin((prevState: any) => ({
//               ...prevState,
//               emailOrPhone: text,
//             }))
//           }
//           value={login.emailOrPhone}
//           error={errors.emailOrPhone}
//           isCorrect={verifyEmail}
//         />
//         <View style={{marginTop: 20}} />
//         <PasswordInput2
//           label="Password"
//           placeholder="***************"
//           onChangeText={(text: any) =>
//             setLogin((prevState: any) => ({
//               ...prevState,
//               password: text,
//             }))
//           }
//           value={login.password}
//           error={errors.password}
//         />
//         <View>
//           <TouchableOpacity
//             onPress={() => navigation.navigate('ForgotPassword')}
//             activeOpacity={0.8}
//             style={{
//               alignItems: 'flex-end',
//               position: 'relative',
//               marginVertical: 5,
//               top: 12,
//             }}>
//             <Text style={styles.textType2}>Forgot Password?</Text>
//           </TouchableOpacity>
//         </View>
//         <View style={{margin: 8}}></View>
//         <View style={{marginVertical: 20}}>
//           <CustomButton onPress={handelSignin} btnTitle="Sign in" />
//         </View>
//       </View>
//     );
//   }, [login, errors]);

//   const secondRoute = useCallback(() => {
//     const [classesData, setClassesData] = useState('');
//     const [selectedClass, setSelectedClass] = useState<any>('');
//     const [registerData, setRegisterData] = useState<any>({
//       name: '',
//       emailOrPhone: '',
//       password: '',
//     });
//     const [errors, setErrors] = useState({
//       name: '',
//       emailOrPhone: '',
//       password: '',
//     });

//     const handelSignup = () => {
//       let newErrors = {name: '', emailOrPhone: '', password: ''};
//       let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//       const phoneRegex = /^[0-9]{6}$/;

//       if (!registerData.name) {
//         newErrors.name = 'Name is required';
//       }
//       if (!registerData.emailOrPhone) {
//         newErrors.emailOrPhone = 'Email is required';
//       } else if (!emailRegex.test(registerData.emailOrPhone)) {
//         newErrors.emailOrPhone = 'Invalid email or phone';
//       }
//       if (!registerData.password) {
//         newErrors.password = 'Password is required';
//       }

//       setErrors(newErrors);

//       if (Object.values(newErrors).some(error => error !== '')) {
//         return;
//       }
//       setLoading(true);
//       const formData = new FormData();
//       formData.append('name', registerData.name);
//       formData.append('email', registerData.emailOrPhone);
//       formData.append('password', registerData.password);
//       axios
//         .post(`${BaseUrl}register`, formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         })
//         .then((response: any) => {
//           console.log('response', response.data);
//           setLoading(false);
//           if (response.data) {
//             ToastAndroid.show(`${response.message}`, ToastAndroid.SHORT);
//             setRegisterData({
//               name: '',
//               emailOrPhone: '',
//               password: '',
//             });
//             activateTab(0);
//           }
//         })
//         .catch(error => {
//           if (error.response) {
//             console.log(
//               'register Server responded with data:',
//               error.response.data,
//             );
//             console.log('register Status code:', error.response.status);
//             console.log('register Headers:', error.response.headers);
//           } else if (error.request) {
//             console.log('register No response received:', error.request);
//           } else {
//             console.log(
//               'Error setting up the request: register',
//               error.message,
//             );
//           }
//           setLoading(false);
//         });
//     };

//     // const getClassess = () => {
//     //   axios
//     //     .get(`${BaseUrl}classes`)
//     //     .then(response => {
//     //       let classes = response.data;
//     //       console.log('classess====>0',classes);

//     //       const updatedData = classes.map((item: any) => {

//     //         return {
//     //           ...item,
//     //           subject: item.name,
//     //         };
//     //       });
//     //       setClassesData(updatedData);
//     //       console.log(updatedData);
//     //     })
//     //     .catch(error => {
//     //       console.error('There was a problem with the axios request:', error);
//     //     });
//     // };
//     // useEffect(() => {
//     //   getClassess();
//     // }, []);

//     return (
//       <View style={{width: '100%'}}>
//         <View style={{marginTop: 20}} />
//         <InputText
//           label="Name"
//           placeholder="John Deo"
//           required
//           onChangeText={(text: any) =>
//             setRegisterData((prevState: any) => ({
//               ...prevState,
//               name: text,
//             }))
//           }
//           value={registerData.name}
//           error={errors.name}
//         />
//         <View style={{marginTop: 20}} />
//         <InputText
//           label="Enter Email"
//           placeholder="your.email@example.com"
//           onChangeText={(text: any) =>
//             setRegisterData((prevState: any) => ({
//               ...prevState,
//               emailOrPhone: text,
//             }))
//           }
//           value={registerData.emailOrPhone}
//           error={errors.emailOrPhone}
//         />
//         <View style={{marginTop: 20}} />
//         {/* <CustomDropDown
//           setSelectedSubject={setSelectedClass}
//           selectedSubject={selectedClass}
//           ddTitle="Select Classes"
//           dropdownPlace={'Select Subject'}
//           subject={classesData}
//           categoryShow={'subject'}
//         />
//         <View style={{marginTop: 10}} /> */}
//         <PasswordInput
//           label="Password"
//           placeholder="***************"
//           onChangeText={(text: any) =>
//             setRegisterData((prevState: any) => ({
//               ...prevState,
//               password: text,
//             }))
//           }
//           value={registerData.password}
//           error={errors.password}
//         />
//         <View style={{margin: 8}}></View>
//         <View style={{marginVertical: 20}}>
//           <CustomButton onPress={() => handelSignup()} btnTitle="Sign up" />
//         </View>
//       </View>
//     );
//   }, []);

//   return (
//     <View
//       style={{
//         paddingHorizontal: 25,
//         backgroundColor: Color.white,
//         height: '100%',
//       }}>
//       <ScrollView showsVerticalScrollIndicator={false}>
//         <View
//           style={{
//             justifyContent: 'center',
//             alignItems: 'center',
//             marginTop: 20,
//           }}>
//           <Image source={require('../../Images/logo.png')} />
//         </View>
//         <View style={{marginTop: 20}}></View>
//         <Text style={[styles.textType1, {textAlign: 'center'}]}>
//           Welcome to, <Text style={{color: Color.Primary}}>Lerness</Text>
//         </Text>

//         <View style={{marginTop: 30}}></View>
//         <View>
//           <CustomTabView
//             currentTab={currentTab}
//             firstRoute={firstRoute}
//             secondRoute={secondRoute}
//             activateTab={activateTab}
//             firstRouteTitle="Sign in"
//             secondRouteTitle="Sign up"
//           />
//         </View>
//         <View>
//           <View
//             style={{
//               justifyContent: 'space-between',
//               flexDirection: 'row',
//               top: 12,
//             }}>
//             <View
//               style={{
//                 borderWidth: 0.5,
//                 borderColor: Color.lineColor,
//                 width: '30%',
//               }}></View>
//             <View
//               style={{
//                 borderWidth: 0.5,
//                 borderColor: Color.lineColor,
//                 width: '30%',
//               }}></View>
//           </View>

//           <Text style={[styles.textType2, {textAlign: 'center'}]}>
//             or Continue with
//           </Text>
//         </View>
//         <View style={{marginTop: 20}}></View>
//         <View
//           style={{
//             flexDirection: 'row',
//             justifyContent: 'center',
//             marginVertical: 20,
//             gap: 10,
//           }}>
//           <TouchableOpacity
//             activeOpacity={0.8}
//             style={{
//               flexDirection: 'row',
//               gap: 10,
//               borderWidth: 2,
//               width: 160,
//               paddingVertical: 10,
//               borderRadius: 30,
//               borderColor: Color.liteGrey,
//               alignItems: 'center',
//               justifyContent: 'center',
//             }}>
//             <Image source={require('../../Images/google.png')} />
//             <Text style={styles.textType2}>Google</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             activeOpacity={0.8}
//             style={{
//               flexDirection: 'row',
//               gap: 10,
//               borderWidth: 2,
//               width: 160,
//               paddingVertical: 10,
//               borderRadius: 30,
//               borderColor: Color.liteGrey,
//               alignItems: 'center',
//               justifyContent: 'center',
//             }}>
//             <Image source={require('../../Images/facebook.png')} />
//             <Text style={styles.textType2}>Facebook</Text>
//           </TouchableOpacity>
//         </View>
//         <View style={{marginTop: 10}}></View>
//         {/* <TouchableOpacity
//           activeOpacity={0.8}
//           onPress={() => {
//             const currentIndex = currentTab.findIndex(
//               (tab: any) => tab.selected,
//             );
//             const nextIndex = currentIndex === 0 ? 1 : 0;
//             activateTab(nextIndex);
//           }}
//           style={{
//             alignItems: 'center',
//             justifyContent: 'center',
//             marginBottom: 15,
//             flexDirection: 'row',
//           }}>
//           <Text
//             style={{
//               color: Color.IronsideGrey,
//               alignSelf: 'center',
//               fontFamily: 'Circular Std Medium',
//               fontSize: 16,
//             }}>
//             {currentTab[1].selected
//               ? 'Already have an Account?'
//               : 'Don’t have an Account?'}
//           </Text>
//           <View style={{flexDirection: 'row', gap: 4}}>
//             <Text
//               style={{
//                 color: Color.IronsideGrey,
//                 fontSize: 16,
//                 fontFamily: 'Circular Std Medium',
//               }}>
//               Let’s
//             </Text>
//             <Text
//               style={{
//                 color: Color.Dune,
//                 fontSize: 16,
//                 borderBottomWidth: 2,
//                 borderBottomColor: Color.Primary,
//                 fontFamily: 'Circular Std Medium',
//               }}>
//               {currentTab[1].selected ? 'Sign in' : 'Sign up'}
//             </Text>
//           </View>
//         </TouchableOpacity> */}
//       </ScrollView>
//       <CustomLoader visible={loading} />
//     </View>
//   );
// };

// export default Login;

// const styles = StyleSheet.create({
//   label: {
//     color: Color.Dune,
//     fontFamily: 'Circular Std Bold',
//     fontSize: 16,
//   },
//   textType2: {
//     color: Color.IronsideGrey,
//     fontWeight: '500',
//     fontSize: 16,
//     fontFamily: 'Circular Std Medium',
//   },
//   textType1: {
//     color: Color.IronsideGrey,
//     fontWeight: '500',
//     fontSize: 24,
//     fontFamily: 'Circular Std Medium',
//   },
// });
