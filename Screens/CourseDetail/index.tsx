import {ScrollView, StyleSheet, Text, ToastAndroid, View} from 'react-native';
import React, { useEffect } from 'react';
import CustomButton from '../../Components/CustomButton';
import {Color} from '../../Constant';
import Header from '../../Components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BaseUrl } from '../../Constant/BaseUrl';

const CourseDetail = ({navigation,route}:any) => {
  const courseDetail = route.params;
  let courseId = courseDetail.id
  console.log('route================>',courseDetail);
  const handelEnrollNow = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('studentAuth');
      if (jsonValue !== null) {
        const data = JSON.parse(jsonValue);
        console.log('Retrieved data:', data.token);
        const formData = new FormData();
        formData.append('course_id', courseId);
       
        axios
          .post(`${BaseUrl}enroll`, formData,{
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${data.token}`,
            },
          })
          .then(response => {
            console.log('response', response.data);
            ToastAndroid.show(
              `${response.data.message}`,
               ToastAndroid.SHORT,
             );
             navigation.replace('MyDrawer', {
               screen: 'StudentCourses',
             })
             
             navigation.replace('StudentCourses')
          })
          .catch(error => {
            console.log('error', error);
          });
      } else {
        console.log('No data found in AsyncStorage for key studentAuth');
       navigation.replace('Login')
      }
    } catch (error) {
      console.error('Error retrieving data from AsyncStorage:', error);
      return null;
    }
  };


  // const CourseDetail = {
  //   id: 'ALG-101',
  //   title: 'Algebra I',
  //   description:
  //     'An introductory course to algebra, focusing on foundational concepts and skills.',
  //   topicsCovered: [
  //     'Algebraic Foundations',
  //     'Solving Equations & Inequalities',
  //     'Working with Units',
  //     'Linear Equations & Graphs',
  //     'Forms of Linear Equations',
  //     'Systems of Equations',
  //     'Inequalities (Systems & Graphs)',
  //     'Functions',
  //     'Sequences',
  //     'Absolute Value & Piecewise Functions',
  //     'Exponents & Radicals',
  //     'Exponential Growth & Decay',
  //   ],
  //   learningOutcomes: [
  //     'Understand and apply the properties of real numbers.',
  //     'Solve linear equations and inequalities with one variable.',
  //     'Graph linear equations and inequalities in two variables.',
  //     'Model real-world situations using algebraic expressions and equations.',
  //     'Analyze and solve systems of linear equations.',
  //     'Explore the concept of functions and their applications.',
  //     'Investigate sequences and their properties.',
  //     'Examine exponential relationships and their representations.',
  //   ],
  //   prerequisites: 'Basic understanding of arithmetic and number operations.',
  //   assessmentMethods: [
  //     'Quizzes',
  //     'Homework Assignments',
  //     'Unit Tests',
  //     'Final Exam',
  //   ],
  //   courseDuration: 'One semester',
  //   creditHours: 3,
  // };
  return (
    <View style={{
      backgroundColor: Color.PattensBlue,
      height: '100%',
      paddingHorizontal: 25,
    }}>
      <Header goBack title='Courses Detail' navigation={navigation}/>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>{courseDetail?.name}</Text>
        <View style={styles.section}>
          <Text style={styles?.sectionTitle}>Course Description</Text>
          <Text style={styles.text}>{courseDetail?.description}</Text>
        </View>
        {/* <View style={styles.section}>
          <Text style={styles?.sectionTitle}>Topics Covered</Text>
          {CourseDetail.topicsCovered.map((topic, index) => (
            <Text key={index} style={styles.text}>
              - {topic}
            </Text>
          ))}
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Learning Outcomes</Text>
          {CourseDetail.learningOutcomes.map((outcome, index) => (
            <Text key={index} style={styles.text}>
              - {outcome}
            </Text>
          ))}
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Assessment Methods</Text>
          {CourseDetail.assessmentMethods.map((method, index) => (
            <Text key={index} style={styles.text}>
              - {method}
            </Text>
          ))}
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Course Duration</Text>
          <Text style={styles.text}>{CourseDetail.courseDuration}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Credit Hours</Text>
          <Text style={styles.text}>{CourseDetail.creditHours}</Text>
        </View> */}
      </ScrollView>
      <View
        style={{
          backgroundColor: Color.PattensBlue,
          paddingHorizontal: 20,
          paddingVertical: 40,
        }}>
        <CustomButton btnTitle="Enroll Now" onPress={()=> handelEnrollNow()}/>
      </View>
    </View>
  );
};

export default CourseDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
    color: Color.IronsideGrey,
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Color.IronsideGrey,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: Color.DustyGrey,
  },
});
