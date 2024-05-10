import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
  const getDataFromStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('studentAuth');
      if (jsonValue !== null) {
        const data = JSON.parse(jsonValue);
        console.log('Retrieved data:', data);
        return data;
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
    getDataFromStorage()
  },[])
  
  return (
    <View>
      <Text>Home</Text>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})