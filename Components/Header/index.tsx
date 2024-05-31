import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Color} from '../../Constant';
import RemovePopup from '../RemovePopup';
const Header = ({
  navigation,
  goBack,
  title,
  filter,
  tab,
  drawerBtn,
  notification,
  addClass,
  needHelp,
  deleteBtn,
  modalText,
  search,
  profileImage
}: any) => {

  const routeToProfile = () => {
    navigation.navigate('Profile')
  }
  return (
    <View
      style={{
        marginTop: 20,
        marginVertical: 20,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <View style={{flexDirection: 'row', gap: 0, alignItems: 'center'}}>
        {drawerBtn && (
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={{padding: 10, paddingLeft: 0}}>
            <Ionicons name="reorder-three-outline" size={25} color={'black'} />
          </TouchableOpacity>
        )}
        {goBack && (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{padding: 10, paddingLeft: 0}}>
            <Entypo name="chevron-left" size={25} color={'black'} />
          </TouchableOpacity>
        )}
        {title && (
          <Text style={[styles.textType1, {fontFamily: 'Circular Std Bold'}]}>
            {title}
          </Text>
        )}
      </View>
      {notification && (
        <View style={{flexDirection:'row', alignItems:'center'}}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{padding: 10, paddingLeft: 0}}>
            <Ionicons name="notifications-outline" size={25} color={'black'} />
          </TouchableOpacity>
          <TouchableOpacity
          activeOpacity={0.8}
            onPress={() => routeToProfile()}
            style={{padding: 10, paddingLeft: 0}}>
              <View style={{borderWidth:2,borderColor:Color.Primary, padding:2,borderRadius:50}}>
          <Image source={{uri:profileImage ? profileImage : `${profileImage}/storage/users/UserImage.png` }} style={{width:50, height:50,borderRadius:50 }}/>
              </View>
          </TouchableOpacity>
        </View>
      )}
    
      {addClass && (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('AddClass')}>
          <Entypo name="circle-with-plus" size={35} color={Color.Primary} />
        </TouchableOpacity>
      )}
      {search && (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('')}>
          <Feather name="search" size={22} color={Color.Black} />
        </TouchableOpacity>
      )}
      {needHelp && (
        <View style={{flexDirection: 'row', gap: 3, alignItems: 'center'}}>
          <Text style={{color: Color.Black, fontFamily: 'Circular Std Book'}}>
            Need Help
          </Text>
          {/* <Image source={require('../../Images/HelpIcon.png')}/> */}
        </View>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  textType1: {
    fontWeight: '500',
    fontSize: 26,
    color: Color.Black,
    fontFamily: 'Circular Std Medium',
    // lineHeight: 24,
    fontStyle: 'normal',
  },
});
