import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import firestore from '@react-native-firebase/firestore'; // Import firestore

import { Color } from "../../Constant";
import Message from "../Message";

const MessagesList = ({ onSwipeToReply, data }: any) => { // Pass data as props
	console.log('data=====>',data);
	
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('chats')
      .doc(data.myid + data.data.userId)
      .collection('messages')
      .orderBy('createdAt', 'asc')
      .onSnapshot(querySnapshot => {
        const allMessages :any = querySnapshot.docs.map(doc => {
          return {...doc.data(), createdAt: Date.parse(new Date().toString())}; // Convert createdAt to Date object
        });
        setMessages(allMessages);
      });

    // Return the cleanup function to unsubscribe from the snapshot listener
    return () => subscriber(); // Call the unsubscribe function
  }, [data]); // Add data as a dependency

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: Color.GhostWhite, flex: 1 }}
    >
      {messages.map((message, index) => {
		console.log('message',message)
		return(
			<Message
			key={index}
			time={message.createdAt}
			isLeft={message.userId !== data.myid} // Assuming myid is the current user's ID
			message={message.text}
			onSwipe={onSwipeToReply}
			/>
		)
	})}
    </ScrollView>
  );
};

export default MessagesList;


// import React, { useState, useRef } from "react";
// import { ScrollView } from "react-native";


// import { Color } from "../../Constant";
// import Message from "../Message";

// const MessagesList = ({ onSwipeToReply }:any) => {
// 	const [messages, setMessages] = useState([
// 		{
// 			user: 0,
// 			time: "Today | 12:42PM",
// 			content: "Hey",
// 		},
// 		{
// 			user: 1,
// 			time: "Today | 12:43PM",
// 			content: "What's up",
// 		},
// 		{
// 			user: 1,
// 			time: "Today | 12:44PM",
// 			content: "How is it going?",
// 		},
// 		{
// 			user: 0,
// 			time: "Today | 12:42PM",
// 			content: "things are going great",
// 		},
// 		{
// 			user: 0,
// 			time: "Today | 12:42PM",
// 			content: "Good :)",
// 		},
// 		{
// 			user: 1,
// 			time: "Today | 12:42PM",
// 			content: "Should we hang out tomorrow? I was thinking of going somewhere which has drinks",
// 		},
// 		{
// 			user: 0,
// 			time: "Today | 12:42PM",
// 			content: "Sure",
// 		},
// 		{
// 			user: 1,
// 			time: "Today | 12:42PM",
// 			content: "Great",
// 		},
// 		{
// 			user: 0,
// 			time: "Today | 12:42PM",
// 			content: "7 o'clock?",
// 		},
// 		{
// 			user: 1,
// 			time: "Today | 12:42PM",
// 			content: "Sounds good",
// 		},
// 	]);

	

// 	const user = useRef(0);
// 	const scrollView :any= useRef();

// 	return (
// 		<ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor:Color.GhostWhite, flex: 1 }}
// 			ref={ref => scrollView.current = ref}
// 			onContentSizeChange={() => {
// 				scrollView.current.scrollToEnd({ animated: true })
// 			}}
// 		> 
		
// 			{messages.map((message, index) => (
// 				<Message
// 					key={index}
// 					time={message.time}
// 					isLeft={message.user !== user.current}
// 					message={message.content}
// 					onSwipe={onSwipeToReply}
// 				/>
// 			))}
// 		</ScrollView>
// 	);
// };

// export default MessagesList;