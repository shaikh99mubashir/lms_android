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

const AllClassess = ({navigation}: any) => {
  // const data = [
  //   {key: 'Class One'},
  //   {key: 'Class Two'},
  //   {key: 'Class Three'},
  //   {key: 'Class Four'},
  //   {key: 'Class Five'},
  //   {key: 'Class Six'},
  //   {key: 'Class Seven'},
  //   {key: 'Class Eight'},
  //   {key: 'Class Nine'},
  //   {key: 'Class Ten'},
  // ];

  const [classes, setClasses] = useState([]);

  const getClassesData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('studentAuth');
      if (jsonValue !== null) {
        const data = JSON.parse(jsonValue);
        console.log('Retrieved data:', data.token);
        axios
          .get(`${BaseUrl}classes`, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${data.token}`,
            },
          })
          .then(response => {
            console.log('response', response.data);
            setClasses(response.data);
          })
          .catch(error => {
            console.log('error', error);
          });
      } else {
        console.log('No data found in AsyncStorage for key studentAuth');
       navigation.replace('Login')
      }
    } catch (error) {
      console.error('Error retrieving data from AsyncStorage:', error);
      return null;
    }
  };

  useEffect(() => {
    getClassesData();
  }, []);

  const renderItem = ({item}: any) => {
    console.log('item', item);

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('Subjects', item)}
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
      {/* <Header goBack title="Classess" navigation={navigation} /> */}
      <ScrollView>
        <View style={{marginTop: 20}}></View>
        <SearchBar />
        <View style={{marginTop: 20}}></View>

        {/* <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={[
              styles.Box,
              {
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 0,
              },
            ]}>
            <Text
              style={{
                color: 'black',
                fontFamily: 'Circular Std Book',
                fontSize: 18,
              }}>
              Class One
            </Text>
          </View>
        </View> */}
        <FlatList
          data={classes}
          renderItem={renderItem}
          keyExtractor={(item: any) => item.id}
        />
      </ScrollView>
    </View>
  );
};

export default AllClassess;

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
