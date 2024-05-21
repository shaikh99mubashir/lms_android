import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Color} from '../../Constant';
import SearchBar from '../../Components/SearchBar';
import CustomButton from '../../Components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BaseUrl} from '../../Constant/BaseUrl';
import Header from '../../Components/Header';
import {Image} from 'react-native';

const Subjects = ({navigation, route}: any) => {
  // const classData = route.params;
  // const [subjects, setSubjects] = useState([])
  // console.log('classData', classData.id);
  // console.log('subjects====>', subjects);

  const subjectsData = [
    {name: 'Maths'},
    {name: 'English'},
    {name: 'Chemistry'},
    {name: 'Physics'},
    {name: 'Biology'},
    {name: 'History'},
    {name: 'Geography'},
    {name: 'Computer Science'},
    {name: 'Art'},
    {name: 'Physical Education'},
  ];
  const getSubjectData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('studentAuth');
      if (jsonValue !== null) {
        const data = JSON.parse(jsonValue);
        console.log('Retrieved data:', data.token);

        axios
          .get(`${BaseUrl}subjects/${classData.id}`, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${data.token}`,
            },
          })
          .then(response => {
            console.log('response', response.data);
            let subject = response.data;
            setSubjects(subject);
          })
          .catch(error => {
            console.log('error', error);
          });
      } else {
        console.log('No data found in AsyncStorage for key studentAuth');
        return null;
      }
    } catch (error) {
      console.error('Error retrieving data from AsyncStorage:', error);
      return null;
    }
  };

  // useEffect(()=>{
  //   getSubjectData()
  // },[])

  const renderItem = ({item}: any) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('Courses')}>
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
            <Text style={[styles.textType3, {fontSize: 18}]}>100+ Courses</Text>
            <TouchableOpacity
            activeOpacity={0.8}
             onPress={() => navigation.navigate('Courses')}
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
                View Courses
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
      <Header goBack title="Subjects" navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{marginTop: 20}}></View>
        <SearchBar />
        <View style={{marginTop: 20}}></View>

        <FlatList
          data={subjectsData}
          renderItem={renderItem}
          keyExtractor={(item: any) => item.id}
        />
      </ScrollView>
    </View>
  );
};

export default Subjects;

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
    borderRadius: 16,
    elevation: 4, // for Android
    shadowColor: 'rgba(213, 226, 245, 0.80)', // for iOS
    shadowOffset: {width: 0, height: 4}, // for iOS
    shadowOpacity: 1, // for iOS
    shadowRadius: 20,
    fontFamily: 'Circular Std Book',
  },
});
