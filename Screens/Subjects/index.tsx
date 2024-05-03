import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Color} from '../../Constant';
import SearchBar from '../../Components/SearchBar';
import CustomButton from '../../Components/CustomButton';

const Subjects = ({navigation}: any) => {
  const subjectsData = [
    {key: 'Maths'},
    {key: 'English'},
    {key: 'Chemistry'},
    {key: 'Physics'},
    {key: 'Biology'},
    {key: 'History'},
    {key: 'Geography'},
    {key: 'Computer Science'},
    {key: 'Art'},
    {key: 'Physical Education'},
  ];

  const renderItem = ({item}: any) => {
    return (
      <TouchableOpacity
      activeOpacity={0.8}
        onPress={() => navigation.navigate('Courses')}
        style={{justifyContent: 'center', alignItems: 'center'}}>
        <View
          style={[
            styles.Box,
            {
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 0,
              marginBottom: 10,
            },
          ]}>
          <Text
            style={{
              color: 'black',
              fontFamily: 'Circular Std Book',
              fontSize: 18,
            }}>
            {item.key}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View
      style={{
        backgroundColor: Color.PattensBlue,
        height: '100%',
        paddingHorizontal: 25,
      }}>
      <ScrollView>
        <View style={{marginTop: 20}}></View>
        <SearchBar />
        <View style={{marginTop: 20}}></View>

        <FlatList
          data={subjectsData}
          renderItem={renderItem}
          keyExtractor={item => item.key}
        />
      </ScrollView>
    </View>
  );
};

export default Subjects;

const styles = StyleSheet.create({
  BoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  Box: {
    backgroundColor: 'white',
    height: 60,
    borderRadius: 12,
    elevation: 4, // for Android
    shadowColor: 'rgba(213, 226, 245, 0.40)', // for iOS
    shadowOffset: {width: 0, height: 4}, // for iOS
    shadowOpacity: 1, // for iOS
    shadowRadius: 20,
    flex: 1,
    padding: 15,
    fontFamily: 'Circular Std Book',
    color: 'black',
    fontSize: 18,
  },
});
