import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Color} from '../../Constant';
import LinearGradient from 'react-native-linear-gradient';

const CustomButton2 = ({
  onPress,
  btnTitle,
  color,
  backgroundColor,
  height,
  fontSize,
}: any) => {
  return (
    //     <TouchableOpacity
    //     onPress={onPress}
    //     activeOpacity={0.8}
    //     style={[styles.btn, { marginVertical: 0,backgroundColor: backgroundColor ? backgroundColor : Color.purpleLite,  }]}
    //   >
    //     <Text style={[styles.textType1,{color:color ? color : Color.white,textAlign:'center', fontSize:fontSize ? fontSize : 24,}]}> {btnTitle} </Text>

    //   </TouchableOpacity>
    <View>
      <LinearGradient
        colors={['#8154e2', '#4e22b5']}
        useAngle={true}
        angle={45}
        style={{
          borderTopRightRadius: 8,
          borderTopLeftRadius: 8,
          borderBottomLeftRadius: 8,
        }}>
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={0.8}
          style={[styles.btn]}>
          <Text
            style={[
              styles.textType1,
              {
                color: color ? color : Color.white,
                textAlign: 'center',
                fontSize: fontSize ? fontSize : 22,
              },
            ]}>
            {' '}
            {btnTitle}{' '}
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

export default CustomButton2;

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
