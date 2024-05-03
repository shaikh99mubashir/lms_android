import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import Animated, {
  useSharedValue,
  withSpring,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useKeyboard} from '@react-native-community/hooks';
import {Color} from '../../Constant';
import firestore from '@react-native-firebase/firestore'; // Import Firestore

const ChatInput = ({reply, closeReply, isLeft, username, data}: any) => {
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const height = useSharedValue(70);

  useEffect(() => {
    if (showEmojiPicker) {
      height.value = withTiming(400);
    } else {
      height.value = reply ? withSpring(130) : withSpring(70);
    }
  }, [showEmojiPicker]);

  useEffect(() => {
    if (reply) {
      height.value = showEmojiPicker ? withTiming(450) : withTiming(130);
    } else {
      height.value = showEmojiPicker ? withSpring(400) : withSpring(70);
    }
  }, [reply]);

  const heightAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
    };
  });

  const onSend = useCallback(() => {
    if (message.trim() === '') return; // Don't send empty messages
    const msg = {
      text: message,
      createdAt: new Date().getTime(), // Use current time for createdAt
      from: data.myid,
      to: data.data.userId,
    };

    firestore()
      .collection('chats')
      .doc(`${data.myid}${data.data.userId}`)
      .collection('messages')
      .add(msg)
      .then(() => {
        console.log('Message sent successfully!');
        setMessage(''); // Clear input after sending
      })
      .catch(error => {
        console.error('Error sending message: ', error);
      });
  }, [message, data.myid, data.data.userId]);

  return (
    <Animated.View style={[styles.container, heightAnimatedStyle]}>
      {/* Your existing UI code */}
      <TextInput
        multiline
        placeholder={'Type something...'}
        style={styles.input}
        value={message}
        onChangeText={text => setMessage(text)}
      />
      <TouchableOpacity style={styles.sendButton} onPress={onSend}>
        <FontAwesome name="send" size={20} color={Color.white} />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: Color.GhostWhite,
  },
  input: {
    flex: 1,
    backgroundColor: Color.white,
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    color:'black'
  },
  sendButton: {
    backgroundColor: Color.Primary,
    borderRadius: 25,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ChatInput;

// import React, {useState, useEffect, useRef, memo, useCallback} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   Platform,
//   TouchableOpacity,
// } from 'react-native';

// import Animated, {
//   useSharedValue,
//   withSpring,
//   withTiming,
//   useAnimatedStyle,
// } from 'react-native-reanimated';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import Entypo from 'react-native-vector-icons/Entypo';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// // import Icon from "@expo/vector-icons/MaterialCommunityIcons";
// // import EmojiPicker from "./emojis/EmojiPicker";

// import {useKeyboard} from '@react-native-community/hooks';

// import {Color} from '../../Constant';

// const ChatInput = ({reply, closeReply, isLeft, username, data}: any) => {

//   console.log('data',data);
  
//   const [message, setMessage] = useState('');
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const height = useSharedValue(70);

//   useEffect(() => {
//     if (showEmojiPicker) {
//       height.value = withTiming(400);
//     } else {
//       height.value = reply ? withSpring(130) : withSpring(70);
//     }
//   }, [showEmojiPicker]);

//   useEffect(() => {
//     if (reply) {
//       height.value = showEmojiPicker ? withTiming(450) : withTiming(130);
//     } else {
//       height.value = showEmojiPicker ? withSpring(400) : withSpring(70);
//     }
//   }, [reply]);

//   const heightAnimatedStyle = useAnimatedStyle(() => {
//     return {
//       height: height.value,
//     };
//   });





//   return (
//     <Animated.View style={[styles.container, heightAnimatedStyle]}>
//       <>
//         {reply ? (
//           <View style={styles.replyContainer}>
//             <TouchableOpacity onPress={closeReply} style={styles.closeReply}>
//               <Icon name="close" color="#000" size={20} />
//             </TouchableOpacity>
//             <Text style={styles.title}>
//               Response to {isLeft ? username : 'Me'}
//             </Text>
//             <Text style={styles.reply}>{reply}</Text>
//           </View>
//         ) : null}
//         <View style={styles.innerContainer}>
//           <TouchableOpacity style={[styles.emoticonButton,{}]}>
//             <Entypo name={'plus'} size={24} color={Color.Black} />
//           </TouchableOpacity>
//           <View style={styles.inputAndMicrophone}>
//             <TextInput
//               multiline
//               placeholder={'Type something...'}
//               style={styles.input}
//               value={message}
//               onChangeText={text => setMessage(text)}
//             />
//             {/* <TouchableOpacity style={styles.rightIconButtonStyle}>
//             <Icon name="paperclip" size={23} color={Color.Primary} />
//           </TouchableOpacity> */}
//             {/* <TouchableOpacity style={styles.rightIconButtonStyle}>
//             <Icon name="camera" size={23} color={Color.Primary} />
//           </TouchableOpacity> */}
//             <View style={styles.rightIconButtonStyle}>
//               <Icon
//                 name={showEmojiPicker ? 'close' : 'emoticon-outline'}
//                 size={23}
//                 color={Color.Black}
//               />
//             </View>
//           </View>
//           <TouchableOpacity style={styles.sendButton}>
//             <FontAwesome
//               // name={message ? 'send' : 'microphone'}
//               name={'send'}
//               size={20}
//               color={Color.white}
//             />
//           </TouchableOpacity>
//         </View>
//         {/* <EmojiPicker /> */}
//       </>
//     </Animated.View>
//   );
// };

// {
//   /* <TouchableOpacity Emojies
// 						style={styles.emoticonButton}
// 						onPress={() => setShowEmojiPicker((value) => !value)}
// 					>
// 						<Icon
// 							name={
// 								showEmojiPicker ? "close" : "emoticon-outline"
// 							}
// 							size={23}
// 							color={Color.Primary}
// 						/>
// 					</TouchableOpacity> */
// }

// const styles = StyleSheet.create({
//   container: {
//     justifyContent: 'center',
//     backgroundColor: Color.GhostWhite,
//   },
//   replyContainer: {
//     paddingHorizontal: 10,
//     marginHorizontal: 10,
//     justifyContent: 'center',
//     alignItems: 'flex-start',
//     backgroundColor: 'red',
//   },
//   title: {
//     marginTop: 5,
//     fontWeight: 'bold',
//   },
//   closeReply: {
//     position: 'absolute',
//     right: 10,
//     top: 5,
//   },
//   reply: {
//     marginTop: 5,
//   },
//   innerContainer: {
//     // paddingHorizontal: 10,
//     // marginHorizontal: 10,
//     // justifyContent: 'space-between',
//     alignItems: 'center',
//     flexDirection: 'row',
//     // paddingVertical: 10,
//   },
//   inputAndMicrophone: {
//     flexDirection: 'row',
//     backgroundColor: Color.white,
//     flex: 3,
//     marginRight: 10,
//     paddingVertical: Platform.OS === 'ios' ? 10 : 0,
//     borderRadius: 30,
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   input: {
//     backgroundColor: 'transparent',
//     paddingLeft: 20,
//     color: Color.Black,
//     flex: 3,
//     fontSize: 15,
//     height: 50,
//     alignSelf: 'center',
//   },
//   rightIconButtonStyle: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingRight: 15,
//     paddingLeft: 10,
//     // borderLeftWidth: 1,
//     // borderLeftColor: '#fff',
//   },
//   swipeToCancelView: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginRight: 30,
//   },
//   swipeText: {
//     color: Color.Primary,
//     fontSize: 15,
//   },
//   emoticonButton: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     // paddingLeft: 10,
//   },
//   recordingActive: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingLeft: 10,
//   },
//   recordingTime: {
//     color: Color.Primary,
//     fontSize: 20,
//     marginLeft: 5,
//   },
//   microphoneAndLock: {
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//   },
//   lockView: {
//     backgroundColor: '#eee',
//     width: 60,
//     alignItems: 'center',
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//     height: 130,
//     paddingTop: 20,
//   },
//   sendButton: {
//     backgroundColor: Color.Primary,
//     borderRadius: 50,
//     height: 50,
//     width: 50,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

// export default ChatInput;
