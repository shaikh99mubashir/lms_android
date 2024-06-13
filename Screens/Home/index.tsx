import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../Components/Header';
import {Color} from '../../Constant';
import SearchBar from '../../Components/SearchBar';
import CustomButton from '../../Components/CustomButton';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Carousel2 from '../../Components/Carousel2';
import RNVideo from '../../Components/RNVideo';
import axios from 'axios';
import {BaseUrl, profileImage} from '../../Constant/BaseUrl';
import {useIsFocused} from '@react-navigation/native';
import CustomLoader from '../../Components/CustomLoader';
import SwipeableButton from '../../Components/SwipeableButton';

const Home = ({navigation}: any) => {
  const [userInfo, setUserInfo] = useState<any>();
  const [userProfile, setUserProfile] = useState<any>();
  const focus = useIsFocused();
  const [loading, setLoading] = useState(false);
  const [slider, setSlider] = useState([]);
  const width = Dimensions.get('window').width;
  const getDataFromStorage = async () => {
    setLoading(true);
    try {
      const jsonValue = await AsyncStorage.getItem('studentAuth');
      if (jsonValue !== null) {
        const data = JSON.parse(jsonValue);
        console.log('Retrieved data:', data.token);
        setUserInfo(data.user);
        axios
          .get(`${BaseUrl}getsliderimages`, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${data.token}`,
            },
          })
          .then(response => {
            console.log('response=====?', response.data);
            setSlider(response.data);
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

  const data = [
    {id: '1', title: 'Most Enroll Classes', jtuid: 'J9003428', mode: 'online'},
    {id: '2', title: 'Class One', jtuid: 'J9003428', mode: 'Physical'},
    {id: '3', title: 'Class Two', jtuid: 'J9003428', mode: 'online'},
    {id: '4', title: 'Class Three', jtuid: 'J9003428', mode: 'online'},
    {id: '5', title: 'Class Four', jtuid: 'J9003428', mode: 'online'},
    {id: '6', title: 'Class Five', jtuid: 'J9003428', mode: 'online'},
    {id: '7', title: 'Class Six', jtuid: 'J9003428', mode: 'online'},
    {id: '8', title: 'Class Seven', jtuid: 'J9003428', mode: 'online'},
    {id: '9', title: 'Class Eight', jtuid: 'J9003428', mode: 'online'},
    {id: '10', title: 'Class Nine', jtuid: 'J9003428', mode: 'online'},
    {id: '11', title: 'Class Ten', jtuid: 'J9003428', mode: 'online'},
  ];
  const [selectedJT, setSelectedJT] = useState(0);
  const handelJobTicketPress = (item: any) => {
    setSelectedJT(item.id === selectedJT ? null : item.id);
  };

  const [selectedItem, setSelectedItem] = useState(data[0].id);
  const [selectedClass, setSelectedClass] = useState('Most Enroll Classes');
  console.log('selectedClass', selectedClass);
  const renderSubject = ({item}: any) => {
    const isSelected = selectedItem === item.id;
    const handelSubjectPress = (item: any) => {
      setSelectedItem(item.id);
      setSelectedClass(item.title);
      console.log(item);
    };
    return (
      <TouchableOpacity
        onPress={() => handelSubjectPress(item)}
        style={{
          paddingHorizontal: 15,
          height: 30,
          borderBottomWidth: isSelected ? 2 : 0,
          alignItems: 'center',
          justifyContent: 'center',
          borderBottomColor: '#0033ff',
          // borderBottomColor: isSelected ? Color.Primary : Color.shinyGrey,
          marginTop: 12,
          // backgroundColor: isSelected ? Color.Primary : Color.PattensBlue,
          borderRadius: 30,
          paddingBottom: 10,
        }}>
        <Text
          style={[
            styles.textType3,
            {color: isSelected ? '#0033ff' : '#A0A4AB'},
          ]}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  const subjectData = [
    {
      id: '2',
      title: 'English',
      rating: 4.4,
      users: 10,
      image: require('../../Images/courses.png'),
      type: 'trending',
      class: 'class one',
    },
    {
      id: '3',
      title: 'Physic',
      rating: 4.4,
      users: 10,
      image: require('../../Images/physic.png'),
      type: 'trending',
      class: 'class one',
    },
    {
      id: '1',
      title: 'Mathematics',
      rating: 4.4,
      users: 10,
      image: require('../../Images/maths.png'),
      type: 'trending',
      class: 'class two',
    },
    {
      id: '4',
      title: 'Chemistry',
      rating: 4.4,
      users: 10,
      image: require('../../Images/courses.png'),
      type: 'trending',
      class: 'class four',
    },
    {
      id: '5',
      title: 'Biology',
      rating: 4.4,
      users: 10,
      image: require('../../Images/courses.png'),
      type: 'trending',
      class: 'class four',
    },
    // Add more dummy data objects as needed
  ];
  const renderItem = ({item}: any) => (
    <View
      style={{
        backgroundColor: Color.white,
        marginBottom: 15,
        marginHorizontal: 25,
        borderRadius: 20,
      }}>
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: 25,
          paddingHorizontal: 12,
          justifyContent: 'space-between',
        }}>
        <Text
          style={[
            styles.textType3,
            {
              color: Color.white,
              backgroundColor:
                item.type == 'trending'
                  ? '#0033ff'
                  : item.type == 'top rated'
                  ? 'blue'
                  : item.type == 'most popular'
                  ? Color.Yellow
                  : Color.Primary,

              fontSize: 16,
              textTransform: 'capitalize',
              textAlign: 'center',
              marginLeft: 5,
              paddingHorizontal: 15,
              paddingVertical: 5,
              borderRadius: 30,
            },
          ]}>
          {item.type}
        </Text>
        <Ionicons
          name="bookmark-outline"
          size={19}
          color={Color.Black}
          // style={{right: -2, top: -5}}
        />
      </View>
      <Text style={[styles.textType1, {marginLeft: 15, marginTop: 0}]}>
        English
      </Text>
      <Text
        style={[
          styles.textType3,
          {
            fontFamily: 'Circular Std Book',
            color: Color.DustyGrey,
            marginLeft: 15,
            marginTop: 4,
            fontSize: 14,
          },
        ]}>
        Build a Strong Foundation in English
      </Text>
      <View style={{margin: 5}} />
      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            borderTopWidth: 1,
            borderColor: Color.lineColor,
            width: '60%',
          }}>
          <View
            style={{
              flexDirection: 'row',
              gap: 20,
              marginLeft: 15,
              marginTop: 5,
            }}>
            <View style={{flexDirection: 'row', gap: 10, marginTop: 10}}>
              <AntDesign name="staro" size={20} color={Color.Primary} />
              <Text style={styles.textType3}>{item.rating}</Text>
            </View>
            <View style={{flexDirection: 'row', gap: 10, marginTop: 10}}>
              <Feather
                name="users"
                size={19}
                color={Color.Primary} // Make sure Color.Primary is defined or replace it with a color value
              />
              <Text style={styles.textType3}>{item.users}</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            backgroundColor: Color.white,
            flexDirection: 'row',
            gap: 10,
            height: 49,
            width: '40%',
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomRightRadius: 20,
            borderTopWidth: 1,
            borderColor: Color.lineColor,
            borderLeftWidth: 1,
          }}>
          <Text style={[styles.textType3, {color: Color.Primary}]}>
            View Course
          </Text>
          <Ionicons
            name="arrow-forward-sharp"
            size={20}
            color={Color.Primary}
          />
        </View>
      </View>
    </View>
  );
  const [filterSubject, setFilterSubject] = useState<any>([]);
  useEffect(() => {
    // Filter subjectData based on the selected class ID
    if (selectedClass === 'Most Enroll Classes') {
      setFilterSubject(subjectData);
    } else {
      const filteredData = subjectData.filter(
        item => item.class.toLowerCase() === selectedClass.toLowerCase(),
      );
      setFilterSubject(filteredData);
    }
  }, [selectedClass]);

  const [isLoading, setIsLoading] = useState(false);
  const makeSomeRequest = () => {};
  return (
    <View
      style={{
        backgroundColor: Color.lmsBG,
        height: '100%',
      }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{paddingHorizontal: 25}}>
          <View style={{margin: 12}} />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{}}>
              {/* <Text style={styles.textType3}>Welcome Back!</Text> */}
              <Text
                style={[
                  styles.textType1,
                  {
                    color: Color.Primary,
                    fontSize: 30,
                    textTransform: 'capitalize',
                  },
                ]}>
                {userProfile?.name}
              </Text>
              <Text style={styles.textType3}>
                Let's Found your favorite Courses
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 15}}>
              <TouchableOpacity
                onPress={() => navigation.navigate('NotificationsList')}>
                <Ionicons
                  name="notifications-outline"
                  size={25}
                  color={'black'}
                />
              </TouchableOpacity>
            </View>
          </View>
         
          {/* <Header
            navigation={navigation}
            drawerBtn
            notification
            profileImage={userProfile?.full_image_url}
          /> */}
          {/* <Text
            style={[
              styles.textType1,
              {color: Color.Primary, fontSize: 30, textTransform: 'capitalize'},
            ]}>
            {userProfile?.name}
          </Text>
          <View style={{margin: 2}} />
          <Text style={[styles.textType3, {fontSize: 16}]}>
            Let's Found your favorite Courses
          </Text> */}
          <View style={{margin: 20}} />

          <Carousel2 sliderData={slider} />
          <View style={{margin: 11}} />
          <View
            style={{ 
              justifyContent: 'space-between',
              flexDirection: 'row',
              marginHorizontal: 10,
            }}>
            <Text style={[styles.textType1]}>Classes</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('AllClassess')}>
              <Text
                style={[
                  styles.textType3,
                  {color: Color.BrightBlue, fontFamily: 'Circular Std Book'},
                ]}>
                View All
              </Text>
            </TouchableOpacity>
          </View>

          <View>
            <FlatList
              data={data}
              renderItem={renderSubject}
              keyExtractor={item => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
        <View style={{margin: 3}}></View>
        <View>
          {filterSubject.length > 0 ? (
            <FlatList
              data={filterSubject}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Image
                source={require('../../Images/nodatafound.png')}
                resizeMode="cover"
                style={{width: 350, height: 350}}
              />
            </View>
          )}
        </View>
        <CustomLoader visible={loading} />
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  textType3: {
    color: Color.Dune,
    fontSize: 16,
    fontFamily: 'Circular Std Medium',
  },
  textType1: {
    fontSize: 22,
    color: Color.Black,
    fontFamily: 'Circular Std Medium',
  },
});
