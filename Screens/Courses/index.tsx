import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Color} from '../../Constant';
import SearchBar from '../../Components/SearchBar';
import CustomButton from '../../Components/CustomButton';
import Header from '../../Components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BaseUrl} from '../../Constant/BaseUrl';
import {Image} from 'react-native';
import CustomLoader from '../../Components/CustomLoader';

const Courses = ({navigation, route}: any) => {
  const subjectData = route.params;
  let subjectId = subjectData?.id;
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log('subjectData', subjectData);
  console.log('courses============>', courses);

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
    setLoading(true);
    try {
      const jsonValue = await AsyncStorage.getItem('studentAuth');
      if (jsonValue !== null) {
        const data = JSON.parse(jsonValue);
        console.log('Retrieved data:', data.token);
        const formData = new FormData();
        formData.append('subject_id', subjectId);
        console.log('formData', formData);

        axios
          .get(`${BaseUrl}courses`, {
            params: formData,
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${data.token}`,
            },
          })
          .then(response => {
            console.log('response COurses', response.data);
            let courses = response.data;
            setCourses(courses);
            setLoading(false);
          })
          .catch(error => {
            setLoading(false);
            console.log('error', error);
            if (error.response) {
              console.log(
                'Courses Server responded with data:',
                error.response.data.message,
              );
              console.log('Courses Status code:', error.response.status);
              console.log('Courses Headers:', error.response.headers);
            } else if (error.request) {
              console.log('Courses No response received:', error.request);
            } else {
              console.log(
                'Error setting up the request: Courses',
                error.message,
              );
            }
          });
      } else {
        setLoading(false);
        console.log('No data found in AsyncStorage for key studentAuth');
        ToastAndroid.show(`No data in async`, ToastAndroid.SHORT);
        return null;
      }
    } catch (error) {
      setLoading(false);
      ToastAndroid.show(`Error retrieving data`, ToastAndroid.SHORT);
      console.error('Error retrieving data from AsyncStorage:', error);
      return null;
    }
  };

  useEffect(() => {
    getSubjectData();
  }, []);
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
            <Text style={[styles.textType3, {color: '#ff6b00', fontSize: 16}]}>
              Tending
            </Text>
            <View style={{margin: 3}} />
            <Text style={[styles.textType3, {fontSize: 18}]}>{item.name}</Text>
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
                View Details
              </Text>
            </TouchableOpacity>
          </View>
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
      <Header goBack title="Courses" navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{marginTop: 20}}></View>
        <SearchBar />
        <View style={{marginTop: 20}}></View>
        {courses.length > 0 ? (
          <FlatList
            data={courses}
            renderItem={renderItem}
            keyExtractor={(item: any) => item.id}
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
      </ScrollView>
      <CustomLoader visible={loading} />
    </View>
  );
};

export default Courses;

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
});
