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
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Color} from '../../Constant';
const CustomDropDown = (props: any) => {
  let {
    ddTitle,
    categoryData,
    dataShow,
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
      {ddTitle && (
        <View style={styles.labelContainer}>
          <Text
            style={{
              fontFamily: 'Circular Std Medium',
              color: Color.Dune,
              fontSize: 16,
              marginVertical: 5,
              textTransform: 'capitalize',
              marginHorizontal: 5,
              zIndex:1,
              ...headingStyle,
            }}>
            {ddTitle}
          </Text>
      </View>
      )}
      <View
        style={{overflow: 'hidden', marginHorizontal: 0, marginVertical: 0}}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setServiceDD(!serviceDD)}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 10,
            paddingHorizontal: 20,
            height: 55,
            // borderWidth: serviceDD ? 1 : 0,
            borderWidth:  1,
            backgroundColor: Color.white,
            borderRadius: 30,
            borderColor: Color.liteGrey,
            alignItems: 'center',
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
                  color: Color.DustyGrey,
                  fontFamily: 'Circular Std Medium',
                  fontSize: 16,
                  textTransform: 'capitalize',
                }}>
                {selectedServicedata.complain_name &&
                selectedServicedata.complain_name > 10
                  ? selectedServicedata.complain_name.slice(0, 10)
                  : selectedServicedata.complain_name}
              </Text>
              {serviceDD ? (
                <AntDesign name="up" size={20} color={'black'} />
              ) : (
                <AntDesign name="down" size={20} color={'black'} />
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
                  color: Color.DustyGrey,
                  fontFamily: 'Circular Std Book',
                  fontSize: 18,
                  textTransform: 'capitalize',
                }}>
                {selectedSubject
                  ? selectedSubject?.subject
                  : dropdownPlace ?? ddTitle}
              </Text>
              {serviceDD ? (
                <AntDesign name="up" size={20} color={'black'} />
              ) : (
                <AntDesign name="down" size={20} color={'black'} />
              )}
            </View>
          )}
        </TouchableOpacity>
      </View>
      {/* {categoryData && (
        <View
          style={{
            borderBottomEndRadius: 5,
            borderBottomStartRadius: 5,
            // borderWidth: !serviceDD ? 0 : 1,
            borderWidth:  1,
            borderTopWidth: !serviceDD ? 0 : 1,
            borderColor: Color.liteGrey,
            top: -14,
            backgroundColor: 'red',
            width: '100%',
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
                    }}>
                    <Text
                      style={{
                        color: Color.DustyGrey,
                        fontFamily: 'Circular Std Medium',
                        fontSize: 16,
                        textTransform: 'capitalize',
                      }}>
                      {e}
                    </Text>
                  </TouchableOpacity>
                );
              })}
          </ScrollView>
        </View>
      )} */}
      {subject && (
        <View
          style={{
            borderRadius: 30,
            // borderWidth:1,
            borderWidth: serviceDD ? 1 : 0,
            borderColor: Color.liteGrey,
            marginVertical: 5,
            backgroundColor: Color.white,
            paddingVertical: !serviceDD ? 0 : 15,
            paddingHorizontal: 10,
          }}>
          <ScrollView style={{maxHeight: 150}} nestedScrollEnabled={true}>
            {serviceDD == true && (
              <View>
                {search && (
                  <TextInput
                    onChangeText={e => filterSearchData(e)}
                    style={{
                      paddingHorizontal: 10,
                      marginVertical: 0,
                      color: 'black',
                      backgroundColor: Color.white,
                      borderBottomWidth: 1,
                      borderBottomColor: Color.liteGrey,
                      gap: 0,
                      height: 38,
                      fontFamily: 'Circular Std Medium',
                      borderTopRightRadius: 10,
                      borderTopLeftRadius: 10,
                    }}
                    placeholder={'Search'}
                    placeholderTextColor={'black'}
                  />
                )}
                {searchData && searchData.length > 0
                  ? Array.from(
                      new Set(
                        searchData &&
                          searchData.map((item: any) => item?.subject),
                      ),
                    )
                      .map((e: any, i: number) => {
                        return (
                          <TouchableOpacity
                            onPress={() =>
                              SelectedServices(
                                subject.find(
                                  (item: any) => `${item?.subject}` === e,
                                ),
                              )
                            }
                            key={i}
                            style={{
                              flexDirection: 'row',
                              paddingHorizontal: 10,
                              marginVertical: 5,
                              gap: 10,
                              borderBottomWidth: 1,
                              borderBottomColor: Color.liteGrey,
                            }}>
                            <Text
                              style={{
                                fontFamily: 'Circular Std Book',
                                fontSize: 16,
                                textTransform: 'capitalize',
                              }}>
                              {e ?? selectedSubject}
                            </Text>
                          </TouchableOpacity>
                        );
                      })
                      .filter(Boolean)
                  : Array.from(
                      new Set(
                        subject && subject.map((item: any) => item?.subject),
                      ),
                    )
                      .map((e: any, i: number) => {
                        if (i < 5) {
                          return (
                            <TouchableOpacity
                              onPress={() =>
                                SelectedServices(
                                  subject.find(
                                    (item: any) => `${item?.subject}` === e,
                                  ),
                                )
                              }
                              key={i}
                              style={{
                                flexDirection: 'row',
                                marginHorizontal: 10,
                                marginVertical: 10,
                                gap: 10,
                                paddingBottom: 15,
                                borderBottomWidth: 1,
                                borderBottomColor: Color.liteGrey,
                              }}>
                              <Text
                                style={{
                                  color: Color.Dune,
                                  fontFamily: 'Circular Std Book',
                                  fontSize: 16,
                                  textTransform: 'capitalize',
                                }}>
                                {e ?? selectedSubject}
                              </Text>
                            </TouchableOpacity>
                          );
                        }
                      })
                      .filter(Boolean)}
              </View>
            )}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default CustomDropDown;

const styles = StyleSheet.create({
  labelContainer: {
    backgroundColor: 'white',
    position: 'absolute',
    top: -16,
    left: 25,
    paddingHorizontal: 10,
    zIndex: 1,
  },
});
