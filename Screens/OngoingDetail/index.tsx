import {FlatList, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import {Color} from '../../Constant';
import Header from '../../Components/Header';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SearchBar from '../../Components/SearchBar';
import CustomButton3 from '../../Components/CustomButton3';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BaseUrl } from '../../Constant/BaseUrl';
import RNVideo from '../../Components/RNVideo';
import Video from 'react-native-video';
const OngoingDetail = ({navigation,route}: any) => {
  let courseVideos = route.params
  let courseId = courseVideos.id
  let isEligibleForQuiz = courseVideos.completed
  console.log('courseVideos',isEligibleForQuiz);
  
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
      console.log('formdata',formData);
      
      axios
        .post(`${BaseUrl}videos/track-view`,formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${data.token}`,
          },
        })
        .then(response => {
          console.log('response', response.data);
          const url = item.url;
          // Linking.openURL(url).catch((err:any) => console.error('An error occurred', err));
          navigation.navigate('PlayVideo',item)
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

const handleVideoPress = (item:any) =>{
  console.log('item',item.url);
  
  
}
  
  const data = [
    {id: 1, title: 'Why Using Graphic De..'},
    {id: 2, title: 'Setup Your Graphic De..'},
    {id: 3, title: 'Why Using Graphic De..'},
  ];
  const renderItem = ({item, index}: any) => (
    <>
    <TouchableOpacity
      onPress={() => handelTrackVideo(item)}
      style={[
        styles.studentBox,
        {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
      ]}>
      <View style={{flexDirection: 'row', gap: 10}}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: '#E8F1FF',
          }}>
          <Text style={[styles.textType3, {fontSize: 18}]}>{index + 1}</Text>
        </View>
        <View>
          <Text style={[styles.textType3, {fontSize: 18}]}>{item.title}</Text>
          <View style={{flexDirection:"row", gap:10}}>
          <Text style={[styles.textType3]}>15 min</Text>
          <Text style={[styles.textType3]}>{item.viewed != null ? 'Viewed' : 'Not Viewed'}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={()=>handleVideoPress(item)}>
        <FontAwesome name="play-circle" size={25} color={Color.BrightBlue} />
      </TouchableOpacity>
    </TouchableOpacity>
    </>
  );
  return (
    <View
      style={{
        backgroundColor: Color.GhostWhite,
        height: '100%',
        paddingHorizontal: 25,
      }}>
      <Header goBack title="Ongoining" navigation={navigation} />
      <ScrollView>
        <SearchBar />
        <View style={{paddingVertical: 15}}></View>
        <FlatList
          data={studentCoursesDetail}
          renderItem={renderItem}
          keyExtractor={(item:any) => item.id.toString()}
          nestedScrollEnabled={true}
        />
      </ScrollView>
    
      {isEligibleForQuiz &&
      <View style={{paddingVertical:30}}>
        <CustomButton3
          btnTitle="Attemp Quiz"
          onPress={() => navigation.navigate('Quizes', courseId)}
        />
      </View>
      }
    </View>
  );
};

export default OngoingDetail;

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
  studentBox: {
    backgroundColor: 'white',
    height: 70,
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
    fontSize: 16,
    width: '100%',
    // justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  video: {
    width: '99%',
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
  },
});
