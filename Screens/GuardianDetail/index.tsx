import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Color} from '../../Constant';
import Header from '../../Components/Header';
import InputText2 from '../../Components/InputText2';
import InputText from '../../Components/InputText';
import InputText3 from '../../Components/TextInput3';
import CustomButton3 from '../../Components/CustomButton3';

const GuardianDetail = ({navigation}: any) => {
  return (
    <View
      style={{
        backgroundColor: Color.GhostWhite,
        height: '100%',
      }}>
      <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled>
        <View style={{paddingHorizontal: 25}}>
          <Header title={'Guardian Detail'} goBack navigation={navigation} />
          <View style={{width: '100%'}}>
            <InputText3
              label="Enter Email"
              placeholder="your.email@example.com"
            />
            <InputText3 label="Contact Number" placeholder="+60 5252 25522" />
            <View style={{margin: 15}} />
            <CustomButton3 btnTitle="Submit" />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default GuardianDetail;

const styles = StyleSheet.create({});
