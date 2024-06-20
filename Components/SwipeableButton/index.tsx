import React, {useEffect} from 'react';
import {ActivityIndicator, Dimensions, StyleSheet, View} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import Entypo from 'react-native-vector-icons/Entypo';
import {Color} from '../../Constant';

type SwipeButtonPropsType = {
  onSwipe: () => void;
  isLoading?: boolean;
  btnTitle: string;
  customWidth: number;
  customSwipRange: number;
};

const SwipeableButton = ({
  onSwipe,
  isLoading = false,
  btnTitle,
  customWidth,
  customSwipRange,
}: SwipeButtonPropsType) => {
  const BUTTON_WIDTH = Dimensions.get('screen').width - 48;
  const SWIPE_RANGE = BUTTON_WIDTH - customSwipRange ? customSwipRange : 62;
  const X = useSharedValue(0);

  useEffect(() => {
    if (!isLoading) {
      X.value = withSpring(0);
    }
  }, [isLoading]);

  const animatedGestureHandler = useAnimatedGestureHandler({
    onActive: e => {
      const newValue = e.translationX;

      if (newValue >= 0 && newValue <= SWIPE_RANGE) {
        X.value = newValue;
      }
    },
    onEnd: () => {
      if (X.value < SWIPE_RANGE - 20) {
        X.value = withSpring(0);
      } else {
        runOnJS(onSwipe)();
      }
    },
  });

  const AnimatedStyles = {
    swipeButton: useAnimatedStyle(() => {
      return {
        transform: [
          {
            translateX: interpolate(
              X.value,
              [20, BUTTON_WIDTH],
              [0, BUTTON_WIDTH],
              Extrapolation.CLAMP,
            ),
          },
        ],
      };
    }),
    swipeText: useAnimatedStyle(() => {
      return {
        opacity: interpolate(
          X.value,
          [0, BUTTON_WIDTH / 4],
          [1, 0],
          Extrapolate.CLAMP,
        ),
        transform: [
          {
            translateX: interpolate(
              X.value,
              [20, SWIPE_RANGE],
              [0, BUTTON_WIDTH / 3],
              Extrapolate.CLAMP,
            ),
          },
        ],
      };
    }),
  };

  return (
    <View
      style={[
        styles.swipeButtonContainer,
        {width: customWidth ? customWidth : BUTTON_WIDTH},
      ]}>
      <PanGestureHandler
        enabled={!isLoading}
        onGestureEvent={animatedGestureHandler}>
        <Animated.View style={[styles.swipeButton, AnimatedStyles.swipeButton]}>
          {isLoading ? (
            <ActivityIndicator color={'#000'} />
          ) : (
            <Entypo
              name="chevron-small-right"
              size={40}
              color={Color.Primary}
            />
          )}
        </Animated.View>
      </PanGestureHandler>
      <Animated.Text style={[styles.swipeText, AnimatedStyles.swipeText]}>
        {btnTitle}
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  swipeButtonContainer: {
    height: 60,
    backgroundColor: Color.Primary,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    // width: BUTTON_WIDTH,
  },
  swipeButton: {
    position: 'absolute',
    left: 0,
    height: 50,
    width: 50,
    borderRadius: 50,
    zIndex: 3,
    backgroundColor: Color.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
  },
  swipeButtonDisabled: {
    backgroundColor: '#E4E9EE',
  },
  swipeText: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: '400',
    zIndex: 2,
    color: 'white', // Change this line to black color
    marginLeft: 80,
    fontFamily: 'Circular Std Book',
  },
  chevron: {
    height: 25,
    width: 20,
    tintColor: 'white',
  },
});

export default SwipeableButton;
