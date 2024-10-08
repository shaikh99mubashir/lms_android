import {ScrollView, StyleSheet, Text, ToastAndroid, View} from 'react-native';
import React, {useState} from 'react';
import Header from '../../Components/Header';
import {Color} from '../../Constant';
import PasswordInput from '../../Components/PasswordInput';
import CustomButton from '../../Components/CustomButton';
import axios from 'axios';
import {BaseUrl} from '../../Constant/BaseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PasswordInput2 from '../../Components/PasswordInput2';
import CustomButton3 from '../../Components/CustomButton3';
import PasswordInput3 from '../../Components/PasswordInput3';

const ChangePassword = ({navigation}: any) => {
  const [updatePassword, setupdatePassword] = useState<any>({
    currentPassword: '',
    newPassword: '',
  });

  console.log('updatePassword', updatePassword);

  const handelUpdate = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('studentAuth');
      if (jsonValue !== null) {
        const data = JSON.parse(jsonValue);
        console.log('Retrieved data:', data.token);
        const formData = new FormData();
        formData.append('current_password', updatePassword.currentPassword);
        formData.append('new_password', updatePassword.newPassword);
        axios
          .post(`${BaseUrl}auth/change-password`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${data.token}`,
            },
          })
          .then((response: any) => {
            console.log('response', response.data);
            if (response.data) {
              ToastAndroid.show(`${response.message}`, ToastAndroid.SHORT);
              setupdatePassword({
                currentPassword: '',
                newPassword: '',
              });
            }
          })
          .catch(error => {
            if (error.response) {
              console.log(
                'register Server responded with data:',
                error.response.data,
              );
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
      navigation.replace('Login');
    }
  };
  return (
    <View
      style={{
        backgroundColor: Color.GhostWhite,
        height: '100%',
      }}>
      <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled>
        <View style={{paddingHorizontal: 25}}>
          <Header title={'Change Password'} goBack navigation={navigation} />
          <View style={{margin: 10}}></View>
          <Text
            style={{
              fontFamily: 'Circular Std Book',
              fontSize: 16,
              lineHeight: 20,
              color:Color.IronsideGrey
            }}>
            Your password must be at least 6 characters long and includes a mix
            of upper and lowercase letters, numbers, and symbols.
          </Text>
          <View style={{margin: 15}}></View>
          <PasswordInput3
            label="Current Password*"
            placeholder="***************"
            onChangeText={(text: any) =>
              setupdatePassword((prevState: any) => ({
                ...prevState,
                currentPassword: text,
              }))
            }
            value={updatePassword.currentPassword}
          />
          <PasswordInput3
            label="New Password*"
            placeholder="***************"
            onChangeText={(text: any) =>
              setupdatePassword((prevState: any) => ({
                ...prevState,
                newPassword: text,
              }))
            }
            value={updatePassword.newPassword}
          />
          <PasswordInput3
            label="Retype Password*"
            placeholder="***************"
          />
          <View style={{marginVertical: 40}}>
            <CustomButton3 btnTitle="Update" onPress={() => handelUpdate()} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({});
