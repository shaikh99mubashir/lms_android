import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Colors from '../../contant/colors';
const CustomDropDown = (props: any) => {
  let {
    ddTitle,
    categoryData,
    searchData,
    searchFunc,
    subject,
    search,
    headingStyle,
    categoryShow,
    dropdownPlace,
    dropdownContainerStyle,
    setSelectedSubject,
    selectedSubject,
  } = props;

  const [selectedServicedata, setSelectedServicedata]: any = useState({});
  const [serviceDD, setServiceDD] = useState(false);
  const SelectedServices = (item: any) => {
    setSelectedSubject(item);

    setServiceDD(!serviceDD);
  };

  const filterSearchData = (text: string) => {
    if (text.length > 0) {
      searchFunc(text, search);
    }
  };

  return (
    <View>
      <View style={{borderRadius: 5, overflow: 'hidden', marginHorizontal: 0}}>
        {ddTitle && (
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              color: Colors.white,
              fontSize: 16,
              fontWeight: 'bold',
              marginVertical: 5,
              marginHorizontal: 5,
              ...headingStyle,
            }}>
            {ddTitle}
          </Text>
        )}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setServiceDD(!serviceDD)}
          style={{
            paddingVertical: 10,
            paddingHorizontal: 10,
            justifyContent: 'center',
            borderWidth: 1,
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
            borderBottomWidth: serviceDD ? 0 : 1,
            borderBottomLeftRadius: serviceDD ? 1 : 5,
            borderBottomRightRadius: serviceDD ? 1 : 5,
            borderColor: Colors.gray,
            alignItems: 'center',
            // backgroundColor:'red',
            ...dropdownContainerStyle,
          }}>
          {selectedServicedata &&
          Object.keys(selectedServicedata).length > 0 ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
              }}>
              <Text
                style={{
                  color: Colors.gray,
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: 16,
                }}>
                {selectedServicedata.complain_name &&
                selectedServicedata.complain_name > 10
                  ? selectedServicedata.complain_name.slice(0, 10)
                  : selectedServicedata.complain_name}
              </Text>
              {serviceDD ? (
                <Image
                  source={require('../../Images/up.png')}
                  style={{width: 20, height: 20}}
                />
              ) : (
                <Image
                  source={require('../../Images/down.png')}
                  style={{width: 20, height: 20}}
                />
              )}
            </View>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
              }}>
              <Text
                style={{
                  color: Colors.gray,
                  fontWeight: '400',
                  fontSize: 14,
                }}>
                {selectedSubject
                  ? selectedSubject.subject
                  : dropdownPlace ?? ddTitle}
              </Text>
              {serviceDD ? (
                <View
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 100,
                    backgroundColor: Colors.secondary,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../../Assets/Images/down.png')}
                    style={{width: 10, height: 15}}
                    resizeMode="contain"
                  />
                </View>
              ) : (
                <View
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 100,
                    backgroundColor: Colors.secondary,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../../Assets/Images/down.png')}
                    style={{width: 10, height: 15}}
                    resizeMode="contain"
                  />
                </View>
              )}
            </View>
          )}
        </TouchableOpacity>
      </View>
      {categoryData && (
        <View
          style={{
            borderBottomEndRadius: 5,
            borderBottomStartRadius: 5,
            borderWidth: !serviceDD ? 0 : 1,
            borderTopWidth: !serviceDD ? 0 : 1,
            borderColor: Colors.gray,
            top: -14,
            // backgroundColor:'red'
          }}>
          <ScrollView style={{maxHeight: 100}} nestedScrollEnabled={true}>
            {serviceDD == true &&
              Array.from(
                new Set(
                  categoryData &&
                    categoryData.map((item: any) => item.complain_name),
                ),
              ).map((e: any, i: number) => {
                return (
                  <TouchableOpacity
                    onPress={() =>
                      SelectedServices(
                        categoryData.find(
                          (item: any) => item.complain_name === e,
                        ),
                      )
                    }
                    key={i}
                    style={{
                      flexDirection: 'row',
                      paddingHorizontal: 10,
                      marginVertical: 5,
                      gap: 10,
                      // backgroundColor:'red'
                    }}>
                    <Text
                      style={{
                        color: Colors.gray,
                        fontFamily: 'Poppins-SemiBold',
                        fontSize: 16,
                      }}>
                      {e}
                    </Text>
                  </TouchableOpacity>
                );
              })}
          </ScrollView>
        </View>
      )}
      <View style={{}}>
        {subject && (
          <View
            style={{
              borderBottomEndRadius: 5,
              borderBottomStartRadius: 5,
              // borderWidth: !serviceDD ? 0 : 1,
              // borderTopWidth: !serviceDD ? 0 : 1,
              zIndex: 100,
              // borderColor: Colors.gray,
              top: -10,
              // backgroundColor:'red'
            }}>
            <ScrollView style={{maxHeight: 150}} nestedScrollEnabled={true}>
              {serviceDD == true && (
                // <View style={{backgroundColor:Colors.white}} >
                <View
                  style={{
                    backgroundColor: Colors.white,
                    borderBottomEndRadius: 5,
                    borderBottomStartRadius: 5,
                    // borderWidth: !serviceDD ? 0 : 1,
                    borderTopWidth: !serviceDD ? 0 : 1,
                    zIndex: 100,
                    borderColor: Colors.gray,
                    // top: -10,
                  }}>
                  {search && (
                    <TextInput
                      onChangeText={e => filterSearchData(e)}
                      style={{
                        paddingHorizontal: 10,
                        marginVertical: 0,
                        color: Colors.white,
                        // backgroundColor: "white",
                        // borderBottomWidth: 1,
                        gap: 0,
                        height: 38,
                        // backgroundColor:'red'
                      }}
                      placeholder={'SEARCH'}
                      placeholderTextColor={'black'}
                    />
                  )}
                  {searchData && searchData.length > 0
                    ? Array.from(
                        new Set(
                          searchData &&
                            searchData.map((item: any) => item.subject),
                        ),
                      ).map((e: any, i: number) => {
                        return (
                          <TouchableOpacity
                            onPress={() =>
                              SelectedServices(
                                subject.find(
                                  (item: any) => `${item.subject}` === e,
                                ),
                              )
                            }
                            key={i}
                            style={{
                              flexDirection: 'row',
                              paddingHorizontal: 20,
                              marginVertical: 5,
                              gap: 10,
                              // backgroundColor:'red'
                            }}>
                            <Text
                              style={{
                                color: Colors.gray,
                                fontWeight: '400',
                                fontSize: 14,
                              }}>
                              {e ?? selectedSubject}
                            </Text>
                          </TouchableOpacity>
                        );
                      })
                    : Array.from(
                        new Set(
                          subject && subject.map((item: any) => item.subject),
                        ),
                      ).map((e: any, i: number) => {
                        return (
                          <TouchableOpacity
                            onPress={() =>
                              SelectedServices(
                                subject.find(
                                  (item: any) => `${item.subject}` === e,
                                ),
                              )
                            }
                            key={i}
                            style={{
                              flexDirection: 'row',
                              paddingHorizontal: 10,
                              marginVertical: 5,
                              gap: 10,
                              // backgroundColor:'red'
                            }}>
                            <Text
                              style={{
                                color: Colors.gray,
                                fontWeight: '500',
                                fontSize: 14,
                              }}>
                              {e ?? selectedSubject}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                </View>
              )}
            </ScrollView>
          </View>
        )}
      </View>
    </View>
  );
};

export default CustomDropDown;

const styles = StyleSheet.create({});
