import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BaseUrl } from '../../Constant/BaseUrl'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { FlatList } from 'react-native'

const Quizes = ({navigation, route}:any) => {
    let courseId = route.params
    console.log('quizzes',courseId);
    
    const [quiz, setQuiz] =useState([])
    console.log('quiz',quiz);
    
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
            .then((response:any) => {
              console.log('response', response.data);
              let coursesDetail = response.data
              setQuiz(coursesDetail);
            })
            .catch((error:any) => {
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
    const handleChoiceSelection = (choiceid:any, itemcorrect_choice:any) => {

    }
  return (
    <View>
      <FlatList
  data={quiz}
  renderItem={({ item }:any) => (
    <View style={{ marginBottom: 20 }}>
      <Text style={{ fontWeight: 'bold' }}>{item.question}</Text>
      <FlatList
        data={item.choices}
        renderItem={({ item: choice }) => (
          <TouchableOpacity
            onPress={() => handleChoiceSelection(choice.id, item.correct_choice)}
            style={{
              backgroundColor: '#eee',
              padding: 10,
              marginTop: 5,
              borderRadius: 5,
            }}>
            <Text>{choice.choice_text}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(choice) => choice.id.toString()}
      />
    </View>
  )}
  keyExtractor={(item:any) => item.id.toString()}
/>

    </View>
  )
}

export default Quizes

const styles = StyleSheet.create({})