import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BaseUrl } from '../../Constant/BaseUrl';
import { Color } from '../../Constant';
import Header from '../../Components/Header';
import SearchBar from '../../Components/SearchBar';
import CustomButton from '../../Components/CustomButton';

const CoursesVideos = ({navigation, route}:any) => {
    let courseVideos = route.params
    let courseId = courseVideos.id
    let isEligibleForQuiz = courseVideos.completed
    console.log('courseVideos',courseVideos);
    
  const [studentCoursesDetail, setStudentCoursesDetail] =useState([])
  console.log('studentCoursesDetail',studentCoursesDetail);
  
  const getStudentCoursesVideos = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('studentAuth');
      if (jsonValue !== null) {
        const data = JSON.parse(jsonValue);
        console.log('Retrieved data:', data.token);
        axios
          .get(`${BaseUrl}videos/${courseId}`, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${data.token}`,
            },
          })
          .then(response => {
            console.log('response', response.data);
            let coursesDetail = response.data
            setStudentCoursesDetail(coursesDetail);
          })
          .catch(error => {
            console.log('error', error);
          });
      } else {
        console.log('No data found in AsyncStorage for key studentAuth');

      }
    } catch (error) {
      console.error('Error retrieving data from AsyncStorage:', error);
      return null;
    }
  };

  useEffect(() => {
    getStudentCoursesVideos();
  }, []);
  const handelTrackVideo = async (item:any) => {
    console.log('item',item.id);
    try {
      const jsonValue = await AsyncStorage.getItem('studentAuth');
      if (jsonValue !== null) {
        const data = JSON.parse(jsonValue);
        console.log('Retrieved data:', data.token);
        const formData = new FormData();
        formData.append('video_id', item.id);
        axios
          .post(`${BaseUrl}videos/track-view`,formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${data.token}`,
            },
          })
          .then(response => {
            console.log('response', response.data);
            getStudentCoursesVideos();
          })
          .catch(error => {
            console.log('error', error);
          });
      } else {
        console.log('No data found in AsyncStorage for key studentAuth');

      }
    } catch (error) {
      console.error('Error retrieving data from AsyncStorage:', error);
      return null;
    }
    
   
  };
  const renderItem = ({item}: any) => {
    return (
      <TouchableOpacity
        onPress={() => handelTrackVideo(item)}
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
            {item.title} {item.viewed && <Text>isView: {item.viewed}</Text>}
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
        <Header goBack title='Courses Video' navigation={navigation}/>
      <ScrollView>
        <View style={{marginTop: 20}}></View>
        <SearchBar />
        <View style={{marginTop: 20}}></View>

        <FlatList
          data={studentCoursesDetail}
          renderItem={renderItem}
          keyExtractor={(item:any) => item.id}
        />
        {isEligibleForQuiz &&
        <CustomButton btnTitle='Attemp Quiz' onPress={()=> navigation.navigate('Quizes', courseId)}/>
        }
      </ScrollView>
    </View>
  )
}

export default CoursesVideos

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
})