import {Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BaseUrl} from '../../Constant/BaseUrl';
import {FlatList} from 'react-native';

const LiveSessions = ({navigation}: any) => {
  const [getLiveSession, setLiveSession] = useState<any>([]);
  console.log('getLiveSession', getLiveSession);
  console.log('getLiveSession===>', getLiveSession.videos);

  const getLiveSessionData = async () => {
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
          })
          .catch(error => {
            console.log('error', error);
          });
      } else {
        console.log('No data found in AsyncStorage for key studentAuth');
        navigation.replace('Login');
      }
    } catch (error) {
      console.error('Error retrieving data from AsyncStorage:', error);
      return null;
    }
  };

  useEffect(() => {
    getLiveSessionData();
  }, []);
  return (
    <View>
      <FlatList
        data={getLiveSession}
        renderItem={({item}: any) => {
          return (
            <View style={{marginBottom: 20, padding: 20}}>
              <Text>Title: {item.title}</Text>
              <Text>Description: {item.description}</Text>
              <Text>Scheduled At: {item.scheduled_at}</Text>
              <Text>Completed At: {item.completed_at}</Text>
              <Text>Videos:</Text>
              <FlatList
                data={item.videos}
                renderItem={({item: video}) => (
                  <TouchableOpacity
                    onPress={() => Linking.openURL(video.video_url)}
                    style={{
                      backgroundColor: 'lightblue',
                      padding: 10,
                      marginTop: 5,
                      borderRadius: 5,
                    }}>
                    <Text>Video {video.id}</Text>
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
    </View>
  );
};

export default LiveSessions;

const styles = StyleSheet.create({});
