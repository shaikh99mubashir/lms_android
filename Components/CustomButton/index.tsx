import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Color } from '../../Constant'

const CustomButton = ({onPress,btnTitle, color, backgroundColor,height,fontSize }:any) => {
  return (
    <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.8}
    style={[styles.btn, { marginVertical: 0,backgroundColor: backgroundColor ? backgroundColor : Color.Primary,  }]}
  >
    <Text style={[styles.textType1,{color:color ? color : Color.white,textAlign:'center', fontSize:fontSize ? fontSize : 24,}]}> {btnTitle} </Text>

  </TouchableOpacity>

  )
}

export default CustomButton

const styles = StyleSheet.create({
    btn: {
      height: 50,
      borderRadius: 30,
      flexShrink: 0,
      backgroundColor: '#000',
      justifyContent: 'center',
      alignItems: 'center',
      // marginHorizontal: 15,
    },
    textType1: {
        fontWeight: '500', 
        fontSize: 24, color: Color.white, 
        fontFamily: 'Circular Std Medium', lineHeight: 24
    },
    textType2: {
        color: Color.IronsideGrey, alignSelf: 'center', fontWeight: '500', fontSize: 16
    },
    textType3: {
        color: Color.Dune, fontWeight: '500', fontSize: 16, borderBottomWidth: 2, borderBottomColor: Color.Primary
    },
  });