import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Color } from '../../Constant'
import Header from '../../Components/Header'
import InputText from '../../Components/InputText'
import CustomButton from '../../Components/CustomButton'
import axios from 'axios'
import { BaseUrl } from '../../Constant/BaseUrl'

const ForgotPassword = ({navigation}:any) => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  console.log('email',email);
  const handelForgotPassword = () =>{
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setError('Email is required')
      return
    } else if (!emailRegex.test(email)) {
      setError('Invalid Email')
      return
    }

    const formData = new FormData();
    formData.append('email', email);
    axios
      .post(`${BaseUrl}auth/forget-password`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response)=>{
        console.log(response.data);
        navigation.replace('Login')
      })
      .catch((error)=>{
        console.log('error',error);
        navigation.replace('Login')
        
      })
  }
  return (
    <View
    style={{
      backgroundColor: 'white',
      height: '100%',
      paddingHorizontal: 25,
    }}>
    <Header goBack title='Forgot Password' navigation={navigation}/>
    <InputText
          label="Enter Email"
          placeholder="your.email@example.com"
          onChangeText={(text:any) => setEmail(text)}
          value={email}
          error={error}
        />
        <View style={{marginVertical: 20}}>
          <CustomButton onPress={handelForgotPassword} btnTitle="Send Email" />
        </View>
    </View>
  )
}

export default ForgotPassword

const styles = StyleSheet.create({})