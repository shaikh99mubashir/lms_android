import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
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
import CustomLoader from '../../Components/CustomLoader';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RightArrowSvg from '../../Svgs/RightArrowSvg';
const Subjects = ({navigation, route}: any) => {
  const classData = route.params;
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  // console.log('classData', classData.id);
  // console.log('subjects====>', subjects);
  // console.log('subjects', subjects);

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
    setLoading(true);
    try {
      const jsonValue = await AsyncStorage.getItem('studentAuth');
      if (jsonValue !== null) {
        const data = JSON.parse(jsonValue);
        axios
          .get(`${BaseUrl}subjects/${classData.id}`, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${data.token}`,
            },
          })
          .then(response => {
            setLoading(false);
            let subject = response.data;
            setSubjects(subject);
          })
          .catch(error => {
            setLoading(false);
            console.log('error', error);
            ToastAndroid.show(`${error}`, ToastAndroid.SHORT);
          });
      } else {
        setLoading(false);
        console.log('No data found in AsyncStorage for key studentAuth');
        ToastAndroid.show(`No data in async`, ToastAndroid.SHORT);
        return null;
      }
    } catch (error) {
      setLoading(false);
      console.error('Error retrieving data from AsyncStorage:', error);
      return null;
    }
  };

  useEffect(() => {
    getSubjectData();
  }, []);

  const renderItem = ({item}: any) => {
    console.log(item);

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('Courses', item)}
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
        <Text
          style={[
            styles.textType3,
            {
              color: Color.white,
              backgroundColor:
                item.type == 'trending'
                  ? '#0033ff'
                  : item.type == 'top rated'
                  ? 'blue'
                  : item.type == 'most popular'
                  ? Color.Yellow
                  : Color.Primary,

              fontSize: 16,
              textTransform: 'capitalize',
              textAlign: 'center',
              paddingHorizontal: 15,
              paddingVertical: 5,
              borderRadius: 30,
              width:100,
              marginBottom:10
            },
          ]}>
          trending
        </Text>
          <Text style={[styles.textType1]}>{item.name}</Text>
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
        </View>
        <RightArrowSvg/>
      </TouchableOpacity>
    );
  };
  return (
    <View
      style={{
        backgroundColor: Color.GhostWhite,
        height: '100%',
        
      }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{paddingHorizontal: 25,}}>
      <Header goBack title="Subjects" navigation={navigation} />
        <View style={{marginTop: 20}}></View>
        <SearchBar />
        <View style={{marginTop: 20}}></View>
        {subjects.length > 0 ? (
          <FlatList
            data={subjects}
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
      </ScrollView>
      <CustomLoader visible={loading} />
    </View>
  );
};

export default Subjects;

const styles = StyleSheet.create({
  textType3: {
    color: Color.Dune,
    fontSize: 16,
    fontFamily: 'Circular Std Medium',
  },
  textType1: {
    fontSize: 22,
    color: Color.Black,
    fontFamily: 'Circular Std Medium',
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
