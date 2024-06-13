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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RightArrowSvg from '../../Svgs/RightArrowSvg';

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
    console.log("item",item);
    
    return (
      <TouchableOpacity
      onPress={() => navigation.navigate('CourseDetail', item)}
      activeOpacity={0.8}
      key={item.id}
      style={{
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15,
        backgroundColor: Color.white,
        borderRadius: 20,
        padding: 10,
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 25,
      }}>
      <View>
      
        <Text style={[styles.textType1,]}>
          {item.name}
        </Text>
        <Text
          style={[
            styles.textType3,
            {
              fontFamily: 'Circular Std Book',
              color: Color.DustyGrey,

              marginTop: 4,
              fontSize: 14,
            },
          ]}>
          Build a Strong Foundation in English
        </Text>
      </View>
      <View>
      <RightArrowSvg/>
      </View>
    </TouchableOpacity>
    );
  };
  return (
    <View
      style={{
        backgroundColor: Color.PattensBlue,
        height: '100%',
        
      }}>

      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{paddingHorizontal: 25,}}>
      <Header goBack title="Courses" navigation={navigation} />

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
        </View>
      </ScrollView>
      <CustomLoader visible={loading} />
    </View>
  );
};

export default Courses;

const styles = StyleSheet.create({
  textType3: {
    color: Color.Dune,
    fontSize: 16,
    fontFamily: 'Circular Std Medium',
  },
  textType1: {
    fontSize: 21,
    color: Color.Black,
    fontFamily: 'Circular Std Medium',
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
