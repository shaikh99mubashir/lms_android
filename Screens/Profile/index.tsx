import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../../Components/Header';
import {Color} from '../../Constant';
import InputText from '../../Components/InputText';
import CustomButton from '../../Components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BaseUrl } from '../../Constant/BaseUrl';
import axios from 'axios';

const Profile = ({navigation}: any) => {

    const [profileData, setProfileData] = useState<any>()

    const getProfileData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('studentAuth');
          if (jsonValue !== null) {
            const data = JSON.parse(jsonValue);
            console.log('Retrieved data:', data.token);

            axios.get(`${BaseUrl}users`, {
              headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${data.token}`
              }
            })
            .then((response)=>{
                // console.log('profile',response.data);
                let profile = response.data.user
                setProfileData(profile)
            })
            .catch((error)=>{
              console.log('error',error);
              if (error.response) {
                console.log('users Server responded with data:', error.response.data.message);
                console.log('users Status code:', error.response.status);
                console.log('users Headers:', error.response.headers);
              } else if (error.request) {
                console.log('users No response received:', error.request);
              } else {
                console.log('Error setting up the request: users', error.message);
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
        getProfileData()
      },[])
      console.log('profileData',profileData);
      
  return (
    <View
      style={{
        backgroundColor: 'white',
        height: '100%',
        paddingHorizontal: 25,
      }}>
      <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled>
        <Header title={'Profile'} goBack navigation={navigation} />
        <View style={{margin: 5}}></View>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../../Images/user-image.png')}
            style={{
              width: 95,
              height: 95,
              borderRadius: 50,
              borderWidth: 3,
              borderColor: Color.Primary,
            }}
          />
          <Image
            source={require('../../Images/Plusicon.png')}
            style={{position: 'absolute', top: 60, right: 130}}
          />
          <View style={{margin: 5}}></View>
          <Text style={[styles.textType1, {lineHeight: 35}]}>
           {profileData?.name}
          </Text>
          <Text style={[styles.textType3]}>{profileData?.email}</Text>
        </View>
        <View style={{gap: 5, marginTop: 15}}>
          <InputText label="Full Name*" placeholder="Full Name" />
        </View>
        <View>
          <InputText label="Email*" placeholder="your.email@example.com" />
        </View>
        <View>
          <InputText label="Mobile Phone*" placeholder="+60 2168-5000-6789" />
        </View>
        <View>
          <InputText label="Date of Birth*" placeholder="25 June 1985" />
        </View>
        {/* <View style={{marginBottom:40,marginTop:30}}>
          <CustomButton btnTitle='Save'/>
        </View> */}
      </ScrollView>
    </View>
  );
};

export default Profile;

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
});
