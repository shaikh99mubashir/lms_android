import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Color} from '../../Constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BaseUrl} from '../../Constant/BaseUrl';
import CustomButton from '../../Components/CustomButton';

const Subscriptions = ({navigation}: any) => {
  const [getSubscriptions, setGetSubscriptions] = useState([]);

  console.log('getSubscriptions', getSubscriptions);

  const getSubscriptionsData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('studentAuth');
      if (jsonValue !== null) {
        const data = JSON.parse(jsonValue);
        console.log('Retrieved data:', data.token);
        axios
          .get(`${BaseUrl}subscriptions`, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${data.token}`,
            },
          })
          .then(response => {
            //   console.log('response', response.data.subscriptions);
            let subscriptions = response.data.subscriptions;
            setGetSubscriptions(subscriptions);
          })
          .catch(error => {
            console.log('error', error);
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

  useEffect(() => {
    getSubscriptionsData();
  }, []);
  const handelSubscriptions = async (item: any) => {
    console.log('item', item.id);
    try {
      const jsonValue = await AsyncStorage.getItem('studentAuth');
      if (jsonValue !== null) {
        const data = JSON.parse(jsonValue);
        console.log('Retrieved data:', data.token);
        const formData = new FormData();
        formData.append('subscription_id', item.id);
        axios
          .post(`${BaseUrl}purchase-subscription`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${data.token}`,
            },
          })
          .then((response: any) => {
            console.log('response====>', response.data);
            ToastAndroid.show(`${response.message}`, ToastAndroid.SHORT);
            getSubscriptionsData();
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
  return (
    <View
      style={{
        backgroundColor: Color.white,
        height: '100%',
        paddingHorizontal: 25,
      }}>
      <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled>
        {/* <Header title={'Settings'} goBack navigation={navigation} /> */}
        <View style={{marginVertical: 10}}></View>
        {/* <View
        style={{
          backgroundColor: Color.PattensBlue,
          height: 60,
          borderRadius: 12,
          justifyContent: 'center',
          paddingHorizontal: 20,
          marginBottom: 10,
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Profile')}
          activeOpacity={0.8}
          style={{
            flexDirection: 'column',
          }}>
          <Image
            source={require('../../Images/tutorProfile.png')}
            style={{marginRight: 15}}
          />

          <Text style={[styles.textType3]}>Profile</Text>

          <Text style={[styles.textType3]}>Profile</Text>
          <Text style={[styles.textType3]}>Profile</Text>
        </TouchableOpacity>
      </View> */}
        <FlatList
          data={getSubscriptions}
          renderItem={({item}: any) => (
            <View
              style={{
                backgroundColor: Color.PattensBlue,
                // height: 60,
                borderRadius: 12,
                justifyContent: 'center',
                paddingHorizontal: 20,
                paddingVertical: 20,
                marginBottom: 10,
              }}>
              <Text style={[styles.textType3]}>Name: {item.name}</Text>
              <Text style={[styles.textType3]}>
                Description: {item.description}
              </Text>
              <Text style={[styles.textType3]}>Price: {item.price}</Text>
              <View style={{margin: 10}}></View>
              {item.purchased &&
              <CustomButton
              btnTitle="Buy"
              onPress={() => handelSubscriptions(item)}
              />
            }
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </ScrollView>
    </View>
  );
};

export default Subscriptions;

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
