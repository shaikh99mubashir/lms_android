import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    FlatList,
    Dimensions,
  } from 'react-native';
  import React, { useState, useCallback } from 'react';
  import { Color } from '../../Constant';
  
  const CustomTabView3 = (Props: any): any => {
    const {
      firstRoute,
      secondRoute,
      currentTab,
      activateTab,
      thirdRoute,
      firstRouteTitle,  
      secondRouteTitle,
    } = Props;
  
    return (
      <View>
      <View style={{ marginBottom: 40, alignItems: 'center' }}>
        <View
          style={{
            width:'100%',
            alignItems: 'center',
            flexDirection: 'row',
            // gap:6,
            borderRadius:10,
          }}>
          <TouchableOpacity
          activeOpacity={0.8}
            onPress={() => activateTab(0)}
            style={{
              width: 
              currentTab &&
                  currentTab.some((e: any, i: any) => e.index == 0 && e.selected)
                  ? '50%'
                  : '50%'
              ,
              // borderRadius:30,
              
              paddingVertical: 
              currentTab &&
              currentTab.some((e: any, i: any) => e.index == 0 && e.selected)
              ? 15
              : 15,
              
              paddingHorizontal: 
              currentTab &&
              currentTab.some((e: any, i: any) => e.index == 0 && e.selected)
              ? 15
              : 15,
              borderColor: Color.Primary,
              backgroundColor:
                currentTab &&
                  currentTab.some((e: any, i: any) => e.index == 0 && e.selected)
                  ? Color.Primary
                  : Color.shinyGrey,
                  borderTopLeftRadius:10,
                  borderBottomLeftRadius:10,
            }}>
            <Text
              style={[
                styles.text,
                {
                  color:
                    currentTab &&
                      currentTab.some(
                        (e: any, i: any) => e.index == 0 && e.selected,
                      )
                      ? 'white'
                      : Color.Dune,
                  fontFamily: 'Circular Std Bold',
                  fontSize:
                  currentTab &&
                  currentTab.some((e: any, i: any) => e.index == 1 && e.selected)
                  ? 18
                  : 20,
                },
              ]}>
              {firstRouteTitle}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
          activeOpacity={0.8}
            onPress={() => activateTab(1)}
            style={{
              width: 
              currentTab &&
                  currentTab.some((e: any, i: any) => e.index == 0 && e.selected)
                  ? '50%'
                  : '50%'
              ,
              // borderRadius: 50,
              borderTopRightRadius:10,
              borderBottomRightRadius:10,
              paddingVertical: 
              currentTab &&
              currentTab.some((e: any, i: any) => e.index == 0 && e.selected)
              ? 15
              : 15,
              paddingHorizontal: 
              currentTab &&
              currentTab.some((e: any, i: any) => e.index == 0 && e.selected)
              ? 15
              : 15,
              backgroundColor:
                currentTab &&
                  currentTab.some((e: any, i: any) => e.index == 0 && e.selected)
                  ? Color.shinyGrey
                  : Color.Primary,
            }}>
            <Text
              style={[
                styles.text,
                {
                  color:
                    currentTab &&
                      currentTab.some(
                        (e: any, i: any) => e.index == 1 && e.selected,
                      )
                      ? 'white'
                      : Color.Dune,
                  fontFamily: 'Circular Std Bold',
                  fontSize:
                  currentTab &&
                  currentTab.some((e: any, i: any) => e.index == 1 && e.selected)
                  ? 20
                  : 18,
                  borderBottomColor:
                    currentTab &&
                      currentTab.some((e: any, i: any) => e.index == 1 && e.selected)
                      ? Color.Primary
                      : 'white',
                },
              ]}>
              {secondRouteTitle}
            </Text>
          </TouchableOpacity>
        </View>
  
        {currentTab &&
          currentTab.length > 0 &&
          currentTab.some((e: any, i: any) => e.index == 0 && e.selected)
          ? firstRoute()
          :
          currentTab.length > 0 &&
            currentTab.some((e: any, i: any) => e.index == 1 && e.selected)
            ?
            secondRoute() : thirdRoute()}
      </View>
    </View>
    );
  };
  
  export default CustomTabView3;
  
  const styles = StyleSheet.create({
    text: {
      color: Color.Dune,
      fontSize: 18,
      // fontWeight: '400',
      textAlign: 'center',
      fontFamily: 'Circular Std Bold',
      
    },
  });