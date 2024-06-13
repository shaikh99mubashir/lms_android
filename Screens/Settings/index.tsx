import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import {Color} from '../../Constant';
import Header from '../../Components/Header';
import RightArrowSvg from '../../Svgs/RightArrowSvg';

const Settings = ({navigation}: any) => {
  return (
    <View
      style={{
        backgroundColor: Color.GhostWhite,
        height: '100%',
       
      }}>
      <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled>
        <View style={{ paddingHorizontal: 25,}}>
        <Header title={'Settings'} goBack navigation={navigation} />
        <View style={{marginVertical: 10}}></View>
        <TouchableOpacity
          onPress={() => navigation.navigate('NotificationsList')}
          activeOpacity={0.8}
          style={{
            flexDirection: 'row',
            gap: 10,
            paddingVertical: 20,
            alignItems: 'center',
            width: '100%',
            justifyContent: 'space-between',
            marginBottom: 15,
            backgroundColor: Color.white,
            borderRadius: 20,
            padding: 10,
            paddingHorizontal: 15,
          }}>
          <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
            <Image
              source={require('../../Images/classes.png')}
              style={{width: 15, height: 15}}
            />
            <Text style={[styles.textType3]}>Notification</Text>
          </View>
          <RightArrowSvg />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('ChangePassword')}
          activeOpacity={0.8}
          style={{
            flexDirection: 'row',
            gap: 10,
            paddingVertical: 20,
            alignItems: 'center',
            width: '100%',
            justifyContent: 'space-between',
            marginBottom: 15,
            backgroundColor: Color.white,
            borderRadius: 20,
            padding: 10,
            paddingHorizontal: 15,
          }}>
          <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
            <Image
              source={require('../../Images/classes.png')}
              style={{width: 15, height: 15}}
            />
            <Text style={[styles.textType3]}>Change Password</Text>
          </View>
          <RightArrowSvg />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('FAQs')}
          activeOpacity={0.8}
          style={{
            flexDirection: 'row',
            gap: 10,
            paddingVertical: 20,
            alignItems: 'center',
            width: '100%',
            justifyContent: 'space-between',
            marginBottom: 15,
            backgroundColor: Color.white,
            borderRadius: 20,
            padding: 10,
            paddingHorizontal: 15,
          }}>
          <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
            <Image
              source={require('../../Images/classes.png')}
              style={{width: 15, height: 15}}
            />
            <Text style={[styles.textType3]}>FAQs</Text>
          </View>
          <RightArrowSvg />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('About')}
          activeOpacity={0.8}
          style={{
            flexDirection: 'row',
            gap: 10,
            paddingVertical: 20,
            alignItems: 'center',
            width: '100%',
            justifyContent: 'space-between',
            marginBottom: 15,
            backgroundColor: Color.white,
            borderRadius: 20,
            padding: 10,
            paddingHorizontal: 15,
          }}>
          <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
            <Image
              source={require('../../Images/classes.png')}
              style={{width: 15, height: 15}}
            />
            <Text style={[styles.textType3]}>About</Text>
          </View>
          <RightArrowSvg />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('PrivacyPolicy')}
          activeOpacity={0.8}
          style={{
            flexDirection: 'row',
            gap: 10,
            paddingVertical: 20,
            alignItems: 'center',
            width: '100%',
            justifyContent: 'space-between',
            marginBottom: 15,
            backgroundColor: Color.white,
            borderRadius: 20,
            padding: 10,
            paddingHorizontal: 15,
          }}>
          <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
            <Image
              source={require('../../Images/classes.png')}
              style={{width: 15, height: 15}}
            />
            <Text style={[styles.textType3]}>Privacy Policy</Text>
          </View>
          <RightArrowSvg />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('TermsandConditions')}
          activeOpacity={0.8}
          style={{
            flexDirection: 'row',
            gap: 10,
            paddingVertical: 20,
            alignItems: 'center',
            width: '100%',
            justifyContent: 'space-between',
            marginBottom: 15,
            backgroundColor: Color.white,
            borderRadius: 20,
            padding: 10,
            paddingHorizontal: 15,
          }}>
          <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
            <Image
              source={require('../../Images/classes.png')}
              style={{width: 15, height: 15}}
            />
            <Text style={[styles.textType3]}>Terms and Conditions</Text>
          </View>
          <RightArrowSvg />
        </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Settings;

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
