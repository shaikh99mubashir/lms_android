import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const QuizResult = ({route}:any) => {
    const result = route.params
    console.log('result',result);
    
  return (
    <View>
      <Text>score : {result.score}</Text>
      <Text>percentage : {result.percentage}</Text>
    </View>
  )
}

export default QuizResult

const styles = StyleSheet.create({})