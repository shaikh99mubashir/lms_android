import {Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BaseUrl} from '../../Constant/BaseUrl';
import {FlatList} from 'react-native';
import Header from '../../Components/Header';
import {Color} from '../../Constant';
import CustomLoader from '../../Components/CustomLoader';

const LiveSessions = ({navigation}: any) => {
  const [getLiveSession, setLiveSession] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  console.log('getLiveSession', getLiveSession);
  // console.log('getLiveSession===>', getLiveSession.videos);

  const getLiveSessionData = async () => {
    setLoading(true);
    try {
      const jsonValue = await AsyncStorage.getItem('studentAuth');
      if (jsonValue !== null) {
        const data = JSON.parse(jsonValue);
        console.log('Retrieved data:', data.token);
        axios
          .get(`${BaseUrl}live-sessions`, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${data.token}`,
            },
          })
          .then(response => {
            console.log('response', response.data);
            let LiveSessions = response.data.live_sessions;
            setLiveSession(LiveSessions);
            setLoading(false);
          })
          .catch(error => {
            console.log('error', error);
            setLoading(false);
          });
      } else {
        console.log('No data found in AsyncStorage for key studentAuth');
        navigation.replace('Login');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error retrieving data from AsyncStorage:', error);
      setLoading(false);
      return null;
    }
  };

  useEffect(() => {
    getLiveSessionData();
  }, []);
  // const getLiveSession = [
  //   {
  //     id: 1,
  //     title: 'Session 1',
  //     description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
  //     scheduled_at: '2024-05-20T10:00:00',
  //     completed_at: '2024-05-20T11:30:00',
  //     videos: [
  //       {id: 3, video_url: 'https://example.com/video3'},
  //     ],
  //   },
  //   {
  //     id: 2,
  //     title: 'Session 2',
  //     description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
  //     scheduled_at: '2024-05-21T10:00:00',
  //     completed_at: '2024-05-21T11:30:00',
  //     videos: [
  //       {id: 5, video_url: 'https://example.com/video5'},
  //     ],
  //   },
  //   {
  //     id: 3,
  //     title: 'Session 3',
  //     description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
  //     scheduled_at: '2024-05-22T10:00:00',
  //     completed_at: null,
  //     videos: [{id: 6, video_url: 'https://example.com/video6'}],
  //   },
  // ];

  return (
    <View
      style={{
        backgroundColor: Color.GhostWhite,
        height: '100%',
        paddingHorizontal: 25,
      }}>
      <Header title={'Live Session'} goBack navigation={navigation} />
      <FlatList
        data={getLiveSession}
        renderItem={({item}: any) => {
          return (
            <View style={{marginBottom: 20,backgroundColor:Color.white,padding:20,borderRadius:10}}>
              <Text style={styles.textType1}>{item.title}</Text>
              <View style={{margin:5}}/>
              <Text style={[styles.textType3,{color:Color.IronsideGrey}]}>{item.description}</Text>
              <View style={{margin:5}}/>
              <Text style={[styles.textType3,{color:Color.IronsideGrey}]}>Scheduled at: 25 May 2024</Text>
              <FlatList
                data={item.videos}
                renderItem={({item: video}) => (
                  <TouchableOpacity
                    onPress={() => Linking.openURL(video.video_url)}
                    style={{
                      marginTop: 5,
                      borderRadius: 5,
                    }}>
                    <Text style={[styles.textType3,{color:Color.BrightBlue}]}>Video {video.video_url}</Text>
                    {/* <Text>Video {video.video_url}</Text> */}
                  </TouchableOpacity>
                )}
                keyExtractor={video => video.id.toString()}
              />
            </View>
          );
        }}
        keyExtractor={item => item.id.toString()}
      />
      <CustomLoader visible={loading} />
    </View>
  );
};

export default LiveSessions;

const styles = StyleSheet.create({
  textType3: {
    color: Color.Dune,
    fontWeight: '500',
    fontSize: 16,
    fontFamily: 'Circular Std Medium',
    fontStyle: 'normal',
  },
  textType1: {
    fontWeight: '500',
    fontSize: 26,
    color: Color.Black,
    fontFamily: 'Circular Std Medium',
    lineHeight: 24,
    fontStyle: 'normal',
  },
});
