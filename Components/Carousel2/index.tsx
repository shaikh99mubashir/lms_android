import * as React from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

function Carousel2({sliderData}: any) {
  console.log('sliderData1111', sliderData);

  const width = Dimensions.get('window').width;
  const images = [
    {uri: 'https://picsum.photos/200/300'},
    {uri: 'https://picsum.photos/600/500'},
    {uri: 'https://picsum.photos/700/600'},
  ];
  return (
    <View style={{}}>
      <Carousel
        loop
        width={width / 1.1}
        height={width / 2}
        autoPlay={true}
        data={sliderData}
        scrollAnimationDuration={1000}
        // onSnapToItem={index => console.log('current index:', index)}
        renderItem={({item}: any) => {
          return (
            <View
              style={{
                borderRadius: 10,
                justifyContent: 'center',
                marginRight: 12,
              }}>
              <Image
                source={{uri: item.full_image_url}}
                style={{width: '100%', height: '100%', borderRadius: 10}}
                resizeMode="cover"
              />
            </View>
          );
        }}
      />
    </View>
  );
}

export default Carousel2;

const styles = StyleSheet.create({});
