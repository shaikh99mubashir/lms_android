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
import CoursesVideos from '../../Screens/CoursesVideo';
import ForgotPassword from '../../Screens/ForgotPassword';
import Profile from '../../Screens/Profile';
import ChangePassword from '../../Screens/ChangePassword';
import Quizes from '../../Screens/Quizes';
import QuizResult from '../../Screens/QuizResult';
import Splash from '../../Screens/Splash';
import OnBoarding from '../../Screens/OnBoarding';
import GetStarted from '../../Screens/GetStarted';
import OngoingDetail from '../../Screens/OngoingDetail';
import PlayVideo from '../../Screens/PlayVideo';
import BottomNav from '../BottomNav';
import StudentCourses from '../../Screens/StudentCourses';
import ProfileMenu from '../../Screens/ProfileMenu';
import Wishlist from '../../Screens/Wishlist';
import CourseProgress from '../../Screens/CourseProgress';
import LiveSessionsList from '../../Screens/LiveSessionsList';
import Subscriptions from '../../Screens/Subscriptions';
import GuardianDetail from '../../Screens/GuardianDetail';
import NotificationsList from '../../Screens/Notifications';
import TermsandConditions from '../../Screens/TermsandConditions';
import PrivacyPolicy from '../../Screens/PrivacyPolicy';
import FAQs from '../../Screens/FAQs';
import About from '../../Screens/About';
import AllClassess from '../../Screens/AllClassess';

const MyStack = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator  screenOptions={{headerShown: false, }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="OnBoarding" component={OnBoarding} />
        <Stack.Screen name="GetStarted" component={GetStarted} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="BottomNav" component={BottomNav} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="Subjects" component={Subjects} />
        <Stack.Screen name="CoursesVideos" component={CoursesVideos} />
        <Stack.Screen name="Courses" component={Courses} />
        <Stack.Screen name="CourseDetail" component={CourseDetail} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="Quizes" component={Quizes} />
        <Stack.Screen name="QuizResult" component={QuizResult} />
        <Stack.Screen name="OngoingDetail" component={OngoingDetail} />
        <Stack.Screen name="PlayVideo" component={PlayVideo} />
        <Stack.Screen name="StudentCourses" component={StudentCourses} />
        <Stack.Screen name="ProfileMenu" component={ProfileMenu} />
        <Stack.Screen name="Wishlist" component={Wishlist} />
        <Stack.Screen name="CourseProgress" component={CourseProgress} />
        <Stack.Screen name="LiveSessionsList" component={LiveSessionsList} />
        <Stack.Screen name="Subscriptions" component={Subscriptions} />
        <Stack.Screen name="GuardianDetail" component={GuardianDetail} />
        <Stack.Screen name="NotificationsList" component={NotificationsList} />
        <Stack.Screen name="TermsandConditions" component={TermsandConditions} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
        <Stack.Screen name="FAQs" component={FAQs} />
        <Stack.Screen name="About" component={About} />
        <Stack.Screen name="AllClassess" component={AllClassess} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;

const styles = StyleSheet.create({});
