import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {Color} from '../../Constant';
import SearchBar from '../../Components/SearchBar';
import CustomButton from '../../Components/CustomButton';
import Header from '../../Components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BaseUrl } from '../../Constant/BaseUrl';

const Courses = ({navigation,route}: any) => {
  const subjectData = route.params;
  let subjectId = subjectData.id
  const [courses, setCourses] = useState([]);
  // console.log('subjectData',subjectData.id);
    console.log('courses============>',courses);
    
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

  const getSubjectData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('studentAuth');
      if (jsonValue !== null) {
        const data = JSON.parse(jsonValue);
        console.log('Retrieved data:', data.token);
        const formData = new FormData();
        formData.append('subject_id', subjectId);
        axios.get(`${BaseUrl}courses`, {
          params: formData, 
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${data.token}`
          }
        })
        .then((response)=>{
          // console.log('response COurses',response.data);
          let courses = response.data
          setCourses(courses)
        })
        .catch((error)=>{
          console.log('error',error);
          if (error.response) {
            console.log('Courses Server responded with data:', error.response.data.message);
            console.log('Courses Status code:', error.response.status);
            console.log('Courses Headers:', error.response.headers);
          } else if (error.request) {
            console.log('Courses No response received:', error.request);
          } else {
            console.log('Error setting up the request: Courses', error.message);
          }
          
        })
      } else {
        console.log('No data found in AsyncStorage for key studentAuth');
        return null;
      }
    } catch (error) {
      console.error('Error retrieving data from AsyncStorage:', error);
      return null;
    }
  };

  useEffect(()=>{
    getSubjectData()
  },[])
  const renderItem = ({item}: any) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('CourseDetail', item)}
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
  return (
    <View
      style={{
        backgroundColor: Color.PattensBlue,
        height: '100%',
        paddingHorizontal: 25,
      }}>
        <Header goBack title='Courses' navigation={navigation}/>
      <ScrollView>
        <View style={{marginTop: 20}}></View>
        <SearchBar />
        <View style={{marginTop: 20}}></View>

        <FlatList
          data={courses}
          renderItem={renderItem}
          keyExtractor={(item:any) => item.id}
        />
      </ScrollView>
    </View>
  );
};

export default Courses;

const styles = StyleSheet.create({
  BoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  Box: {
    backgroundColor: 'white',
    height: 60,
    paddingVertical:15,
    paddingHorizontal:15,
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
});
