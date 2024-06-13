import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BaseUrl} from '../../Constant/BaseUrl';
import {useIsFocused} from '@react-navigation/native';
import {Color} from '../../Constant';
import RightArrowSvg from '../../Svgs/RightArrowSvg';
import {Image} from 'react-native';
import Header from '../../Components/Header';
import CustomLoader from '../../Components/CustomLoader';

const CourseProgress = ({navigation}: any) => {
  const [loading, setLoading] = useState(false);
  const [ongoing, setOngoing] = useState([]);
  const focus = useIsFocused();
  const getStudentCourses = async () => {
    setLoading(true);
    try {
      const jsonValue = await AsyncStorage.getItem('studentAuth');
      if (jsonValue !== null) {
        const data = JSON.parse(jsonValue);
        console.log('Retrieved data:', data.token);
        axios
          .get(`${BaseUrl}my-courses`, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${data.token}`,
            },
          })
          .then(response => {
            console.log('response', response.data);
            let studentCourses = response.data;
            let ongoingCourses = [];
            let completedCourses = [];
            ongoingCourses = studentCourses.filter(
              (course: any) => course.completed === false,
            );
            completedCourses = studentCourses.filter(
              (course: any) => course.completed === true,
            );
            console.log('ongoingCourses', ongoingCourses);

            setOngoing(ongoingCourses);
            setLoading(false);
          })
          .catch(error => {
            console.log('error', error);
            setLoading(false);
          });
      } else {
        console.log('No data found in AsyncStorage for key studentAuth');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error retrieving data from AsyncStorage:', error);
      setLoading(false);
      return null;
    }
  };

  useEffect(() => {
    getStudentCourses();
  }, [focus]);

  const renderItem = ({item}: any) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('OngoingDetail', item)}
        activeOpacity={0.8}
        key={item.id}
        style={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 15,
          backgroundColor: Color.white,
          borderRadius: 20,
          padding: 10,
          flexDirection: 'row',
          paddingHorizontal: 20,
          paddingVertical: 15,
        }}>
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={[styles.textType1, {width: '94%'}]}>{item.name}</Text>
            <RightArrowSvg />
          </View>
          <Text
            style={[
              styles.textType3,
              {
                fontFamily: 'Circular Std Book',
                color: Color.DustyGrey,

                marginTop: 4,
                fontSize: 14,
              },
            ]}>
            Build a Strong Foundation in English
          </Text>
          <View style={{margin: 5}} />
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 15}}>
            <View
              style={{
                backgroundColor: Color.lineColor,
                height: 10,
                borderRadius: 10,
                width: '80%',
              }}>
              <View
                style={{
                  backgroundColor: Color.Primary,
                  height: '100%',
                  width: `${item.progress_percentage}%`,
                  borderRadius: 10,
                }}
              />
            </View>
            <Text style={[styles.textType3, {fontSize: 14}]}>
              {item.progress_percentage} %
            </Text>
          </View>
        </View>
        <View></View>
      </TouchableOpacity>
    );
  };
  return (
    <View
      style={{
        backgroundColor: Color.GhostWhite,
        height: '100%',
      }}>
      <ScrollView>
        <View style={{paddingHorizontal: 25}}>
          <Header goBack title="Courses Progress" navigation={navigation} />
          <View style={{margin: 10}} />
          {ongoing.length > 0 ? (
            <FlatList
              data={ongoing}
              renderItem={renderItem}
              keyExtractor={(item: any) => item.id}
            />
          ) : (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Image
                source={require('../../Images/nodatafound.png')}
                resizeMode="cover"
                style={{width: 350, height: 350}}
              />
            </View>
          )}
        </View>
        <CustomLoader visible={loading} />
      </ScrollView>
    </View>
  );
};

export default CourseProgress;

const styles = StyleSheet.create({
  textType3: {
    color: Color.Dune,
    fontSize: 16,
    fontFamily: 'Circular Std Medium',
  },
  textType1: {
    fontSize: 21,
    color: Color.Black,
    fontFamily: 'Circular Std Medium',
  },
});
