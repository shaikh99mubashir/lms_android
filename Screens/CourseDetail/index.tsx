import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomButton from '../../Components/CustomButton';
import {Color} from '../../Constant';

const CourseDetail = () => {
  const CourseDetail = {
    id: 'ALG-101',
    title: 'Algebra I',
    description:
      'An introductory course to algebra, focusing on foundational concepts and skills.',
    topicsCovered: [
      'Algebraic Foundations',
      'Solving Equations & Inequalities',
      'Working with Units',
      'Linear Equations & Graphs',
      'Forms of Linear Equations',
      'Systems of Equations',
      'Inequalities (Systems & Graphs)',
      'Functions',
      'Sequences',
      'Absolute Value & Piecewise Functions',
      'Exponents & Radicals',
      'Exponential Growth & Decay',
    ],
    learningOutcomes: [
      'Understand and apply the properties of real numbers.',
      'Solve linear equations and inequalities with one variable.',
      'Graph linear equations and inequalities in two variables.',
      'Model real-world situations using algebraic expressions and equations.',
      'Analyze and solve systems of linear equations.',
      'Explore the concept of functions and their applications.',
      'Investigate sequences and their properties.',
      'Examine exponential relationships and their representations.',
    ],
    prerequisites: 'Basic understanding of arithmetic and number operations.',
    assessmentMethods: [
      'Quizzes',
      'Homework Assignments',
      'Unit Tests',
      'Final Exam',
    ],
    courseDuration: 'One semester',
    creditHours: 3,
  };
  return (
    <>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>{CourseDetail.title}</Text>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Course Description</Text>
          <Text style={styles.text}>{CourseDetail.description}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Topics Covered</Text>
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
        </View>
      </ScrollView>
      <View
        style={{
          backgroundColor: 'white',
          paddingHorizontal: 20,
          paddingVertical: 40,
        }}>
        <CustomButton btnTitle="Enroll Now" />
      </View>
    </>
  );
};

export default CourseDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
