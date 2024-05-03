import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Color} from '../../Constant';
import SearchBar from '../../Components/SearchBar';
import CustomButton from '../../Components/CustomButton';

const Courses = ({navigation}: any) => {
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
        onPress={() => navigation.navigate('CourseDetail')}
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
      <ScrollView>
        <View style={{marginTop: 20}}></View>
        <SearchBar />
        <View style={{marginTop: 20}}></View>

        <FlatList
          data={coursesData}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
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
