import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Platform, PermissionsAndroid } from 'react-native';
import Video from 'react-native-video';
import Slider from '@react-native-community/slider';
import Orientation from 'react-native-orientation-locker';

const RNVideo = ({ videoUrl }:any) => {
  const [clicked, setClicked] = useState(false);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState<any>(null);
  const [fullScreen, setFullScreen] = useState(true);
  const ref = useRef<any>(null);

  useEffect(() => {
    // Lock to landscape when the component mounts
    Orientation.lockToLandscape();

    // Cleanup: lock to portrait when the component unmounts
    return () => {
      Orientation.lockToPortrait();
    };
  }, []);

  const format = (seconds:any) => {
    let mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    let secs = Math.floor(seconds % 60).toString().padStart(2, '0');
    // let mins = parseInt(seconds / 60).toString().padStart(2, '0');
    // let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  console.log('fullScreen====>',fullScreen);
  
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        style={{ width: '100%', height: fullScreen ? '100%' : '100%' }}
        onPress={() => setClicked(true)}
      >
        <Video
          paused={paused}
          source={{ uri: videoUrl }}
          ref={ref}
          onProgress={(x) => setProgress(x)}
          muted
          style={{ width: '100%', height: fullScreen ? '100%' : '100%' }}
          resizeMode="contain"
          onError={(e) => console.error('Video Error:', e)}
        />
        {clicked && (
          <TouchableOpacity
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              backgroundColor: 'rgba(0,0,0,.5)',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => setClicked(false)}
          >
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => ref.current.seek(progress?.currentTime - 10)}>
                <Image
                  source={require('../../Images/backward.png')}
                  style={{ width: 30, height: 30, tintColor: 'white' }}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setPaused(!paused)}>
                <Image
                  source={
                    paused
                      ? require('../../Images/play-button.png')
                      : require('../../Images/pause.png')
                  }
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: 'white',
                    marginLeft: 50,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => ref.current.seek(progress?.currentTime + 10)}>
                <Image
                  source={require('../../Images/forward.png')}
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: 'white',
                    marginLeft: 50,
                  }}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                position: 'absolute',
                bottom: 0,
                paddingLeft: 20,
                paddingRight: 20,
                alignItems: 'center',
              }}
            >
              <Text style={{ color: 'white' }}>{format(progress?.currentTime)}</Text>
              <Slider
                style={{ width: '70%', height: 40 }}
                minimumValue={0}
                maximumValue={progress?.seekableDuration}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#fff"
                onValueChange={(x) => ref.current.seek(x)}
              />
              <Text style={{ color: 'white' }}>{format(progress?.seekableDuration)}</Text>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                position: 'absolute',
                top: 10,
                paddingLeft: 20,
                paddingRight: 20,
                alignItems: 'center',
              }}
            >
              <TouchableOpacity onPress={() => {
                if (fullScreen) {
                  console.log("full screen if",fullScreen);
                  Orientation.lockToLandscape();
                  
                } else {
                  console.log("full screen else",fullScreen);
                  Orientation.lockToPortrait();
                }
                setFullScreen(!fullScreen);
              }}>
                <Image
                  source={fullScreen ? require('../../Images/minimize.png') : require('../../Images/full-size.png')}
                  style={{ width: 24, height: 24, tintColor: 'white' }}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default RNVideo;