import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Color} from '../../Constant';
import CustomButton from '../../Components/CustomButton';
import GoogleSignInButton from '../../Components/GoogleSignInButton';
import FacebookSigninButton from '../../Components/FacebookSigninButton';
import CustomButton3 from '../../Components/CustomButton3';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import CustomButton4 from '../../Components/CustomButton4';
import SwipeableButton from '../../Components/SwipeableButton';
const GetStarted = ({navigation}: any) => {
  const translateX = useSharedValue(0);
  const {width} = Dimensions.get('window');
  const panGesture = Gesture.Pan()
    .onUpdate(event => {
      translateX.value = event.translationX;
      if (translateX.value < 0) {
        translateX.value = 0;
      } else if (translateX.value > width - 80) {
        // Adjust according to your button width
        translateX.value = width - 70;
      }
    })
    .onEnd(() => {
      // Optional: Add snapping behavior or any other logic when the gesture ends
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}],
    };
  });
  const [isLoading, setIsLoading] = useState(false);
  const makeSomeRequest = () => {};

  return (
    <View style={{backgroundColor: Color.GhostWhite, height: '100%'}}>
      <ScrollView showsHorizontalScrollIndicator={false}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 100,
          }}>
          <Image
            source={require('../../Images/Logo00.png')}
            resizeMode="contain"
            style={{width: Dimensions.get('screen').width / 1.5}}
          />
        </View>
        <View>
          <Text
            style={{
              fontFamily: 'Circular Std Medium',
              color: 'black',
              textAlign: 'center',
              fontSize: 28,
              lineHeight: 40,
              marginTop: 20,
            }}>
            Let’s you in
          </Text>
        </View>
        <View style={{position: 'relative', left: -14}}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              marginTop: 40,
            }}>
            <GoogleSignInButton
              title="Continue with Google"
              // onSignInSuccess={}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              marginLeft: 20,
            }}>
            <FacebookSigninButton
              title="Continue with Facebook"
              // onSignInSuccess={(userInfo: any) => {
              //   console.log('User info:', userInfo);
              //   setUserInfo(userInfo);
              // }}
            />
          </TouchableOpacity>
          {/* <TouchableOpacity
            activeOpacity={0.8}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: -10,
            }}>
            <Image source={require('../../Images/AppleCircle.png')} />
            <Text
              style={{
                fontFamily: 'Circular Std Bold',
                color: 'black',
                gap: 20,
                fontSize: 18,
                lineHeight: 22,
              }}>
              Continue with Apple
            </Text>
          </TouchableOpacity> */}
        </View>

        <View>
          <Text
            style={{
              color: Color.IronsideGrey,
              textAlign: 'center',
              fontFamily: 'Circular Std Bold',
              marginVertical: 40,
              fontSize: 16,
              lineHeight: 20,
            }}>
            ( Or )
          </Text>
        </View>

        <View style={{marginHorizontal: 30, marginBottom: 20, marginTop: 10}}>
          {/* <CustomButton3
            btnTitle="Login With Your Account"
            onPress={() => navigation.replace('Login')}
          /> */}
          <SwipeableButton
            btnTitle={'Continue with Login'}
            customWidth={Dimensions.get('screen').width / 1.18}
            customSwipRange={280}
            onSwipe={() => navigation.replace('Login')}
          />
        </View>

        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 15,
            flexDirection: 'row',
            gap: 5,
          }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.replace('SignUp')}>
            <Text
              style={{
                color: Color.IronsideGrey,
                alignSelf: 'center',
                fontSize: 16,
                fontFamily: 'Circular Std Medium',
              }}>
              Don’t have an Account?
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{flexDirection: 'row', gap: 4}}
            activeOpacity={0.8}
            onPress={() => navigation.replace('SignUp')}>
            <Text
              style={{
                color: Color.IronsideGrey,
                fontSize: 16,
                fontFamily: 'Circular Std Book',
              }}>
              Let’s
            </Text>
            <Text
              style={{
                color: Color.Dune,
                fontSize: 16,
                borderBottomWidth: 2,
                borderBottomColor: Color.Primary,
                fontFamily: 'Circular Std Book',
              }}>
              Register
            </Text>
          </TouchableOpacity>
        </View>
        {/* <View style={styles.btn}>
          <PanGestureHandler onGestureEvent={animatedGestureHandler}>
          <Animated.View
            style={{
              backgroundColor: Color.white,
              borderRadius: 100,
              width: 50,
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <AntDesign name="arrowright" size={25} color={Color.Primary} />
          </Animated.View>
          </PanGestureHandler>
        </View> */}
        {/* <View style={styles.btn}>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.draggable, animatedStyle]}>
          <AntDesign name="arrowright" size={25} color={Color.Primary} />
        </Animated.View>
      </GestureDetector>
    </View> */}
        {/* <CustomButton4/> */}
        <View style={{display: 'flex', alignItems: 'center'}}>
          {/* <SwipeableButton 
                 btnTitle={'Continue with Login'} 
                 customWidth={290} 
                 customSwipRange={230}
                 onSwipe={handleDonePress}  /> */}
          {/* <SwipeableButton btnTitle={'Continue with Login'} onSwipe={makeSomeRequest} isLoading={isLoading} /> */}
        </View>
      </ScrollView>
    </View>
  );
};

export default GetStarted;

const styles = StyleSheet.create({
  btn: {
    height: 60,
    borderRadius: 30,
    flexShrink: 0,
    alignItems: 'center',
    marginHorizontal: 15,
    flexDirection: 'row',
    paddingLeft: 5,
    gap: 10,
    paddingRight: 5,
    backgroundColor: Color.Primary,
  },
  draggable: {
    backgroundColor: Color.white,
    borderRadius: 100,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textType1: {
    fontWeight: '500',
    fontSize: 18,
    color: Color.white,
    fontFamily: 'Circular Std Black',
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
