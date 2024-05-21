import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
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
  const data = [
    {name: 'Class One'},
    {name: 'Class Two'},
    {name: 'Class Three'},
    {name: 'Class Four'},
    {name: 'Class Five'},
    {name: 'Class Six'},
    {name: 'Class Seven'},
    {name: 'Class Eight'},
    {name: 'Class Nine'},
    {name: 'Class Ten'},
  ];

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
            console.log('response=====?', response.data);
            setClasses(response.data);
          })
          .catch(error => {
            if (error.response) {
              console.log(
                'register Server responded with data:',
                error.response.data,
              );
              navigation.replace('Login');
              console.log('register Status code:', error.response.status);
              console.log('register Headers:', error.response.headers);
            } else if (error.request) {
              console.log('register No response received:', error.request);
            } else {
              console.log(
                'Error setting up the request: register',
                error.message,
              );
            }
          });
      } else {
        console.log('No data found in AsyncStorage for key studentAuth');
        navigation.replace('Login');
      }
    } catch (error) {
      console.error('Error retrieving data from AsyncStorage:', error);
      return null;
    }
  };

  // useEffect(() => {
  //   getClassesData();
  // }, []);

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
        backgroundColor: Color.GhostWhite,
        height: '100%',
        paddingHorizontal: 25,
      }}>
      <Header goBack title="Classess" navigation={navigation} />
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
        {/* <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item: any) => item.id}
        /> */}
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {data &&
            data.map((item, i) => {
              return (
                <TouchableOpacity
                onPress={()=>navigation.navigate('Subjects')}
                activeOpacity={0.8}
                  key={i}
                  style={{
                    width: '48%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                    marginBottom: 25,
                  }}>
                  <Image source={require('../../Images/ICON.png')} />
                  <Text
                    style={{
                      color: 'black',
                      fontFamily: 'Circular Std Book',
                      fontSize: 18,
                    }}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
        </View>
        {/* <TouchableOpacity style={{backgroundColor:'red', width:'48%', alignItems:'center', justifyContent:"center"}}>
          <Image source={require('../../Images/ICON.png')}/>
          <Text
            style={{
              color: 'black',
              fontFamily: 'Circular Std Book',
              fontSize: 18,
            }}>
              Hello
          </Text>
        </TouchableOpacity> */}
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
