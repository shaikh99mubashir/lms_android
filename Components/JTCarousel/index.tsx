import { Dimensions, FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Color } from '../../Constant';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Animated from 'react-native-reanimated';

const JTCarousel = () => {
    const [currentIndexJT, setCurrentIndexJT] = useState(0);
    const flatListRefJT = useRef<FlatList | null>(null);
    const {width, height} = Dimensions.get('screen');
    const jobTicketsData = [
        {
          id: '1',
          commission: 'RM 190.00',
          subject: 'Science',
          location: 'Online',
          level: 'SPM',
        },
        {
          id: '1',
          commission: 'RM 200.00',
          subject: 'Science',
          location: 'Online',
          level: 'SPM',
        },
        {
          id: '1',
          commission: 'RM 210.00',
          subject: 'Science',
          location: 'Online',
          level: 'SPM',
        },
      ];
    const renderJobTicketItem = ({item}: any) => (
        <View
          style={{
            backgroundColor: Color.white,
            borderRadius: 20,
            marginVertical: 10,
            marginRight: 10,
            width: width - 55,
          }}>
          <View
            style={{
              padding: 20,
              backgroundColor: Color.Primary,
              borderTopEndRadius: 20,
              borderTopStartRadius: 20,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text style={[styles.textType3, {color: Color.white}]}>
                Commission
              </Text>
              <View style={{margin: 1}}></View>
              <Text style={[styles.textType1, {color: Color.white}]}>
                {item.commission}
              </Text>
            </View>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: Color.Black,
                  width: 95,
                  borderRadius: 30,
                  gap: 5,
                  paddingVertical: 3,
                  justifyContent: 'center',
                }}>
                <Text
                  style={[styles.textType3, {color: Color.white, fontSize: 14}]}>
                  Online
                </Text>
                <AntDesign name="arrowright" color={Color.white} size={15} />
              </View>
            </View>
          </View>
          <View
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              flexDirection: 'row',
              marginVertical: 20,
            }}>
            <View style={styles.jobTicketImg}>
              <Image source={require('../../Images/JTSub.png')} />
              <Text style={[styles.textType3, {color: Color.DustyGrey}]}>
                Subject
              </Text>
              <Text style={[styles.textType3, {fontSize: 18}]}>Science</Text>
            </View>
            <View style={styles.jobTicketImg}>
              <Image source={require('../../Images/JTLoc.png')} />
              <Text style={[styles.textType3, {color: Color.DustyGrey}]}>
                Location
              </Text>
              <Text style={[styles.textType3, {fontSize: 18}]}>Online</Text>
            </View>
            <View style={styles.jobTicketImg}>
              <Image source={require('../../Images/JTLevel.png')} />
              <Text style={[styles.textType3, {color: Color.DustyGrey}]}>
                Level
              </Text>
              <Text style={[styles.textType3, {fontSize: 18}]}>SPM</Text>
            </View>
          </View>
        </View>
      );
    const handleScroll = (event: any) => {
      const {contentOffset, layoutMeasurement} = event.nativeEvent;
      const index = Math.floor(contentOffset.x / layoutMeasurement.width);
      setCurrentIndexJT(index);
    };
  
    const renderPagination = () => {
      return (
        <View style={styles.pagination}>
          {jobTicketsData.map((_, index) => (
            <Animated.View
              key={index}
              style={[
                styles.indicator,
                currentIndexJT === index ? styles.activeIndicator : null,
              ]}
            />
          ))}
        </View>
      );
    };
  
    useEffect(() => {
      const intervalId = setInterval(() => {
        const nextIndex = (currentIndexJT + 1) % jobTicketsData.length;
        setCurrentIndexJT(nextIndex);
        flatListRefJT.current?.scrollToIndex({animated: true, index: nextIndex});
      }, 3000);
  
      return () => clearInterval(intervalId);
    }, [currentIndexJT]);
  return (
    <View style={styles.container}>
            <FlatList
              ref={flatListRefJT}
              data={jobTicketsData}
              keyExtractor={(item, index) => String(index)}
              renderItem={renderJobTicketItem}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              onScroll={handleScroll}
              pagingEnabled
            />
            {renderPagination()}
          </View>
  )
}

export default JTCarousel

const styles = StyleSheet.create({
    textType1: {
        fontWeight: '500',
        fontSize: 24,
        color: Color.Dune,
        fontFamily: 'Circular Std Medium',
        lineHeight: 24,
        fontStyle: 'normal',
      },
      textType3: {
        color: Color.Dune,
        fontSize: 16,
        fontFamily: 'Circular Std Medium',
      },
      textType2: {
        color: Color.Dune,
        textAlign: 'center',
        fontFamily: 'Circular Std Medium',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '500',
        lineHeight: 20,
      },
      jobTicketImg: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
      },
    container: {
        flex: 1,
      },
      pagination: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop:10
      },
      indicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 5,
        backgroundColor: Color.LightPattensBlue, // Inactive indicator color
      },
      activeIndicator: {
        backgroundColor: Color.Primary, // Active indicator color
        width: 30,
        height: 8,
        borderRadius: 10,
        gap: 15,
      }
})