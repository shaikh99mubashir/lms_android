import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Color} from '../../Constant';
import Header from '../../Components/Header';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SearchBar from '../../Components/SearchBar';
import CustomButton3 from '../../Components/CustomButton3';
const OngoingDetail = ({navigation}: any) => {
  const data = [
    {id: 1, title: 'Why Using Graphic De..'},
    {id: 2, title: 'Setup Your Graphic De..'},
    {id: 3, title: 'Why Using Graphic De..'},
  ];
  const renderItem = ({item, index}: any) => (
    <View
      style={[
        styles.studentBox,
        {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
      ]}>
      <View style={{flexDirection: 'row', gap: 10}}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: '#E8F1FF',
          }}>
          <Text style={[styles.textType3, {fontSize: 18}]}>{index + 1}</Text>
        </View>
        <View>
          <Text style={[styles.textType3, {fontSize: 18}]}>{item.title}</Text>
          <Text style={[styles.textType3]}>15 min</Text>
        </View>
      </View>
      <View>
        <FontAwesome name="play-circle" size={25} color={Color.BrightBlue} />
      </View>
    </View>
  );
  return (
    <View
      style={{
        backgroundColor: Color.GhostWhite,
        height: '100%',
        paddingHorizontal: 25,
      }}>
      <Header goBack title="Ongoining" navigation={navigation} />
      <ScrollView>
        <SearchBar />
        <View style={{paddingVertical: 15}}></View>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          nestedScrollEnabled={true}
        />
      </ScrollView>
      <View style={{paddingVertical:30}}>
        <CustomButton3
          btnTitle="Attemp Quiz"
          onPress={() => navigation.navigate('Quizes')}
        />
      </View>
    </View>
  );
};

export default OngoingDetail;

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
  studentBox: {
    backgroundColor: 'white',
    height: 70,
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
    fontSize: 16,
    width: '100%',
    // justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
});
