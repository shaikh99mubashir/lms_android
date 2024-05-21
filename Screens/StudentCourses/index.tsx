import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BaseUrl} from '../../Constant/BaseUrl';
import {Color} from '../../Constant';
import Header from '../../Components/Header';
import SearchBar from '../../Components/SearchBar';
import CustomTabView from '../../Components/CustomTabView';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomTabView3 from '../../Components/CustomTabView3';

const StudentCourses = ({navigation}: any) => {
  const [studentCourses, setStudentCourses] = useState([]);
  console.log('studentCourses========>', studentCourses);

  const getStudentCourses = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('studentAuth');
      if (jsonValue !== null) {
        const data = JSON.parse(jsonValue);
        console.log('Retrieved data:', data.token);
        axios
          .get(`${BaseUrl}my-courses`, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${data.token}`,
            },
          })
          .then(response => {
            console.log('response', response.data);
            let studentCourses = response.data;
            setStudentCourses(studentCourses);
          })
          .catch(error => {
            console.log('error', error);
          });
      } else {
        console.log('No data found in AsyncStorage for key studentAuth');
      }
    } catch (error) {
      console.error('Error retrieving data from AsyncStorage:', error);
      return null;
    }
  };

  // useEffect(() => {
  //   getStudentCourses();
  // }, []);
  const renderItem = ({item}: any) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('CoursesVideos', item)}
        style={{justifyContent: 'center', alignItems: 'center'}}>
        <View
          style={[
            styles.Box,
            {
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 0,
              marginBottom: 10,
            },
          ]}>
          <Text
            style={{
              color: 'black',
              fontFamily: 'Circular Std Book',
              fontSize: 18,
            }}>
            {item.name}
          </Text>
          {/* <Text
            style={{
              color: 'black',
              fontFamily: 'Circular Std Book',
              fontSize: 16,
            }}>
            {item.description}
          </Text> */}
        </View>
      </TouchableOpacity>
    );
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
    console.log('newTabs', newTabs);

    setCurrentTab(newTabs);
  };

  const firstRoute = useCallback(() => {
    const coursesData = [
      {
        id: 1,
        name: 'Algebra I',
        description: 'Introduction to algebraic expressions and equations.',
      },
      {
        id: 2,
        name: 'Geometry',
        description: 'Study of shapes, sizes, and properties of space.',
      },
      {
        id: 3,
        name: 'Calculus I',
        description: 'Fundamentals of limits, derivatives, and integrals.',
      },
      {
        id: 4,
        name: 'Statistics',
        description:
          'Basics of data collection, analysis, interpretation, and presentation.',
      },
      {
        id: 5,
        name: 'Trigonometry',
        description: 'Exploration of angles and their relationships.',
      },
      {
        id: 6,
        name: 'Linear Algebra',
        description: 'Understanding vector spaces and linear mappings.',
      },
      {
        id: 7,
        name: 'Differential Equations',
        description: 'Study of equations involving derivatives of functions.',
      },
      {
        id: 8,
        name: 'Discrete Mathematics',
        description: 'Introduction to mathematical structures and algorithms.',
      },
      {
        id: 9,
        name: 'Number Theory',
        description: 'Exploration of integers and integer-valued functions.',
      },
      {
        id: 10,
        name: 'Mathematical Logic',
        description: 'Study of formal systems and symbolic reasoning.',
      },
    ];

    const renderItem = ({item}: any) => {
      return (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('OngoingDetail', item)}>
          <View
            style={{
              backgroundColor: Color.white,
              borderRadius: 16,
              flexDirection: 'row',
              gap: 10,
              marginBottom: 10,
            }}>
            <Image
              source={require('../../Images/login.png')}
              style={{
                width: 150,
                height: 150,
                borderTopLeftRadius: 16,
                borderBottomLeftRadius: 16,
              }}
            />
            <View style={{flexDirection: 'column', paddingVertical: 10}}>
              <Text
                style={[styles.textType3, {color: '#ff6b00', fontSize: 16}]}>
                Tending
              </Text>
              <View style={{margin: 3}} />
              <Text style={[styles.textType3, {fontSize: 18}]}>
                {item.name}
              </Text>
              <View style={{margin: 3}} />
              <Text style={[styles.textType3, {fontSize: 16, width: '100%'}]}>
                {item.description.slice(0, 20)} ...
              </Text>
              <View style={{margin: 3}} />
              <View style={{flexDirection: 'row', gap: 10}}>
                <View style={{flexDirection: 'row', gap: 5}}>
                  <FontAwesome name="star" size={20} color={Color.Yellow} />
                  <Text style={styles.textType3}>4.4</Text>
                </View>
                <View style={{flexDirection: 'row', gap: 5}}>
                  <FontAwesome name="clock-o" size={20} color={Color.Black} />
                  <Text style={styles.textType3}>12 Hrs </Text>
                </View>
              </View>
              <View style={{margin: 3}} />
              <View
                style={{
                  backgroundColor: Color.lineColor,
                  height: 10,
                  borderRadius: 10,
                }}>
                <View
                  style={{
                    backgroundColor: Color.Primary,
                    height: '100%',
                    width: '25%',
                    borderRadius: 10,
                  }}
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    };
    return (
      <View>
        <View style={{margin: 10}} />
        <FlatList
          data={coursesData}
          renderItem={renderItem}
          keyExtractor={(item: any) => item.id}
        />
      </View>
    );
  }, []);
  const secondRoute = useCallback(() => {
    const coursesData = [
      {
        id: 1,
        name: 'Algebra I',
        description: 'Introduction to algebraic expressions and equations.',
      },
      {
        id: 2,
        name: 'Geometry',
        description: 'Study of shapes, sizes, and properties of space.',
      },
      {
        id: 3,
        name: 'Calculus I',
        description: 'Fundamentals of limits, derivatives, and integrals.',
      },
      {
        id: 4,
        name: 'Statistics',
        description:
          'Basics of data collection, analysis, interpretation, and presentation.',
      },
      {
        id: 5,
        name: 'Trigonometry',
        description: 'Exploration of angles and their relationships.',
      },
      {
        id: 6,
        name: 'Linear Algebra',
        description: 'Understanding vector spaces and linear mappings.',
      },
      {
        id: 7,
        name: 'Differential Equations',
        description: 'Study of equations involving derivatives of functions.',
      },
      {
        id: 8,
        name: 'Discrete Mathematics',
        description: 'Introduction to mathematical structures and algorithms.',
      },
      {
        id: 9,
        name: 'Number Theory',
        description: 'Exploration of integers and integer-valued functions.',
      },
      {
        id: 10,
        name: 'Mathematical Logic',
        description: 'Study of formal systems and symbolic reasoning.',
      },
    ];

    const renderItem = ({item}: any) => {
      return (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('CourseDetail', item)}>
          <View
            style={{
              backgroundColor: Color.white,
              borderRadius: 16,
              flexDirection: 'row',
              gap: 10,
              marginVertical:10,
            }}>
            <Image
              source={require('../../Images/login.png')}
              style={{
                width: 150,
                height: 150,
                borderTopLeftRadius: 16,
                borderBottomLeftRadius: 16,
              }}
            />
            <View style={{flexDirection: 'column', paddingVertical: 10}}>
            <View style={{position:'absolute',right:0, top:-10, zIndex:1}}>
            <AntDesign name="checkcircle" size={25} color={'green'} />
            </View>
              <Text
                style={[styles.textType3, {color: '#ff6b00', fontSize: 16}]}>
                Tending
              </Text>
              <View style={{margin: 3}} />
              <Text style={[styles.textType3, {fontSize: 18}]}>
                {item.name}
              </Text>
              <View style={{margin: 3}} />
              <Text style={[styles.textType3, {fontSize: 16, width: '100%'}]}>
                {item.description.slice(0, 20)} ...
              </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('CourseDetail', item)}
                style={{
                  paddingHorizontal: 15,
                  height: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 20,
                  backgroundColor: Color.Primary,
                  borderRadius: 16,
                }}>
                <Text
                  style={[
                    styles.textType3,
                    {color: Color.white, fontSize: 18}, // Make sure Color.white is defined or replace it with a color value
                  ]}>
                  View Certificate
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      );
    };
    return (
      <View>
        <View style={{margin: 10}} />
        <FlatList
          data={coursesData}
          renderItem={renderItem}
          keyExtractor={(item: any) => item.id}
        />
      </View>
    );
  }, []);

  return (
    <View
      style={{
        backgroundColor: Color.GhostWhite,
        height: '100%',
        paddingHorizontal: 25,
      }}>
      <Header goBack title="Student Courses" navigation={navigation} />
      <ScrollView>
        {/* <FlatList
          data={studentCourses}
          renderItem={renderItem}
          keyExtractor={(item:any) => item.id}
        /> */}
        <View style={{marginTop: 10}}>
          <CustomTabView3
            currentTab={currentTab}
            firstRoute={firstRoute}
            secondRoute={secondRoute}
            activateTab={activateTab}
            firstRouteTitle="Ongoing"
            secondRouteTitle={`Completed`}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default StudentCourses;

const styles = StyleSheet.create({
  BoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  Box: {
    backgroundColor: 'white',
    height: 60,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 12,
    elevation: 4, // for Android
    shadowColor: 'rgba(213, 226, 245, 0.40)', // for iOS
    shadowOffset: {width: 0, height: 4}, // for iOS
    shadowOpacity: 1, // for iOS
    shadowRadius: 20,
    flex: 1,
    padding: 15,
    fontFamily: 'Circular Std Book',
    color: 'black',
    fontSize: 18,
  },
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
});
