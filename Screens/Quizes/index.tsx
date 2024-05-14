import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BaseUrl} from '../../Constant/BaseUrl';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FlatList} from 'react-native';
import {Color} from '../../Constant';
import CustomButton from '../../Components/CustomButton';

const Quizes = ({navigation, route}: any) => {
  let courseId = route.params;
  console.log('quizzes', courseId);

  const [quiz, setQuiz] = useState([]);
  console.log('quiz', quiz);

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
            setQuiz(coursesDetail);
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

  useEffect(() => {
    getQuizData();
  }, []);
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
            let quizResult =  response.data
            navigation.replace('QuizResult', quizResult)
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

  return (
    <View
      style={{
        backgroundColor: Color.PattensBlue,
        height: '100%',
        padding: 25,
      }}>
      <FlatList
        data={quiz}
        renderItem={({item}: any) => (
          <View style={{marginBottom: 20}}>
            <Text style={{fontWeight: 'bold'}}>{item.question}</Text>
            <FlatList
              data={item.choices}
              renderItem={({item: choice}) => (
                <TouchableOpacity
                  onPress={() =>
                    handleChoiceSelection(choice.quiz_id, item.correct_choice)
                  }
                  style={{
                    backgroundColor: '#eee',
                    padding: 10,
                    marginTop: 5,
                    borderRadius: 5,
                  }}>
                  <Text>{choice.choice_text}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={choice => choice.id.toString()}
            />
          </View>
        )}
        keyExtractor={(item: any) => item.id.toString()}
      />
      <CustomButton btnTitle="Submit" onPress={() => submitQuiz()} />
    </View>
  );
};

export default Quizes;

const styles = StyleSheet.create({});
