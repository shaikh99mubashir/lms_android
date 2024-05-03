import { StyleSheet, Text, View, FlatList, } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Color } from '../../Constant';
import {  } from 'react-native';

const Carousel = ({ data, updateCurrentSlideIndex }:any) => {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const flatListRef = useRef<FlatList | null>(null);
  
    useEffect(() => {
      const autoScroll = setInterval(() => {
        const newIndex = (currentSlideIndex + 1) % data.length;
        flatListRef.current?.scrollToIndex({ index: newIndex, animated: true });
        setCurrentSlideIndex(newIndex);
      }, 5000);
  
      return () => clearInterval(autoScroll);
    }, [currentSlideIndex, data]);


  
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 10,
          alignItems: 'center',
        }}>
        {data.map((_:any, index:number) => (
          <View
            key={index}
            style={[
              styles.indicator,
              currentSlideIndex === index && {
                backgroundColor: Color.Primary,
                width: 30,
                height: 8,
                borderRadius: 10,
                gap: 15,
              },
            ]}
          />
        ))}
      </View>
    );
}

export default Carousel

const styles = StyleSheet.create({
    indicator: {
        height: 8,
        width: 8,
        backgroundColor: Color.LightPattensBlue,
        borderRadius:50
    },
})