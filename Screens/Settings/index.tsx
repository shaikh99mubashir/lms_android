import { StyleSheet, Text, View ,ScrollView, TouchableOpacity, Image} from 'react-native'
import React from 'react'
import { Color } from '../../Constant'
import Header from '../../Components/Header'

const Settings = ({navigation}:any) => {
  return (
    <View
    style={{
      backgroundColor: Color.GhostWhite,
      height: '100%',
      paddingHorizontal: 25,
    }}>
    <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled>
      <Header title={'Settings'} goBack navigation={navigation} />
      <View style={{marginVertical: 10}}></View>
      <View
        style={{
          backgroundColor: Color.white,
          height: 60,
          borderRadius: 12,
          justifyContent: 'center',
          paddingHorizontal: 20,
          marginBottom: 10,
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Profile')}
          activeOpacity={0.8}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {/* <Image
            source={require('../../Images/tutorProfile.png')}
            style={{marginRight: 15}}
          /> */}
          <Text style={[styles.textType3]}>Profile</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          backgroundColor: Color.white,
          height: 60,
          borderRadius: 12,
          justifyContent: 'center',
          paddingHorizontal: 20,
          marginBottom: 10,
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ChangePassword')}
          activeOpacity={0.8}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {/* <Image
            source={require('../../Images/lock.png')}
            style={{marginRight: 15}}
          /> */}
          <Text style={[styles.textType3]}>Change Password</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  </View>
  
    
  )
}

export default Settings

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
})