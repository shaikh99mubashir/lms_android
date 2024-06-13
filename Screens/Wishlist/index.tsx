import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Color} from '../../Constant';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Header from '../../Components/Header';
import SearchBar from '../../Components/SearchBar';
const Wishlist = ({navigation}: any) => {
  const subjectData = [
    {
      id: '2',
      title: 'English',
      rating: 4.4,
      users: 10,
      image: require('../../Images/courses.png'),
      type: 'trending',
      class: 'class one',
    },
    {
      id: '3',
      title: 'Physic',
      rating: 4.4,
      users: 10,
      image: require('../../Images/physic.png'),
      type: 'trending',
      class: 'class one',
    },
    {
      id: '1',
      title: 'Mathematics',
      rating: 4.4,
      users: 10,
      image: require('../../Images/maths.png'),
      type: 'trending',
      class: 'class two',
    },
    {
      id: '4',
      title: 'Chemistry',
      rating: 4.4,
      users: 10,
      image: require('../../Images/courses.png'),
      type: 'trending',
      class: 'class four',
    },
    {
      id: '5',
      title: 'Biology',
      rating: 4.4,
      users: 10,
      image: require('../../Images/courses.png'),
      type: 'trending',
      class: 'class four',
    },
    // Add more dummy data objects as needed
  ];
  const renderItem = ({item}: any) => (
    <View
      style={{
        backgroundColor: Color.white,
        marginBottom: 15,
        // marginHorizontal: 25,
        borderRadius: 20,
      }}>
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: 25,
          paddingHorizontal: 12,
          justifyContent: 'space-between',
        }}>
        <Text
          style={[
            styles.textType3,
            {
              color: Color.white,
              backgroundColor:
                item.type == 'trending'
                  ? '#0033ff'
                  : item.type == 'top rated'
                  ? 'blue'
                  : item.type == 'most popular'
                  ? Color.Yellow
                  : Color.Primary,

              fontSize: 16,
              textTransform: 'capitalize',
              textAlign: 'center',
              marginLeft: 5,
              paddingHorizontal: 15,
              paddingVertical: 5,
              borderRadius: 30,
            },
          ]}>
          {item.type}
        </Text>
        <Ionicons
          name="bookmark"
          size={19}
          color={Color.Yellow}
          // style={{right: -2, top: -5}}
        />
      </View>
      <Text style={[styles.textType1, {marginLeft: 15, marginTop: 0}]}>
        English
      </Text>
      <Text
        style={[
          styles.textType3,
          {
            fontFamily: 'Circular Std Book',
            color: Color.DustyGrey,
            marginLeft: 15,
            marginTop: 4,
            fontSize: 14,
          },
        ]}>
        Build a Strong Foundation in English
      </Text>
      <View style={{margin: 5}} />
      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            borderTopWidth: 1,
            borderColor: Color.lineColor,
            width: '60%',
          }}>
          <View
            style={{
              flexDirection: 'row',
              gap: 20,
              marginLeft: 15,
              marginTop: 5,
            }}>
            <View style={{flexDirection: 'row', gap: 10, marginTop: 10}}>
              <AntDesign name="staro" size={20} color={Color.Primary} />
              <Text style={styles.textType3}>{item.rating}</Text>
            </View>
            <View style={{flexDirection: 'row', gap: 10, marginTop: 10}}>
              <Feather
                name="users"
                size={19}
                color={Color.Primary} // Make sure Color.Primary is defined or replace it with a color value
              />
              <Text style={styles.textType3}>{item.users}</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            backgroundColor: Color.white,
            flexDirection: 'row',
            gap: 10,
            height: 49,
            width: '40%',
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomRightRadius: 20,
            borderTopWidth: 1,
            borderColor: Color.lineColor,
            borderLeftWidth: 1,
          }}>
          <Text style={[styles.textType3, {color: Color.Primary, fontSize:14}]}>
            View Course
          </Text>
          <Ionicons
            name="arrow-forward-sharp"
            size={18}
            color={Color.Primary}
          />
        </View>
      </View>
    </View>
  );
  return (
    <View
      style={{
        backgroundColor: Color.lmsBG,
        height: '100%',
      }}>
      <ScrollView>
      <View style={{paddingHorizontal: 25, marginBottom: 20}}>
        <Header goBack title={'Wishlist'} navigation={navigation} />
        <SearchBar/>
        <View style={{margin:10}}/>
        <FlatList
          data={subjectData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
      </ScrollView>
    </View>
  );
};

export default Wishlist;

const styles = StyleSheet.create({
  textType3: {
    color: Color.Dune,
    fontSize: 16,
    fontFamily: 'Circular Std Medium',
  },
  textType1: {
    fontSize: 22,
    color: Color.Black,
    fontFamily: 'Circular Std Medium',
  },
});
