import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Color} from '../../../Constant';
const ChatHeader = ({
  navigation,
  goBack,
  title,
  filter,
  tab,
  addClass,
  needHelp,
  deleteBtn,
  modalText,
  search,
  showOptions,
  onOptionsPress 
}: any) => {
  const [ddOpen, setDDOpen] = useState(false);
  const DropDownValues = [
    {
      ddValue: 'Search',
    },
    {
      ddValue: 'Delete',
    },
    {
      ddValue: 'View Profile',
    },
  ];
  const closeDropDown = () => {
    setDDOpen(false);
  };

  console.log('title',title);
  

  return (
    <View>
      <TouchableWithoutFeedback onPress={closeDropDown}>
        <View
          style={{
            marginTop: 20,
            marginVertical: 5,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.goBack()}
              style={{padding: 10, paddingLeft: 0}}>
              <Entypo name="chevron-left" size={25} color={'black'} />
            </TouchableOpacity>
          </View>
          <View style={{alignItems: 'center'}}>
            <Image source={require('../../../Images/MaleOnline.png')} />
          </View>
          {showOptions &&
          <View>
            <TouchableOpacity
              onPress={onOptionsPress}
              activeOpacity={0.8}
              style={{}}>
              <MaterialCommunityIcons
                name="dots-vertical"
                size={28}
                color={'black'}
              />
            </TouchableOpacity>
            {/* {ddOpen ? (
            <View
              style={{
                backgroundColor: Color.white,
                borderRadius: 12,
                paddingHorizontal: 15,
                paddingTop: 15,
                marginTop: 3,
                zIndex: 999,
                position: 'absolute',
                top: 32,
                width: 110,
                elevation: 2,
                right: -5,
              }}>
              <View style={{padding: 3}}></View>
              {DropDownValues &&
                DropDownValues.map((e: any, i: number) => {
                  return (
                    <TouchableOpacity key={i}>
                      <Text
                        style={[
                          styles.textType3,
                          {
                            fontSize: 14,
                            paddingBottom: 16,
                            fontFamily: 'Circular Std Book',
                          },
                        ]}>
                        {e.ddValue ? e.ddValue : e.ddValue[0]}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              <View style={{padding: 2}}></View>
            </View>
          ) : null} */}
          </View>
          }
        </View>
      </TouchableWithoutFeedback>
      <Text
        style={[
          styles.textType1,
          {
            fontFamily: 'Circular Std Medium',
            fontSize: 20,
            textAlign: 'center',
          },
        ]}>
        {title}
      </Text>
      <View style={{margin: 2}}></View>
    </View>
  );
};

export default ChatHeader;

const styles = StyleSheet.create({
  textType1: {
    fontWeight: '500',
    fontSize: 26,
    color: Color.Black,
    fontFamily: 'Circular Std Medium',
    // lineHeight: 24,
    fontStyle: 'normal',
  },
  textType3: {
    color: Color.Dune,
    fontWeight: '500',
    fontSize: 16,
    fontFamily: 'Circular Std Medium',
    fontStyle: 'normal',
  },
});
