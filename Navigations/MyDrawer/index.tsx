import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import SubjctsDetails from '../../Screens/Subjects';
import Home from '../../Screens/Home';
import CustomDrawer from './CustomDrawer';
import AllClassess from '../../Screens/AllClassess';
import StudentCourses from '../../Screens/StudentCourses';
const MyDrawer = () => {
    const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator initialRouteName="Home"   drawerContent={props => <CustomDrawer {...props} />}
    screenOptions={{
      headerShown: true,
      // drawerActiveBackgroundColor: '#aa18ea',
      drawerActiveTintColor: 'black',
      drawerInactiveTintColor: 'black',
      drawerLabelStyle: {
        fontFamily: 'Circular Std Medium',
        fontSize: 16,
      },
    }}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Classess" component={AllClassess} />
      <Drawer.Screen name="StudentCourses" component={StudentCourses} />
    </Drawer.Navigator>
  )
}

export default MyDrawer

const styles = StyleSheet.create({})