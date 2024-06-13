import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Color} from '../../Constant';
import Header from '../../Components/Header';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BaseUrl, profileImage} from '../../Constant/BaseUrl';
import RightArrowSvg from '../../Svgs/RightArrowSvg';

const ProfileMenu = ({navigation}: any) => {
  const [userProfile, setUserProfile] = useState<any>();
  const [loading, setLoading] = useState(false);
  const focus = useIsFocused();

  const getDataFromStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('studentAuth');
      if (jsonValue !== null) {
        const data = JSON.parse(jsonValue);
        console.log('Retrieved data:', data.token);
        axios
          .get(`${BaseUrl}users`, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${data.token}`,
            },
          })
          .then(response => {
            console.log('response=====?', response.data);
            setUserProfile(response.data.user);
            setLoading(false);
          })
          .catch(error => {
            setLoading(false);
            if (error.response) {
              console.log(
                'register Server responded with data:',
                error.response.data,
              );
              navigation.replace('Login');
              console.log('register Status code:', error.response.status);
              console.log('register Headers:', error.response.headers);
            } else if (error.request) {
              console.log('register No response received:', error.request);
            } else {
              console.log(
                'Error setting up the request: register',
                error.message,
              );
            }
          });
      } else {
        console.log('No data found in AsyncStorage for key studentAuth');
        return null;
      }
    } catch (error) {
      console.error('Error retrieving data from AsyncStorage:', error);
      return null;
    }
  };

  useEffect(() => {
    getDataFromStorage();
  }, [focus]);

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
    navigation.replace('Login');
  };
  const CancelButton = () => {
    handleCloseModal();
  };
  return (
    <View
      style={{
        backgroundColor: Color.GhostWhite,
        height: '100%',
      }}>
      <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled>
        <View style={{paddingHorizontal: 25, marginBottom: 20}}>
          <Header title={'Profile'} navigation={navigation} />
          <View style={{margin: 10}}></View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile')}
            activeOpacity={0.8}
            style={{
              flexDirection: 'row',
              gap: 10,
              paddingVertical: 20,
              alignItems: 'center',
              width: '100%',
              justifyContent: 'space-between',
              marginBottom: 0,
              backgroundColor: Color.white,
              borderRadius: 20,
              padding: 10,
              paddingHorizontal: 15,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
              <View>
                <Image
                  source={{
                    uri: userProfile?.full_image_url
                      ? userProfile?.full_image_url
                      : `${profileImage}/storage/users/UserImage.png`,
                  }}
                  style={{
                    width: 65,
                    height: 65,
                    borderRadius: 50,
                    borderWidth: 2,
                    borderColor: Color.Primary,
                  }}
                />
              </View>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 5,
                    alignItems: 'center',
                  }}></View>
                <Text
                  style={[
                    styles.textType1,
                    {lineHeight: 35, fontSize: 24, textTransform: 'capitalize'},
                  ]}>
                  {userProfile?.name ? userProfile?.name : 'Testing'}
                </Text>
                <Text
                  style={[styles.textType3, {fontFamily: 'Circular Std Book'}]}>
                  {userProfile?.email
                    ? userProfile?.email
                    : 'testing@gmail.com'}
                </Text>
              </View>
            </View>
            <RightArrowSvg />
          </TouchableOpacity>
        </View>

        {/* dashboard */}
        <View style={{paddingHorizontal: 25, marginBottom: 30}}>
          <Text
            style={[
              styles.textType3,
              {
                paddingBottom: 10,
                fontFamily: 'Circular Std Book',
                color: Color.IronsideGrey,
              },
            ]}>
            Dashboard
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('StudentCourses')}
            activeOpacity={0.8}
            style={{
              flexDirection: 'row',
              gap: 10,
              paddingVertical: 20,
              alignItems: 'center',
              width: '100%',
              justifyContent: 'space-between',
              marginBottom: 15,
              backgroundColor: Color.white,
              borderRadius: 20,
              padding: 10,
              paddingHorizontal: 15,
            }}>
            <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
              <Image
                source={require('../../Images/classes.png')}
                style={{width: 15, height: 15}}
              />
              <Text style={[styles.textType3]}>My Courses</Text>
            </View>
            <RightArrowSvg />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Wishlist')}
            activeOpacity={0.8}
            style={{
              flexDirection: 'row',
              gap: 10,
              paddingVertical: 20,
              alignItems: 'center',
              width: '100%',
              justifyContent: 'space-between',
              marginBottom: 15,
              backgroundColor: Color.white,
              borderRadius: 20,
              padding: 10,
              paddingHorizontal: 15,
            }}>
            <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
              <Image
                source={require('../../Images/classes.png')}
                style={{width: 15, height: 15}}
              />
              <Text style={[styles.textType3]}>Wish list</Text>
            </View>
            <RightArrowSvg />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('CourseProgress')}
            activeOpacity={0.8}
            style={{
              flexDirection: 'row',
              gap: 10,
              paddingVertical: 20,
              alignItems: 'center',
              width: '100%',
              justifyContent: 'space-between',
              marginBottom: 15,
              backgroundColor: Color.white,
              borderRadius: 20,
              padding: 10,
              paddingHorizontal: 15,
            }}>
            <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
              <Image
                source={require('../../Images/classes.png')}
                style={{width: 15, height: 15}}
              />
              <Text style={[styles.textType3]}>Courses Progress</Text>
            </View>
            <RightArrowSvg />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('LiveSessionsList')}
            activeOpacity={0.8}
            style={{
              flexDirection: 'row',
              gap: 10,
              paddingVertical: 20,
              alignItems: 'center',
              width: '100%',
              justifyContent: 'space-between',
              marginBottom: 15,
              backgroundColor: Color.white,
              borderRadius: 20,
              padding: 10,
              paddingHorizontal: 15,
            }}>
            <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
              <Image
                source={require('../../Images/classes.png')}
                style={{width: 15, height: 15}}
              />
              <Text style={[styles.textType3]}>Schedule Sessions</Text>
            </View>
            <RightArrowSvg />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Subscriptions')}
            activeOpacity={0.8}
            style={{
              flexDirection: 'row',
              gap: 10,
              paddingVertical: 20,
              alignItems: 'center',
              width: '100%',
              justifyContent: 'space-between',
              marginBottom: 15,
              backgroundColor: Color.white,
              borderRadius: 20,
              padding: 10,
              paddingHorizontal: 15,
            }}>
            <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
              <Image
                source={require('../../Images/classes.png')}
                style={{width: 15, height: 15}}
              />
              <Text style={[styles.textType3]}>Subscription</Text>
            </View>
            <RightArrowSvg />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('GuardianDetail')}
            activeOpacity={0.8}
            style={{
              flexDirection: 'row',
              gap: 10,
              paddingVertical: 20,
              alignItems: 'center',
              width: '100%',
              justifyContent: 'space-between',
              marginBottom: 15,
              backgroundColor: Color.white,
              borderRadius: 20,
              padding: 10,
              paddingHorizontal: 15,
            }}>
            <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
              <Image
                source={require('../../Images/classes.png')}
                style={{width: 15, height: 15}}
              />
              <Text style={[styles.textType3]}>Guardian Details</Text>
            </View>
            <RightArrowSvg />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleFilterPress}
            activeOpacity={0.8}
            style={{
              flexDirection: 'row',
              gap: 10,
              paddingVertical: 20,
              alignItems: 'center',
              width: '100%',
              justifyContent: 'space-between',
              marginBottom: 15,
              backgroundColor: Color.white,
              borderRadius: 20,
              padding: 10,
              paddingHorizontal: 15,
            }}>
            <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
              <Image
                source={require('../../Images/classes.png')}
                style={{width: 15, height: 15}}
              />
              <Text style={[styles.textType3]}>Logout</Text>
            </View>
          </TouchableOpacity>
        </View>

        <Modal visible={modalVisible} animationType="fade" transparent={true}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              paddingHorizontal: 30,
              backgroundColor: 'rgba(0, 0, 0, 0.5)', 
            }}>
            <View style={[styles.modalContainer, {padding: 30}]}>
              <Text
                style={[styles.textType1,{textAlign:'center', lineHeight:35}]}>
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
                    paddingVertical: 10,
                    borderRadius: 50,
                    borderColor: Color.textColor,
                    alignItems: 'center',
                    width: 150,
                    backgroundColor: cancel ? Color.Primary : 'white',
                  }}>
                  <Text
                    style={[styles.textType3,{ color: cancel ? 'white' : Color.Primary,fontSize:18}]}>
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
                    paddingVertical: 10,
                    borderRadius: 50,
                    borderColor: Color.textColor,
                    alignItems: 'center',
                    width: 150,
                    backgroundColor: apply ? 'white' : Color.Primary,
                  }}>
                  <Text
                       style={[styles.textType3,{ color: apply ? Color.Primary : 'white',fontSize:18}]}>
                    Yes
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

export default ProfileMenu;

const styles = StyleSheet.create({
  textType3: {
    color: Color.Dune,
    fontWeight: '500',
    fontSize: 16,
    fontFamily: 'Circular Std Medium',
    fontStyle: 'normal',
  },
  textType1: {
    fontWeight: '500',
    fontSize: 26,
    color: Color.Black,
    fontFamily: 'Circular Std Medium',
    lineHeight: 24,
    fontStyle: 'normal',
  },
  modalContainer: {
    // flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#fff',
    borderColor: Color.textColor,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
});
