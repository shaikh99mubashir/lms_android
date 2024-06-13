import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useRef} from 'react';
import {
  SafeAreaView,
  Image,
  StyleSheet,
  FlatList,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from '../../Components/CustomButton';
import {Color} from '../../Constant';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomButton3 from '../../Components/CustomButton3';
import FastImage from 'react-native-fast-image';

const {width, height} = Dimensions.get('window');

const COLORS = {primary: 'pink', white: 'black'};

const slides = [
  {
    id: '1',
    image: require('../../Images/OB1.gif'),
    // image2: require('../../Images/Dot.png'),
    title: 'Online Learning',
    subtitle: 'We Provide Classes Online Classes and ',
    subtitle2: 'Pre Recorded Leactures.!',
  },
  {
    id: '2',
    image: require('../../Images/OB2.gif'),
    // image2: require('../../Images/Dot.png'),
    title: 'Learn from Anytime',
    subtitle: 'Booked or Same the Lectures for ',
    subtitle2: 'Future',
  },
  {
    id: '3',
    image: require('../../Images/OB3.gif'),
    // image2: require('../../Images/Dot.png'),
    title: 'Get Online Certificate',
    subtitle: 'Analyse your scores and Track your ',
    subtitle2: 'results',
  },
];

const Slide = ({item, index}: any) => {
  console.log('index',index);
  console.log('item',item);
  
  return (
    <View style={{alignItems: 'center', marginTop: 40}}>
      <Text
        style={[
          {
            marginTop: 20,
            fontFamily: 'Circular Std Medium',
            color: 'black',
            fontSize: 26,
            lineHeight: 24,
          },
        ]}>
        {item?.title}
      </Text>
      <View style={{justifyContent:'center', alignItems:'center'}}>
      <FastImage
        source={item?.image}
        resizeMode={FastImage.resizeMode.contain}
        style={{height: item.id == 1 ? '65%' : item.id == 2? '55%' :'75%', width,  
        marginTop: item.id == 2 ? 80 : 40}}
        />
        </View>
      <View style={{position:'absolute', bottom:50}}>
      <View
        style={{alignItems: 'center', justifyContent: 'center', marginTop: 60}}>
        <Text
          style={{
            fontFamily: 'Circular Std Book',
            color: 'black',
            fontSize: 15,
            lineHeight: 23,
          }}>
          {item?.subtitle}
        </Text>
      </View>
      {item?.subtitle2 && (
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text
            style={{
              fontFamily: 'Circular Std Book',
              color: 'black',
              fontSize: 15,
            }}>
            {item?.subtitle2}
          </Text>
        </View>
      )}
      </View>
    </View>
  );
};

const OnBoarding = ({navigation}: any) => {
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const ref: any = React.useRef();
  const updateCurrentSlideIndex = (e: any) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({offset});
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const skip = () => {
    // const lastSlideIndex = slides.length - 1;
    // const offset = lastSlideIndex * width;
    // ref?.current.scrollToOffset({offset});
    // setCurrentSlideIndex(lastSlideIndex);
    navigation.replace('GetStarted');
  };

  const handleDonePress = () => {
    
    navigation.replace('GetStarted');
  };
  const handleLoginPress = () => {
    // AsyncStorage.setItem('OnBoarding', 'true');
    // navigation.replace('Login')
  };

  const Footer = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{marginBottom: 10, marginHorizontal: 10}}>
          <UpperScroll />
        </View>
        <View style={{marginBottom: 10, marginHorizontal: 10}}>
          {currentSlideIndex == slides.length - 1 ? (
            <>
              <View
                style={{height: 50,width:'100%', paddingHorizontal: 15, marginBottom: 20}}>
                <CustomButton3
                  onPress={() => handleDonePress()}
                  btnTitle="Get Started"
                />
              </View>
              {/* <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handleLoginPress()}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 40,
                flexDirection: 'row',
                gap: 10,
              }}>
              <View>
                <Text
                  style={{
                    color: Color.IronsideGrey,
                    alignSelf: 'center',
                    fontSize: 16,
                    fontFamily: 'Circular Std Medium',
                  }}>
                  Already have an Account?
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    color: Color.Dune,
                    fontWeight: '500',
                    fontSize: 16,
                    borderBottomWidth: 2,
                    borderBottomColor: Color.Primary,
                    fontFamily: 'Circular Std Medium',
                  }}>
                  Login
                </Text>
              </View>
            </TouchableOpacity> */}
            </>
          ) : (
            <View style={{height: 50, marginBottom: 20, paddingHorizontal: 15}}>
              {/* <CustomButton onPress={goToNextSlide} btnTitle="Next" /> */}
              <TouchableOpacity activeOpacity={0.8} onPress={goToNextSlide}   style={{backgroundColor:Color.Primary,borderRadius:50,width:60, height:60,alignItems:'center',justifyContent:"center"}}>
                <AntDesign name="arrowright" size={25} color={Color.white} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  const roundedCornerStyle = {
    borderTopLeftRadius: 18,
    borderBottomLeftRadius: 18,
  };

  const roundedEndStyle = {
    borderTopRightRadius: 18,
    borderBottomRightRadius: 18,
    left: -1,
  };

  const UpperScroll = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          left: 10,
        }}>
        {/* Render indicator */}
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              currentSlideIndex == index && {
                backgroundColor: Color.Primary,
                width: 20,
                height: 10,
                borderRadius: 50,
              },
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: Color.white, paddingTop: 20}}>
      {/* <StatusBar backgroundColor={Color.white} /> */}
      <View style={{alignItems: 'center', flexDirection: 'row', marginTop: 20}}>
        <View style={{width: '60%'}}>
          <View style={{justifyContent: 'flex-end', alignItems: 'flex-end'}}>
            {/* <Image source={require("../../Images/Dot.png")}/> */}
          </View>
        </View>

        <View style={{width: '40%'}}>
          <TouchableOpacity
            onPress={() => skip()}
            activeOpacity={0.8}
            style={{
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              marginRight: 20,
            }}>
            {currentSlideIndex !== slides.length - 1 && (
              <Text
                style={{
                  color: Color.Dune,
                  textAlign: 'right',
                  fontSize: 14,
                  fontFamily: 'Circular Std Medium',
                }}>
                Skip
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View style={{margin: 20}}></View>
      {/* <View style={{alignItems: 'center'}}>
        <Text
          style={{
            marginTop: 40,
            color: 'black',
            fontSize: 20,
            fontFamily: 'Circular Std Medium',
            fontWeight: '500',
          }}>{`${currentSlideIndex + 1}/${slides.length}`}</Text>
      </View> */}
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        contentContainerStyle={{height: height * 0.75}}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={slides}
        pagingEnabled
        renderItem={({item}) => <Slide item={item} />}
      />
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    color: COLORS.white,
    fontSize: 13,
    marginTop: 10,
    // maxWidth: '70%',
    textAlign: 'center',
    lineHeight: 23,
  },
  title: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: 'bold',
    // marginTop: 20,
    textAlign: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  indicator: {
    height: 10,
    width: 10,
    borderRadius: 50,
    marginHorizontal: 3,
    backgroundColor: '#e5e3f9',
    // borderLeftWidth:1
  },
  btn: {
    flex: 1,
    height: 50,
    // width:360,
    borderRadius: 30,
    flexShrink: 0,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default OnBoarding;
