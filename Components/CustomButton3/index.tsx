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

// import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import React, { useState } from 'react';
// import { Color } from '../../Constant';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import * as Animatable from 'react-native-animatable';

// const CustomButton3 = ({ onPress, btnTitle, color, backgroundColor, height, fontSize }:any) => {
//   const [arrowPosition, setArrowPosition] = useState('left');

//   const handlePress = () => {
//     setArrowPosition('right');
//     setTimeout(() => {
//       onPress();
//       setArrowPosition('left');
//     }, 500); // Adjust timing as needed
//   };

//   return (
//     <TouchableOpacity
//       onPress={handlePress}
//       activeOpacity={0.8}
//       style={[styles.btn, { backgroundColor: backgroundColor ? backgroundColor : Color.Primary }]}
//     >
//       <View style={styles.content}>
//         <Text style={[styles.textType1, { color: color ? color : Color.white, fontSize: fontSize ? fontSize : 24 }]}>
//           {btnTitle}
//         </Text>
//         <Animatable.View
//           animation={arrowPosition === 'right' ? 'slideInRight' : 'slideInLeft'}
//           style={styles.iconContainer}
//         >
//           <Icon name="arrow-right" size={20} color={color ? color : Color.white} />
//         </Animatable.View>
//       </View>
//     </TouchableOpacity>
//   );
// };

// export default CustomButton3;

// const styles = StyleSheet.create({
//   btn: {
//     height: 50,
//     borderRadius: 30,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 15,
//   },
//   content: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   textType1: {
//     fontWeight: '500',
//     fontSize: 24,
//     color: Color.white,
//     fontFamily: 'Circular Std Medium',
//   },
//   iconContainer: {
//     marginLeft: 10,
//   },
// });

