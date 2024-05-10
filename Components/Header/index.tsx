import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, { useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import {Color} from '../../Constant';
import RemovePopup from '../RemovePopup';
const Header = ({navigation, goBack, title, filter, tab, addClass,needHelp,deleteBtn ,modalText, search}: any) => {
  const routeToFilter = () => {
    let selectedTab = tab.filter((e: any, i: number) => {
      return e.selected;
    });

    if (selectedTab[0]?.name == 'Applied') {
      navigation.navigate('Filter', 'applied');
    } else {
      navigation.navigate('Filter');
    }
  };

  const [modalVisible, setModalVisible] = useState(false);

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleLogoutPress = () => {
    setModalVisible(true);
  };
  
  return (
    <View
      style={{
        marginTop:20,
        marginVertical: 20,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
      }}>

      <View style={{flexDirection: 'row', gap: 0, alignItems: 'center'}}>
        {goBack && (
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding:10,paddingLeft:0}}>
            <Entypo name="chevron-left" size={25} color={'black'} />
          </TouchableOpacity>
        )}
        {title && <Text style={[styles.textType1,{fontFamily:'Circular Std Bold'}]}>{title}</Text>}
      </View>
      {filter && (
      <View
        style={{
          backgroundColor: Color.shinyGrey,
          padding: 10,
          borderRadius: 50,
        }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => routeToFilter()}>
            <AntDesign name="filter" size={25} color={'black'} />
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
          <View
            style={{flexDirection:'row', gap:3, alignItems:'center'}}
            >
              <Text style={{color:Color.Black,fontFamily: 'Circular Std Book'}}>Need Help</Text>
            {/* <Image source={require('../../Images/HelpIcon.png')}/> */}
          </View>
        )}
        {deleteBtn && (
          <>
          <TouchableOpacity onPress={handleLogoutPress}
            style={{flexDirection:'row', gap:5, alignItems:'center'}}>
            {/* <Image source={require('../../Images/deleteB.png')}/> */}
          </TouchableOpacity>
          <RemovePopup
          modalVisible={modalVisible}
          handleCloseModal={handleCloseModal}
          modalText={modalText}
        />
        </>
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
