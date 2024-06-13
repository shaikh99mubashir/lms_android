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
import Header from '../../Components/Header';
import CustomButton3 from '../../Components/CustomButton3';
import CustomLoader from '../../Components/CustomLoader';

const Subscriptions = ({navigation}: any) => {
  const [getSubscriptions, setGetSubscriptions] = useState([]);
  const [loading, setLoading] = useState(false);
  // console.log('getSubscriptions', getSubscriptions);

  const getSubscriptionsData = async () => {
    setLoading(true);
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
            setLoading(false);
          })
          .catch(error => {
            console.log('error', error);
            setLoading(false);
          });
      } else {
        console.log('No data found in AsyncStorage for key studentAuth');
        navigation.replace('Login');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error retrieving data from AsyncStorage:', error);
      setLoading(false);
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
        backgroundColor: Color.GhostWhite,
        height: '100%',
        paddingHorizontal: 25,
      }}>
      <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled>
        <Header title={'Subscription'} goBack navigation={navigation} />
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
          renderItem={({item}: any) => {
            console.log('item', item);

            return (
              <View
                style={{
                  backgroundColor: Color.white,
                  // height: 60,
                  borderRadius: 12,
                  justifyContent: 'center',
                  paddingHorizontal: 20,
                  paddingVertical: 20,
                  marginBottom: 10,
                }}>
                <Text style={styles.textType1}>{item.name}</Text>
                <View style={{margin: 5}} />
                <Text style={[styles.textType3,]}>
                  {item.description}
                </Text>
                {/* <View style={{margin:5}}/>
              <Text style={[styles.textType3,{fontSize:18}]}>Price: {item.price}</Text> */}
                <View style={{margin: 10}}></View>
                {item.purchased == false && (
                  <CustomButton3
                    btnTitle={`Buy Now ${item.price}`}
                    onPress={() => handelSubscriptions(item)}
                  />
                )}
                {item.purchased === true && (
                  <Text style={[styles.textType3, {color: Color.IronsideGrey}]}>You have purchased {item.name} already</Text>
                )}
              </View>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </ScrollView>
      <CustomLoader visible={loading} />
    </View>
  );
};

export default Subscriptions;

const styles = StyleSheet.create({
  textType3: {
    color: Color.Dune,
    fontWeight: '500',
    fontSize: 14,
    fontFamily: 'Circular Std Medium',
  },
  textType1: {
    fontSize: 21,
    color: Color.Black,
    fontFamily: 'Circular Std Medium',
    lineHeight: 24,
  },
});
