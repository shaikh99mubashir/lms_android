import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BaseUrl} from '../../Constant/BaseUrl';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FlatList} from 'react-native';
import {Color} from '../../Constant';
import CustomButton from '../../Components/CustomButton';
import RadioButton2 from '../../Components/RadioButton2';
import Header from '../../Components/Header';
import CustomButton3 from '../../Components/CustomButton3';
import Octicons from 'react-native-vector-icons/Octicons';
const Quizes = ({navigation, route}: any) => {
  let courseId = route.params;
  // console.log('quizzes', courseId);

  // const [quiz, setQuiz] = useState([]);
  // console.log('quiz', quiz);

  const getQuizData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('studentAuth');
      if (jsonValue !== null) {
        const data = JSON.parse(jsonValue);
        console.log('Retrieved data:', data.token);
        axios
          .get(`${BaseUrl}quizzes/course/${courseId}`, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${data.token}`,
            },
          })
          .then((response: any) => {
            console.log('response', response.data);
            let coursesDetail = response.data;
            // setQuiz(coursesDetail);
          })
          .catch((error: any) => {
            console.log('error', error);
          });
      } else {
        console.log('No data found in AsyncStorage for key studentAuth');
      }
    } catch (error) {
      console.error('Error retrieving data from AsyncStorage:', error);
      return null;
    }
  };

  // useEffect(() => {
  //   getQuizData();
  // }, []);
  const [allQuizes, setAllQuizes] = useState([]);
  const handleChoiceSelection = (choiceid: any, itemcorrect_choice: any) => {
    let quizAnswers: any = [];
    let answer = {quiz_id: choiceid, choice_id: itemcorrect_choice};
    quizAnswers.push(answer);
    setAllQuizes(quizAnswers);
  };
  const submitQuiz = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('studentAuth');
      if (jsonValue !== null) {
        const data = JSON.parse(jsonValue);
        const answersObject = {answers: allQuizes};
        console.log('answersObject', answersObject);
        axios
          .post(`${BaseUrl}quizzes/${courseId}/submit`, answersObject, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${data.token}`,
            },
          })
          .then(response => {
            console.log('response', response.data);
            let quizResult = response.data;
            navigation.replace('QuizResult', quizResult);
          })
          .catch((error: any) => {
            console.log('error', error);
            if (error.response) {
              console.log(
                'Courses Server responded with data:',
                error.response.data.message,
              );
              console.log('Courses Status code:', error.response.status);
              console.log('Courses Headers:', error.response.headers);
            } else if (error.request) {
              console.log('Courses No response received:', error.request);
            } else {
              console.log(
                'Error setting up the request: Courses',
                error.message,
              );
            }
          });
      } else {
        console.log('No data found in AsyncStorage for key studentAuth');
      }
    } catch (error: any) {
      console.error('Error retrieving data from AsyncStorage:', error);
    }
  };
  const quiz = [
    {
      id: 1,
      question: 'What is the capital of France?',
      choices: [
        {id: 1, quiz_id: 1, choice_text: 'Paris', correct_choice: true},
        {id: 2, quiz_id: 1, choice_text: 'London', correct_choice: false},
        {id: 3, quiz_id: 1, choice_text: 'Berlin', correct_choice: false},
        {id: 4, quiz_id: 1, choice_text: 'Madrid', correct_choice: false},
      ],
    },
    {
      id: 2,
      question: 'What is 2 + 2?',
      choices: [
        {id: 1, quiz_id: 2, choice_text: '3', correct_choice: false},
        {id: 2, quiz_id: 2, choice_text: '4', correct_choice: true},
        {id: 3, quiz_id: 2, choice_text: '5', correct_choice: false},
        {id: 4, quiz_id: 2, choice_text: '6', correct_choice: false},
      ],
    },
    {
      id: 3,
      question: 'Who wrote "To Kill a Mockingbird"?',
      choices: [
        {id: 1, quiz_id: 3, choice_text: 'Harper Lee', correct_choice: true},
        {id: 2, quiz_id: 3, choice_text: 'J.K. Rowling', correct_choice: false},
        {
          id: 3,
          quiz_id: 3,
          choice_text: 'Ernest Hemingway',
          correct_choice: false,
        },
        {id: 4, quiz_id: 3, choice_text: 'Mark Twain', correct_choice: false},
      ],
    },
    {
      id: 4,
      question: 'What is the chemical symbol for water?',
      choices: [
        {id: 1, quiz_id: 4, choice_text: 'O2', correct_choice: false},
        {id: 2, quiz_id: 4, choice_text: 'H2O', correct_choice: true},
        {id: 3, quiz_id: 4, choice_text: 'CO2', correct_choice: false},
        {id: 4, quiz_id: 4, choice_text: 'NaCl', correct_choice: false},
      ],
    },
  ];


  const [modalVisible, setModalVisible] = useState(false);

  const handlePress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    navigation.replace('MyDrawer')
  };

  return (
    <View
      style={{
        backgroundColor: Color.GhostWhite,
        height: '100%',
        paddingHorizontal: 25,
      }}>
          <Header title="Quiz Questions" navigation={navigation} />
      <FlatList
        data={quiz}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        renderItem={({item}: any) => {
          return (
            <RadioButton2
              options={item.choices}
              onSelect={handleChoiceSelection}
              label={item.question}
              required
            />
          );
        }}
        keyExtractor={(item: any) => item.id.toString()}
      />
      <View style={{margin:10}}/>
      {/* <CustomButton3 btnTitle="Submit" onPress={() => submitQuiz()} /> */}
      
      <CustomButton3 btnTitle="Submit" onPress={handlePress} />
      <View style={{margin:20}}/>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
          <Octicons name="check-circle-fill" size={75} color={Color.Primary} />
          <View style={{margin:10}}/>
           <Text style={styles.textType2}>Quiz completed</Text>
           <View style={{margin:10}}/>

            <Text style={styles.textType1}>Your Quiz Score is</Text>
            <Text style={styles.textType2}>40/100 (40%)</Text>
           <View style={{margin:10}}/>
            <CustomButton3 btnTitle="Back To Dashboard" onPress={handleCloseModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Quizes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  textType1: {
    color: Color.Black,
    fontSize: 17,
    fontFamily: 'Circular Std Book',
  },
  textType2: {
    color: Color.Black,
    fontSize: 26,
    fontFamily: 'Circular Std Medium',
  },
  label: {
    color: Color.Dune,
    fontFamily: 'Circular Std Medium',
    fontSize: 16,
  }
});
// <View style={{marginBottom: 20}}>
//   <Text style={{fontWeight: 'bold'}}>{item.question}</Text>
//   <FlatList
//     data={item.choices}
//     renderItem={({item: choice}) => (
//       <TouchableOpacity
//         onPress={() =>
//           handleChoiceSelection(choice.quiz_id, item.correct_choice)
//         }
//         style={{
//           backgroundColor: '#eee',
//           padding: 10,
//           marginTop: 5,
//           borderRadius: 5,
//         }}>
//         <Text>{choice.choice_text}</Text>
//       </TouchableOpacity>
//     )}
//     keyExtractor={choice => choice.id.toString()}
//   />
// </View>
