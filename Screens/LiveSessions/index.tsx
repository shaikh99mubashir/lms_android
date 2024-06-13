import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BaseUrl} from '../../Constant/BaseUrl';
import {FlatList} from 'react-native';
import Header from '../../Components/Header';
import {Color} from '../../Constant';
import CustomLoader from '../../Components/CustomLoader';
import Entypo from 'react-native-vector-icons/Entypo';
import DateTimePicker from '@react-native-community/datetimepicker';
import Feather from 'react-native-vector-icons/Feather';

const LiveSessionsList = ({navigation}: any) => {
  const [getLiveSession, setLiveSession] = useState([]);
  const [groupedSessions, setGroupedSessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('All'); // Added filter state
  const [filteredSessions, setFilteredSessions] = useState([]); // Added filteredSessions state

  const getLiveSessionData = async () => {
    setLoading(true);
    try {
      const jsonValue = await AsyncStorage.getItem('studentAuth');
      if (jsonValue !== null) {
        const data = JSON.parse(jsonValue);
        axios
          .get(`${BaseUrl}live-sessions`, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${data.token}`,
            },
          })
          .then(response => {
            let liveSessions = response.data.live_sessions;
            setLiveSession(liveSessions);
            groupSessionsByDate(liveSessions);
            setLoading(false);
          })
          .catch(error => {
            console.log('error', error);
            setLoading(false);
          });
      } else {
        navigation.replace('Login');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error retrieving data from AsyncStorage:', error);
      setLoading(false);
    }
  };

  const groupSessionsByDate = (sessions: any) => {
    const grouped = sessions.reduce((acc: any, session: any) => {
      const sessionDate = new Date(session.scheduled_at).toLocaleDateString(
        [],
        {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        },
      );

      if (!acc[sessionDate]) {
        acc[sessionDate] = [];
      }
      acc[sessionDate].push(session);
      return acc;
    }, {});

    const groupedArray: any = Object.keys(grouped).map(date => ({
      date,
      data: grouped[date],
    }));
    console.log('====================================', groupedArray.data);
    setGroupedSessions(groupedArray);
    setFilteredSessions(groupedArray); // Initialize filteredSessions with groupedSessions
  };

  const filterSessions = (criteria: string) => {
    let filtered = [];
    const currentDate = new Date();

    switch (criteria) {
      case 'Upcoming':
        filtered = groupedSessions.filter((group: any) =>
          group.data.some(
            (session: any) => new Date(session.scheduled_at) > currentDate,
          ),
        );
        break;
      case 'Scheduled':
        filtered = groupedSessions.filter((group: any) =>
          group.data.some(
            (session: any) => new Date(session.scheduled_at) > currentDate,
          ),
        );
        break;
      case 'Completed':
        filtered = groupedSessions.filter((group: any) =>
          group.data.some(
            (session: any) => new Date(session.completed_at) > currentDate,
          ),
        );
        break;
      default:
        filtered = groupedSessions;
        break;
    }

    setFilteredSessions(filtered);
  };

  useEffect(() => {
    getLiveSessionData();
  }, []);

  useEffect(() => {
    filterSessions(filter);
  }, [filter, groupedSessions]);

  const DropDownValues = [
    {
      ddValue: 'All',
    },
    {
      ddValue: 'Upcoming',
    },
    {
      ddValue: 'Scheduled',
    },
    {
      ddValue: 'Completed',
    },
  ];
  const [ddOpen, setDDOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(
    DropDownValues[0]?.ddValue || '',
  );
  const closeDropdown = () => {
    if (ddOpen) {
      setDDOpen(false);
    }
  };
  console.log('Filter', filter);
  const selectedValues = (e: any) => {
    setDDOpen(false);
    setSelectedValue(e.ddValue);
    setFilter(e.ddValue);
  };
  return (
    <View
      style={{
        backgroundColor: Color.GhostWhite,
        height: '100%',
      }}>
      <ScrollView>
        <View style={{paddingHorizontal: 25}}>
          <Header title={'Live Session'} goBack navigation={navigation} />
          <View
            style={[
              {flex: 1,},
            ]}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}>
              <View style={{flexDirection: 'row', gap: 10}}>
                <Text
                  style={[
                    styles.textType3,
                    {
                      color: Color.IronsideGrey,
                      fontFamily: 'Circular Std Book',
                      fontSize: 14,
                      position: 'relative',
                      top: 6,
                    },
                  ]}>
                  Sort By
                </Text>
                <View>
                  <TouchableOpacity
                    onPress={() => setDDOpen(!ddOpen)}
                    activeOpacity={0.8}
                    style={{
                      backgroundColor: Color.white,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingVertical: 5,
                      alignItems: 'center',
                      borderRadius: 6,
                      paddingHorizontal: 8,
                      borderWidth: 1,
                      borderColor: Color.lineColor,
                      width: 135,
                    }}>
                    <Text style={[styles.textType3, {fontSize: 14}]}>
                      {selectedValue}
                    </Text>
                    {ddOpen ? (
                      <Feather name="chevron-up" size={20} color={Color.Dune} />
                    ) : (
                      <Feather
                        name="chevron-down"
                        size={20}
                        color={Color.Dune}
                      />
                    )}
                  </TouchableOpacity>
                  {ddOpen ? (
                    <View
                      style={{
                        backgroundColor: Color.white,
                        borderRadius: 6,
                        paddingHorizontal: 20,
                        paddingTop: 15,
                        marginTop: 3,
                        zIndex: 999,
                        position: 'absolute',
                        top: 32,
                        width: 135,
                        elevation: 2,
                      }}>
                      {DropDownValues &&
                        DropDownValues.map((e: any, i: number) => {
                          return (
                            <TouchableOpacity
                              key={i}
                              onPress={() => selectedValues(e)}>
                              <Text
                                style={[
                                  styles.textType3,
                                  {fontSize: 14, paddingBottom: 16},
                                ]}>
                                {e.ddValue ? e.ddValue : e.ddValue[0]}
                              </Text>
                            </TouchableOpacity>
                          );
                        })}
                    </View>
                  ) : null}
                </View>
              </View>
            </View>
          </View>
          {/* <View
            style={{
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
              marginBottom: 20,
            }}>
            <View style={styles.filterContainer}>
              {['All', 'Upcoming', 'Scheduled', 'Completed'].map(option => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.filterButton,
                    filter === option && styles.filterButtonActive,
                  ]}
                  onPress={() => setFilter(option)}>
                  <Text
                    style={[
                      styles.filterButtonText,
                      filter === option && styles.filterButtonTextActive,
                    ]}>
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View> */}
          <View style={{margin: 10}} />
          {filteredSessions.length > 0 ? (
          <FlatList
            data={filteredSessions}
            renderItem={({item}: any) => {
              return (
                <View>
                  <Text
                    style={[
                      styles.textType1,
                      {
                        color: Color.IronsideGrey,
                        fontSize: 20,
                        marginBottom: 10,
                      },
                    ]}>
                    {item?.date}
                  </Text>
                  {item?.data.map((session: any) => (
                    <View
                      key={session.id}
                      style={{
                        marginBottom: 15,
                        backgroundColor: Color.white,
                        padding: 20,
                        borderRadius: 10,
                      }}>
                      <Text style={styles.textType1}>{session.title}</Text>
                      <View style={{margin: 5}} />
                      <Text
                        style={[styles.textType3, {color: Color.IronsideGrey}]}>
                        {session.description}
                      </Text>
                    </View>
                  ))}
                </View>
              );
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={require('../../Images/nodatafound.png')}
              resizeMode="cover"
              style={{width: 350, height: 350}}
            />
          </View>
        )}
        </View>
      </ScrollView>
      <View style={{margin: 10}} />
      <CustomLoader visible={loading} />
    </View>
  );
};

export default LiveSessionsList;

const styles = StyleSheet.create({
  textType3: {
    color: Color.Dune,
    fontSize: 15,
    fontFamily: 'Circular Std Medium',
  },
  textType1: {
    fontSize: 21,
    color: Color.Black,
    fontFamily: 'Circular Std Medium',
  },
  dateHeader: {
    fontSize: 18,
    color: Color.Dune,
    fontFamily: 'Circular Std Medium',
    marginVertical: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  filterButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: Color.IronsideGrey,
  },
  filterButtonActive: {
    backgroundColor: Color.Primary,
  },
  filterButtonText: {
    fontSize: 16,
    color: Color.Black,
  },
  filterButtonTextActive: {
    color: Color.white,
  },
});
