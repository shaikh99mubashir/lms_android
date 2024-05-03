import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../../Screens/Login';
import {NavigationContainer} from '@react-navigation/native';
import Home from '../../Screens/Home';
import SignUp from '../../Screens/SignUp';
import MyDrawer from '../MyDrawer';
import Subjects from '../../Screens/Subjects';
import Courses from '../../Screens/Courses';
import CourseDetail from '../../Screens/CourseDetail';

const MyStack = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator  screenOptions={{headerShown: true, }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="MyDrawer" component={MyDrawer} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Subjects" component={Subjects} />
        <Stack.Screen name="Courses" component={Courses} />
        <Stack.Screen name="CourseDetail" component={CourseDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;

const styles = StyleSheet.create({});
