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

const CustomTabView = (Props: any): any => {
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
    <View style={{ marginBottom: 10, alignItems: 'center' }}>
      <View
        style={{
          width:'100%',
          alignItems: 'center',
          flexDirection: 'row',
          gap:6,
          borderRadius:50,
          backgroundColor:Color.liteGrey,
          paddingHorizontal:6,
          paddingVertical:5
        }}>
        <TouchableOpacity
        activeOpacity={0.8}
          onPress={() => activateTab(0)}
          style={{
            width: 
            currentTab &&
                currentTab.some((e: any, i: any) => e.index == 0 && e.selected)
                ? '53%'
                : '45%'
            ,
            borderRadius:30,
            
            paddingVertical: 
            currentTab &&
            currentTab.some((e: any, i: any) => e.index == 0 && e.selected)
            ? 8
            : 8,
            borderColor: Color.white,
            backgroundColor:
              currentTab &&
                currentTab.some((e: any, i: any) => e.index == 0 && e.selected)
                ? Color.white
                : Color.liteGrey,
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
                    ? Color.IronsideGrey
                    : Color.IronsideGrey,
                fontFamily: 'Circular Std Medium',
                fontSize:
                currentTab &&
                currentTab.some((e: any, i: any) => e.index == 1 && e.selected)
                ? 16
                : 16,
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
                ? '45%'
                : '53%'
            ,
            borderRadius: 50,
            paddingVertical: 
            currentTab &&
            currentTab.some((e: any, i: any) => e.index == 0 && e.selected)
            ? 8
            : 8,
            // paddingHorizontal: 
            // currentTab &&
            // currentTab.some((e: any, i: any) => e.index == 0 && e.selected)
            // ? 15
            // : 15,
            backgroundColor:
              currentTab &&
                currentTab.some((e: any, i: any) => e.index == 0 && e.selected)
                ? Color.liteGrey
                : Color.white,
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
                    ? Color.IronsideGrey
                    : Color.IronsideGrey,
                fontFamily: 'Circular Std Book',
                fontSize:
                currentTab &&
                currentTab.some((e: any, i: any) => e.index == 1 && e.selected)
                ? 16
                : 16,
                borderBottomColor:
                  currentTab &&
                    currentTab.some((e: any, i: any) => e.index == 1 && e.selected)
                    ? Color.white
                    : Color.IronsideGrey,
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

export default CustomTabView;

const styles = StyleSheet.create({
  text: {
    color: Color.IronsideGrey,
    fontSize: 18,
    // fontWeight: '400',
    textAlign: 'center',
    fontFamily: 'Circular Std Bold',
    
  },
});