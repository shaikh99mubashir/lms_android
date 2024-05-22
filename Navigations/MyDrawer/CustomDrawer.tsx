
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Image,
    Dimensions,
    TouchableOpacity,
    Modal,
  } from 'react-native';
  import React, {useCallback, useState} from 'react';
  import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
  import {
    DrawerContentScrollView,
    DrawerItemList,
  } from '@react-navigation/drawer';
  import Icon from 'react-native-vector-icons/Ionicons';
import { Color } from '../../Constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
  
  const CustomDrawer = (props: any) => {
    console.log("props",props);
    
    const height = Dimensions.get('window').height;
    const width = Dimensions.get('window').width;
    // const share = async () => {
    //   console.log('running share');
  
    //   const options = {
    //     message:
    //       'Deserunt ea sint magna dolor incididunt sit culpa id laborum cupidatat commodo do sint.',
    //     url: 'https://mubashir.co.in',
    //     email: 'mubashir@gmail.com',
    //     subject: 'Eiusmod esse veniam esse.',
    //     recipient: '919988998899',
    //   };
  
    //   try {
    //     const res = await Share.open(options);
    //     console.log(res);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
    const [modalVisible, setModalVisible] = useState(false);
    const handleFilterPress = () => {
      setModalVisible(true);
    };
    const handleCloseModal = () => {
      setModalVisible(false);
    };
  
    const [apply, setApply] = useState(false);
    const [cancel, setCancel] = useState(false);
  
    const ApplyButton = () => {
      handleCloseModal();
      AsyncStorage.removeItem('studentAuth');
      props.navigation.replace('Login');
    };
    const CancelButton = () => {
      handleCloseModal();
    };
    return (
      <View style={{flex: 1}}>
        <DrawerContentScrollView
          contentContainerStyle={{
            backgroundColor: Color.GhostWhite,
            height:'100%'
          }}>
          <View style={{alignItems: 'center', marginTop: 10}}>
            <Image
              source={require('../../Images/user-image.png')}
              style={{height: 80, width: 80, borderRadius: 5, marginBottom: 15}}
            />
            <Text
              style={{
                color: '#000',
                fontSize: 18,
                fontFamily: 'Circular Std Medium',
                marginBottom: 5,
              }}>
              John Doe
            </Text>
          </View>
  
          <View
            style={{
              flex: 1,
              backgroundColor: Color.GhostWhite,
              paddingTop: 10,
              paddingBottom: 20,
              borderTopWidth: 1,
              borderTopColor: '#ccc',
              height:'100%'
            }}>
            <DrawerItemList {...props} back />
            {/* <TouchableOpacity
              activeOpacity={0.8}
            //   onPress={() => share()}
              style={{
                flexDirection: 'row',
                gap: 5,
                marginLeft: 20,
                marginTop: 15,
              }}>
              <Icon name="paper-plane" size={22} color="#000" />
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: 15,
                  color: 'black',
                }}>
                Share
              </Text>
            </TouchableOpacity> */}
          </View>
        </DrawerContentScrollView>
        <View
          style={{
            padding: 5,
            paddingLeft: 15,
            backgroundColor: Color.GhostWhite,
            borderTopWidth: 1,
            borderTopColor: '#ccc',
          }}>
          {/* <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              props.navigation.navigate('EnrollStar');
            }}
            style={{paddingVertical: 15}}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
              <Icon name="ios-star-half" size={22} color="white" />
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: 'Roboto-Medium',
                  marginLeft: 5,
                  color: 'white',
                }}>
                Enroll as Star
              </Text>
            </View>
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={handleFilterPress}
            style={{paddingVertical: 10}}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
              <Icon name="exit-outline" size={22} color="black" />
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: 'Roboto-Medium',
                  marginLeft: 5,
                  color: 'black',
                }}>
                Log Out
              </Text>
            </View>
          </TouchableOpacity>
          <Modal visible={modalVisible} animationType="fade" transparent={true}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                marginHorizontal: 60,
              }}>
              <View style={[styles.modalContainer, {padding: 30}]}>
                <Text
                  style={{
                    color: Color.textColor,
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}>
                  Are you sure you want to Quit ?
                </Text>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    gap: 10,
                    marginTop: 20,
                    marginBottom: 20,
                  }}>
                  <TouchableOpacity
                    onPressIn={() => setCancel(true)}
                    onPressOut={() => setCancel(false)}
                    onPress={CancelButton}
                    activeOpacity={0.8}
                    style={{
                      borderWidth: 1,
                      paddingVertical: 5,
                      borderRadius: 50,
                      borderColor: Color.textColor,
                      alignItems: 'center',
                      width: 100,
                      backgroundColor: cancel ? Color.Primary : 'white',
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: 'Poppins-SemiBold',
                        color: cancel ? 'white' : Color.Primary,
                      }}>
                      No
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPressIn={() => setApply(true)}
                    onPressOut={() => setApply(false)}
                    onPress={ApplyButton}
                    activeOpacity={0.8}
                    style={{
                      borderWidth: 1,
                      paddingVertical: 5,
                      borderRadius: 50,
                      borderColor: Color.textColor,
                      alignItems: 'center',
                      width: 100,
                      backgroundColor: apply ? 'white' : Color.Primary,
                    }}>
                    <Text
                      style={{
                        color: apply ? Color.Primary : 'white',
  
                        fontSize: 16,
                        fontFamily: 'Poppins-SemiBold',
                      }}>
                      Yes
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          <View
            style={{
              flexDirection: 'row',
              gap: 20,
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: 10,
            }}>
            <TouchableOpacity>
              <Icon name="logo-facebook" size={25} color="black" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon name="logo-instagram" size={25} color="black" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon name="logo-youtube" size={25} color="black" />
            </TouchableOpacity>
            <TouchableOpacity>
              {/* <Image
                source={require('../../Images/tik.png')}
                style={{width: 25, height: 25}}
              /> */}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  
  export default CustomDrawer;
  
  const styles = StyleSheet.create({
    modalContainer: {
      // flex: 1,
      alignItems: 'center',
      // justifyContent: 'center',
      backgroundColor: '#fff',
      borderColor: Color.textColor,
      borderRadius: 10,
      paddingHorizontal: 10,
    },
    modalText: {
      color: 'black',
      fontSize: 14,
      fontFamily: 'Poppins-Regular',
    },
    closeButton: {
      backgroundColor: '#fff',
      borderRadius: 5,
    },
    closeButtonText: {
      color: Color.mainColor,
      fontWeight: 'bold',
      textAlign: 'right',
      paddingHorizontal: 10,
    },
  });
  