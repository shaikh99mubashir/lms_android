import {Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
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

const LiveSessionsList = ({navigation}: any) => {
  const [getLiveSession, setLiveSession] = useState([]);
  const [groupedSessions, setGroupedSessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mSDate, setMSDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [mode, setMode] = useState('date');

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

    setGroupedSessions(groupedArray);
  };

  useEffect(() => {
    getLiveSessionData();
  }, []);

  return (
    <View
      style={{
        backgroundColor: Color.GhostWhite,
        height: '100%',
      }}>
    <ScrollView>
        <View style={{paddingHorizontal: 25,}}>

        
      <Header title={'Schedule Session'} goBack navigation={navigation} />
      <View
        style={{
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
          marginBottom: 20,
        }}></View>

      <FlatList
        data={groupedSessions}
        renderItem={({item}: any) => {
            console.log('itemssss',item);
          return (
            <View>
              <Text style={[styles.textType1,{color:Color.IronsideGrey, fontSize:20, marginBottom:10}]}>{item?.date}</Text>
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
                  <Text style={[styles.textType3, {color: Color.IronsideGrey}]}>
                    {session.description}
                  </Text>
                </View>
              ))}
            </View>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
        </View>
    </ScrollView>
    <View style={{margin:10}}/>
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
});
