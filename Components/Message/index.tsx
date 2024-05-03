import React, {useState, useRef} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {
  FlingGestureHandler,
  Directions,
  State,
} from 'react-native-gesture-handler';
import Animated, {
  withSpring,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  useSharedValue,
} from 'react-native-reanimated';

import {Color} from '../../Constant';

const Message = ({time, isLeft, message, onSwipe}: any) => {
  const startingPosition = 0;
  const x = useSharedValue(startingPosition);

  const isOnLeft = (type: any): any => {
    if (isLeft && type === 'messageContainer') {
      return {
        alignSelf: 'flex-start',
        backgroundColor: Color.Primary,
        borderBottomLeftRadius: 0,
      };
    } else if (isLeft && type === 'message') {
      return {
        color: Color.white,
      };
    } else if (isLeft && type === 'time') {
      return {
        color: Color.Dune,
        alignSelf: 'flex-end',
        position: 'relative',
        top: -30,
        left: -55,
        fontSize: 13,
      };
    } else {
      return {
        borderBottomRightRadius: 0,
      };
    }
  };

  const eventHandler: any = useAnimatedGestureHandler({
    onStart: (event, ctx) => {},
    onActive: (event, ctx) => {
      x.value = isLeft ? 50 : -50;
    },
    onEnd: (event, ctx) => {
      x.value = withSpring(startingPosition);
    },
  });

  const uas = useAnimatedStyle(() => {
    return {
      transform: [{translateX: x.value}],
    };
  });
  // isOnLeft('messageContainer')
  // isOnLeft('message')
  // isOnLeft('time')
  return (
    <FlingGestureHandler
      // direction={isLeft ? Directions.RIGHT : Directions.LEFT}
      // onGestureEvent={eventHandler}
      // onHandlerStateChange={({nativeEvent}) => {
      //   if (nativeEvent.state === State.ACTIVE) {
      //     onSwipe(message, isLeft);
      //   }
      // }}
      >
      <Animated.View style={[styles.container, ]}>
        <View style={[styles.messageContainer,]}>
          <View style={styles.messageView}>
            <Text style={[styles.message,]}>{message}</Text>
          </View>
          <View style={styles.timeView}>
            <Text style={[styles.time, ]}>{time}</Text>
          </View>
        </View>
      </Animated.View>
    </FlingGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    marginVertical: 5,
  },
  messageContainer: {
    backgroundColor: Color.PattensBlue,
    maxWidth: '80%',
    alignSelf: 'flex-end',
    flexDirection: 'row',
    borderRadius: 30,
    paddingHorizontal: 10,
    marginHorizontal: 0,
    marginVertical: 10,
    paddingTop: 5,
    paddingBottom: 10,
  },
  messageView: {
    backgroundColor: 'transparent',
    maxWidth: '80%',
  },
  timeView: {
    backgroundColor: 'transparent',
    justifyContent: 'flex-start',
    paddingLeft: 10,
  },
  message: {
    color: Color.Black,
    alignSelf: 'flex-start',
    fontSize: 15,
    paddingHorizontal: 12,
    paddingVertical: 8,
    lineHeight: 20,
    width: 250,
  },
  time: {
    color: Color.Dune,
    alignSelf: 'flex-start',
    top: -30,
    left: -220,
    fontSize: 13,
  },
});

export default Message;
