import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Color } from '../../Constant';

const { width } = Dimensions.get('window');

const CustomButton = () => {
  const translateX = useSharedValue(0);
  const BUTTON_WIDTH = width * 0.9; // Adjust according to your button width
  const ARROW_WIDTH = 50;
  const SNAP_THRESHOLD = BUTTON_WIDTH * 0.8; // 80% of the button width

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
      if (translateX.value < 0) {
        translateX.value = 0;
      } else if (translateX.value > BUTTON_WIDTH - ARROW_WIDTH) {
        translateX.value = BUTTON_WIDTH - ARROW_WIDTH;
      }
    })
    .onEnd(() => {
      if (translateX.value < SNAP_THRESHOLD) {
        translateX.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <View style={styles.btn}>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.draggable, animatedStyle]}>
          <AntDesign name="arrowright" size={25} color={Color.Primary} />
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  btn: {
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    marginHorizontal: 15,
    flexDirection: 'row',
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: Color.Primary,
    width: '90%',
    justifyContent: 'flex-start',
  },
  draggable: {
    backgroundColor: Color.white,
    borderRadius: 100,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
