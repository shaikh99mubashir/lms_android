import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Color} from '../../Constant';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
const CustomButton3 = ({
  onPress,
  btnTitle,
  color,
  backgroundColor,
  height,
  fontSize,
}: any) => {
  return (
    <View
      style={{
        borderRadius: 30,
        backgroundColor: Color.Primary,
      }}>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        style={[
          styles.btn,
          {
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingLeft: 15,
            gap: 10,
            paddingRight: 5,
          },
        ]}>
        <Text
          style={[
            styles.textType1,
            {
              color: color ? color : Color.white,
              textAlign: 'center',
              fontSize: fontSize ? fontSize : 20,
            },
          ]}>
          {' '}
          {btnTitle}{' '}
        </Text>
        <View
          style={{
            backgroundColor: Color.white,
            borderRadius: 100,
            width: 50,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <AntDesign name="arrowright" size={25} color={Color.Primary} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton3;

const styles = StyleSheet.create({
  btn: {
    height: 60,
    flexShrink: 0,
    justifyContent: 'center',
    alignItems: 'center',

    // marginHorizontal: 15,
  },
  textType1: {
    fontWeight: '500',
    fontSize: 24,
    color: Color.white,
    fontFamily: 'Circular Std Medium',
    lineHeight: 24,
  },
  textType2: {
    color: Color.IronsideGrey,
    alignSelf: 'center',
    fontWeight: '500',
    fontSize: 16,
  },
  textType3: {
    color: Color.Dune,
    fontWeight: '500',
    fontSize: 16,
    borderBottomWidth: 2,
    borderBottomColor: Color.Primary,
  },
});
