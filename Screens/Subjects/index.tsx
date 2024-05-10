import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {Color} from '../../Constant';
import SearchBar from '../../Components/SearchBar';
import CustomButton from '../../Components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BaseUrl } from '../../Constant/BaseUrl';
import Header from '../../Components/Header';

const Subjects = ({navigation, route}: any) => {

  const classData = route.params;
  const [subjects, setSubjects] = useState([])
  console.log('classData', classData.id);
  console.log('subjects====>', subjects);
  
  const subjectsData = [
    {key: 'Maths'},
    {key: 'English'},
    {key: 'Chemistry'},
    {key: 'Physics'},
    {key: 'Biology'},
    {key: 'History'},
    {key: 'Geography'},
    {key: 'Computer Science'},
    {key: 'Art'},
    {key: 'Physical Education'},
  ];
  const getSubjectData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('studentAuth');
      if (jsonValue !== null) {
        const data = JSON.parse(jsonValue);
        console.log('Retrieved data:', data.token);


        axios
        .get(`${BaseUrl}subjects/${classData.id}`,  {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${data.token}`
          },
        })
        .then((response)=>{
          console.log('response',response.data);
          let subject = response.data
          setSubjects(subject)
        })
        .catch((error)=>{
          console.log('error',error);
          
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
    getSubjectData()
  },[])


  const renderItem = ({item}: any) => {
    return (
      <TouchableOpacity
      activeOpacity={0.8}
        onPress={() => navigation.navigate('Courses', item)}
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
      <Header goBack title='Subjects' navigation={navigation}/>
      <ScrollView>
        <View style={{marginTop: 20}}></View>
        <SearchBar />
        <View style={{marginTop: 20}}></View>

        <FlatList
          data={subjects}
          renderItem={renderItem}
          keyExtractor={(item:any) => item.id}
        />
      </ScrollView>
    </View>
  );
};

export default Subjects;

const styles = StyleSheet.create({
  BoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  Box: {
    backgroundColor: 'white',
    height: 60,
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
