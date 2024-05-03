import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import React, {useState, useCallback} from 'react';
import {Color} from '../../Constant';

const CustomTabView2 = (Props: any): any => {
  const {
    firstRoute,
    secondRoute,
    currentTab,
    activateTab,
    firstRouteTitle,
    secondRouteTitle,
    thirdRoute,
    thirdRouteTitle,
  } = Props;

  const myFirstRoute = () => {
    firstRoute();
  };

  const mySecondRoute = () => {
    secondRoute();
  };

  return (
    <View>
      <View style={{marginBottom: 20, alignItems: 'center'}}>
        <View
          style={{
            width: Dimensions.get('window').width / 1,
            alignItems: 'center',
            flexDirection: 'row',
            //   gap:10
          }}>
          <TouchableOpacity
          activeOpacity={0.8}
            onPress={() => activateTab(0)}
            style={{
              width: '50%',
              borderBottomColor:
                currentTab &&
                currentTab.some((e: any, i: any) => e.index == 0 && e.selected)
                  ? Color.Primary
                  : 'white',
            }}>
            <Text
              style={[
                styles.textType3,
                {
                  color:
                    currentTab &&
                    currentTab.some(
                      (e: any, i: any) => e.index == 0 && e.selected,
                    )
                      ? 'black'
                      : Color.Black,
                  borderBottomWidth: 3,
                  paddingVertical: 15,
                  borderBottomColor:
                    currentTab &&
                    currentTab.some(
                      (e: any, i: any) => e.index == 0 && e.selected,
                    )
                      ? Color.Primary
                      : Color.lineColor,
                },
              ]}>
              {firstRouteTitle}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
          activeOpacity={0.8}
            onPress={() => activateTab(1)}
            style={{
              width: '50%',
            }}>
            <Text
              style={[
                styles.textType3,
                {
                  color:
                    currentTab &&
                    currentTab.some(
                      (e: any, i: any) => e.index == 1 && e.selected,
                    )
                      ? 'black'
                      : Color.Black,
                  borderBottomWidth: 3,
                  paddingVertical: 15,
                  borderBottomColor:
                    currentTab &&
                    currentTab.some(
                      (e: any, i: any) => e.index == 1 && e.selected,
                    )
                      ? Color.Primary
                      : Color.lineColor,
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
          : secondRoute()}
      </View>
    </View>
  );
};

export default CustomTabView2;

const styles = StyleSheet.create({
  text: {
    color: Color.Black,
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  textType3: {
    color: Color.Dune,
    fontWeight: '600',
    fontSize: 18,
    fontFamily: 'Circular Std Medium',
    fontStyle: 'normal',
    textAlign: 'center',
  },
  textType1: {
    fontWeight: '500',
    fontSize: 26,
    color: Color.Black,
    fontFamily: 'Circular Std Medium',
    lineHeight: 24,
    fontStyle: 'normal',
    textAlign: 'center',
  },
});
