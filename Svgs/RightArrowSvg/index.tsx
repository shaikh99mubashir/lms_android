import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Path, Svg} from 'react-native-svg';
import {Color} from '../../Constant';

const RightArrowSvg = ({color}:any) => {
  return (
    <View>
      <Svg width={24} height={24} viewBox="0 0 24 24">
        <Path
          d="M10 6l6 6-6 6"
          fill="none"
          stroke={color ? color : Color.Primary}
          strokeWidth={2}
        />
      </Svg>
    </View>
  );
};

export default RightArrowSvg;

const styles = StyleSheet.create({});
