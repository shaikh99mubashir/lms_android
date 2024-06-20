// import React, {useState, useRef, useEffect} from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   Platform,
//   PermissionsAndroid,
//   Modal,
//   StyleSheet,
// } from 'react-native';
// import Video from 'react-native-video';
// import Slider from '@react-native-community/slider';
// import Orientation from 'react-native-orientation-locker';
// import RightArrowSvg from '../../Svgs/RightArrowSvg';
// import LeftArrowSvg from '../../Svgs/LeftArrowSvg';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import Entypo from 'react-native-vector-icons/Entypo';
// import {Color} from '../../Constant';

// const RNVideo = ({videoUrl, navigation}: any) => {
//   const [clicked, setClicked] = useState(false);
//   const [paused, setPaused] = useState(false);
//   const [progress, setProgress] = useState<any>(null);
//   const [fullScreen, setFullScreen] = useState(false);
//   const [playbackRate, setPlaybackRate] = useState(1.0);
//   const ref = useRef<any>(null);
//   const [videoEnded, setVideoEnded] = useState(false);
//   const [modalVisible, setModalVisible] = useState(false);
//   useEffect(() => {
//     return () => {
//       Orientation.lockToPortrait();
//     };
//   }, []);

//   const format = (seconds: any) => {
//     let mins = Math.floor(seconds / 60)
//       .toString()
//       .padStart(2, '0');
//     let secs = Math.floor(seconds % 60)
//       .toString()
//       .padStart(2, '0');
//     return `${mins}:${secs}`;
//   };

//   const handleReplay = () => {
//     ref.current.seek(0);
//     setPaused(false);
//     setVideoEnded(false);
//   };

//   return (
//     <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'}}>
//       <TouchableOpacity
//         style={{width: '100%', height: fullScreen ? '100%' : '100%'}}
//         onPress={() => setClicked(true)}>
//         <Video
//           paused={paused}
//           source={{uri: videoUrl}}
//           ref={ref}
//           onProgress={x => setProgress(x)}
//           muted
//           rate={playbackRate}
//           style={{width: '100%', height: fullScreen ? '100%' : '100%'}}
//           resizeMode="contain"
//           onError={e => console.error('Video Error:', e)}
//           onEnd={() => setVideoEnded(true)}
//         />
//         {clicked && (
//           <TouchableOpacity
//             style={{
//               width: '100%',
//               height: '100%',
//               position: 'absolute',
//               backgroundColor: 'rgba(0,0,0,.5)',
//               justifyContent: 'center',
//               alignItems: 'center',
//             }}
//             onPress={() => setClicked(false)}>
//             <View style={{flexDirection: 'row'}}>
//               <TouchableOpacity
//                 onPress={() => ref.current.seek(progress?.currentTime - 10)}>
//                 <Image
//                   source={require('../../Images/backward.png')}
//                   style={{width: 30, height: 30, tintColor: 'white'}}
//                 />
//               </TouchableOpacity>
//               <TouchableOpacity onPress={() => setPaused(!paused)}>
//                 <Image
//                   source={
//                     paused
//                       ? require('../../Images/play-button.png')
//                       : require('../../Images/pause.png')
//                   }
//                   style={{
//                     width: 30,
//                     height: 30,
//                     tintColor: 'white',
//                     marginLeft: 50,
//                   }}
//                 />
//               </TouchableOpacity>
//               <TouchableOpacity
//                 onPress={() => ref.current.seek(progress?.currentTime + 10)}>
//                 <Image
//                   source={require('../../Images/forward.png')}
//                   style={{
//                     width: 30,
//                     height: 30,
//                     tintColor: 'white',
//                     marginLeft: 50,
//                   }}
//                 />
//               </TouchableOpacity>
//             </View>
//             <View
//               style={{
//                 width: '100%',
//                 flexDirection: 'row',
//                 justifyContent: 'space-between',
//                 position: 'absolute',
//                 bottom: 5,
//                 paddingLeft: 20,
//                 paddingRight: 20,
//                 alignItems: 'center',
//               }}>
//               <View
//                 style={{
//                   width: '90%',
//                   flexDirection: 'row',
//                   justifyContent: 'space-between',
//                   paddingLeft: 20,
//                   paddingRight: 20,
//                   alignItems: 'center',
//                 }}>
//                 {videoEnded ? (
//                   <TouchableOpacity activeOpacity={0.8} onPress={handleReplay}>
//                     <MaterialCommunityIcons
//                       name="replay"
//                       size={22}
//                       color={'white'}
//                     />
//                   </TouchableOpacity>
//                 ) : (
//                   <Text style={{color: 'white'}}>
//                     {format(progress?.currentTime)}
//                   </Text>
//                 )}
//                 <Slider
//                   style={{width: '80%', height: 40}}
//                   minimumValue={0}
//                   maximumValue={progress?.seekableDuration}
//                   minimumTrackTintColor="#FFFFFF"
//                   maximumTrackTintColor="#fff"
//                   onValueChange={x => ref.current.seek(x)}
//                 />
//                 <Text style={{color: 'white'}}>
//                   {format(progress?.seekableDuration)}
//                 </Text>
//               </View>

//               <TouchableOpacity
//                 onPress={() => {
//                   if (fullScreen) {
//                     Orientation.lockToLandscape();
//                   } else {
//                     Orientation.lockToPortrait();
//                   }
//                   setFullScreen(!fullScreen);
//                 }}>
//                 <Image
//                   source={
//                     fullScreen
//                       ? require('../../Images/minimize.png')
//                       : require('../../Images/full-size.png')
//                   }
//                   style={{width: 20, height: 20, tintColor: 'white'}}
//                 />
//               </TouchableOpacity>
//             </View>
//             <View
//               style={{
//                 width: '100%',
//                 flexDirection: 'row',
//                 justifyContent: 'space-between',
//                 position: 'absolute',
//                 top: 20,
//                 paddingLeft: 20,
//                 paddingRight: 20,
//                 alignItems: 'center',
//               }}>
//               <TouchableOpacity
//                 activeOpacity={0.8}
//                 onPress={() => navigation.goBack()}>
//                 <LeftArrowSvg color={'white'} />
//               </TouchableOpacity>
//               <TouchableOpacity
//                 activeOpacity={0.8}
//                 onPress={() => setModalVisible(true)}>
//                 <Ionicons name="settings-sharp" size={22} color={Color.white} />
//               </TouchableOpacity>
//             </View>
//             <View
//               style={{
//                 width: '100%',
//                 flexDirection: 'row',
//                 justifyContent: 'center',
//                 position: 'absolute',
//                 bottom: 50,
//                 alignItems: 'center',
//               }}>
//               {[1.0, 1.5, 2.0, 2.5].map(rate => (
//                 <TouchableOpacity
//                   key={rate}
//                   onPress={() => setPlaybackRate(rate)}>
//                   <Text
//                     style={{
//                       color: 'white',
//                       margin: 10,
//                       fontWeight: playbackRate === rate ? 'bold' : 'normal',
//                     }}>
//                     {rate}x
//                   </Text>
//                 </TouchableOpacity>
//               ))}
//             </View>
//           </TouchableOpacity>
//         )}
//       </TouchableOpacity>

//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => setModalVisible(false)}>
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <View
//               style={{flexDirection: 'row', justifyContent: 'space-between'}}>
//               <Text style={styles.modalTitle}>Settings</Text>
//               <TouchableOpacity onPress={() => setModalVisible(false)}>
//                 <Entypo name="cross" color={Color.white} size={25} />
//               </TouchableOpacity>
//             </View>
//             <View style={{margin: 10}} />
//             <View
//               style={{
//                 flexDirection: 'row',
//                 justifyContent: 'space-between',
//                 borderBottomWidth: 0.6,
//                 borderBottomColor: 'gray',
//               }}>
//               <TouchableOpacity
//               onPress={() => setModalVisible(false)}
//                 activeOpacity={0.8}
//                 style={{flexDirection: 'row', gap: 10}}>
//                 <MaterialCommunityIcons
//                   name="motion-play"
//                   size={22}
//                   color={Color.white}
//                 />
//                 <Text style={styles.modalTitle}>Playback speed</Text>
//               </TouchableOpacity>
//               <RightArrowSvg color={'white'} />
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },
//   modalContent: {
//     width: 350,
//     backgroundColor: 'rgb(49, 49, 48)',
//     borderRadius: 10,
//     padding: 20,
//     // alignItems: 'center',
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     fontFamily: 'Circular Std Medium',
//     marginBottom: 20,
//     color: Color.white,
//   },
//   modalOption: {
//     padding: 10,
//     marginVertical: 5,
//     width: '100%',
//     alignItems: 'center',
//   },
//   modalCloseButton: {
//     marginTop: 20,
//     backgroundColor: 'red',
//     padding: 10,
//     borderRadius: 5,
//   },
//   textType3: {
//     color: Color.Dune,
//     fontSize: 16,
//     fontFamily: 'Circular Std Medium',
//   },
//   textType1: {
//     fontSize: 22,
//     color: Color.Black,
//     fontFamily: 'Circular Std Medium',
//   },
// });

// export default RNVideo;
import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  StyleSheet,
} from 'react-native';
import Video from 'react-native-video';
import Slider from '@react-native-community/slider';
import Orientation from 'react-native-orientation-locker';
import RightArrowSvg from '../../Svgs/RightArrowSvg';
import LeftArrowSvg from '../../Svgs/LeftArrowSvg';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {Color} from '../../Constant';
import RadioButton2 from '../RadioButton2';
import PlaybackSpeedModal from './PlaybackSpeedModal';

const RNVideo = ({videoUrl, navigation}: any) => {
  const [clicked, setClicked] = useState(false);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState<any>(null);
  const [fullScreen, setFullScreen] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const ref = useRef<any>(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);
  const [playbackModalVisible, setPlaybackModalVisible] = useState(false);
  // console.log("fullScreen",fullScreen);
  
  useEffect(() => {
    return () => {
      Orientation.lockToPortrait();
    };
  }, []);

  const format = (seconds: any) => {
    let mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    let secs = Math.floor(seconds % 60)
      .toString()
      .padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const handleReplay = () => {
    ref.current.seek(0);
    setPaused(false);
    setVideoEnded(false);
  };

  const playbackSpeed = [0.25,0.5,0.75,1,1.25,1.5,1.75, 2,];
  const handlePlaybackSpeed = (rate:any) => {
    console.log('rate',rate);
    
    // setPlaybackRate(rate);
    // setPlaybackModalVisible(false);
  }
  return (
    <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'}}>
      <TouchableOpacity
        style={{width: '100%', height: fullScreen ? '100%' : '100%'}}
        onPress={() => setClicked(true)}>
        <Video
          paused={paused}
          source={{uri: videoUrl}}
          ref={ref}
          onProgress={x => setProgress(x)}
          muted
          rate={playbackRate}
          style={{width: '100%', height: fullScreen ? '100%' : '100%'}}
          resizeMode="contain"
          onError={e => console.error('Video Error:', e)}
          onEnd={() => setVideoEnded(true)}
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
            onPress={() => setClicked(false)}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => ref.current.seek(progress?.currentTime - 10)}>
                <Image
                  source={require('../../Images/backward.png')}
                  style={{width: 30, height: 30, tintColor: 'white'}}
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
              <TouchableOpacity
                onPress={() => ref.current.seek(progress?.currentTime + 10)}>
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
                bottom: 5,
                paddingLeft: 20,
                paddingRight: 20,
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: '90%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingLeft: 20,
                  paddingRight: 20,
                  alignItems: 'center',
                }}>
                {videoEnded ? (
                  <TouchableOpacity activeOpacity={0.8} onPress={handleReplay}>
                    <MaterialCommunityIcons
                      name="replay"
                      size={22}
                      color={'white'}
                    />
                  </TouchableOpacity>
                ) : (
                  <Text style={{color: 'white'}}>
                    {format(progress?.currentTime)}
                  </Text>
                )}
                <Slider
                  style={{width: fullScreen ?'100%' : '80%', height: 40}}
                  minimumValue={0}
                  maximumValue={progress?.seekableDuration}
                  minimumTrackTintColor="#FFFFFF"
                  maximumTrackTintColor="#fff"
                  onValueChange={x => ref.current.seek(x)}
                />
                <Text style={{color: 'white'}}>
                  {format(progress?.seekableDuration)}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => {
                  if (fullScreen) {
                    Orientation.lockToLandscape();
                  } else {
                    Orientation.lockToPortrait();
                  }
                  setFullScreen(!fullScreen);
                }}>
                <Image
                  source={
                    fullScreen
                      ? require('../../Images/minimize.png')
                      : require('../../Images/full-size.png')
                  }
                  style={{width: 20, height: 20, tintColor: 'white'}}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                position: 'absolute',
                top: 20,
                paddingLeft: 20,
                paddingRight: 20,
                alignItems: 'center',
              }}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.goBack()}>
                <LeftArrowSvg color={'white'} />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setSettingsModalVisible(true)}>
                <Ionicons name="settings-sharp" size={22} color={Color.white} />
              </TouchableOpacity>
            </View>
            {/* <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'center',
                position: 'absolute',
                bottom: 50,
                alignItems: 'center',
              }}>
              {[1.0, 1.5, 2.0, 2.5].map(rate => (
                <TouchableOpacity
                  key={rate}
                  onPress={() => setPlaybackRate(rate)}>
                  <Text
                    style={{
                      color: 'white',
                      margin: 10,
                      fontWeight: playbackRate === rate ? 'bold' : 'normal',
                    }}>
                    {rate}x
                  </Text>
                </TouchableOpacity>
              ))}
            </View> */}
          </TouchableOpacity>
        )}
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={settingsModalVisible}
        onRequestClose={() => setSettingsModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.modalTitle}>Settings</Text>
              <TouchableOpacity onPress={() => setSettingsModalVisible(false)}>
                <Entypo name="cross" color={Color.white} size={25} />
              </TouchableOpacity>
            </View>
            <View style={{margin: 10}} />
            <TouchableOpacity
            onPress={() => {
              setSettingsModalVisible(false);
              setPlaybackModalVisible(true);
            }}
            activeOpacity={0.8}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottomWidth: 0.6,
                borderBottomColor: 'gray',
              }}>
              <View
                
                style={{flexDirection: 'row', gap: 10}}>
                <MaterialCommunityIcons
                  name="motion-play"
                  size={22}
                  color={Color.white}
                />
                <Text style={styles.modalTitle}>Playback speed</Text>
              </View>
              <RightArrowSvg color={'white'} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <PlaybackSpeedModal
        playbackSpeed={playbackSpeed}
        playbackRate={playbackRate}
        setPlaybackRate={setPlaybackRate}
        playbackModalVisible={playbackModalVisible}
        setPlaybackModalVisible={setPlaybackModalVisible}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 350,
    backgroundColor: 'rgb(49, 49, 48)',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Circular Std Medium',
    marginBottom: 20,
    color: Color.white,
  },
  modalOption: {
    padding: 10,
    marginVertical: 5,
    width: '100%',
    // alignItems: 'center',
    
  },
  modalCloseButton: {
    marginTop: 20,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  textType3: {
    color: Color.Dune,
    fontSize: 16,
    fontFamily: 'Circular Std Medium',
  },
  textType1: {
    fontSize: 22,
    color: Color.Black,
    fontFamily: 'Circular Std Medium',
  },
});

export default RNVideo;

