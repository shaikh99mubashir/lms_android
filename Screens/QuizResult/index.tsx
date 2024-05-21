import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../../Components/Header'
import { Color } from '../../Constant'

const QuizResult = ({route,navigation}:any) => {
    // const result = route.params
    // console.log('result',result);
    
  return (
    <View
      style={{
        backgroundColor: Color.GhostWhite,
        height: '100%',
        paddingHorizontal: 25,
      }}>
          <Header goBack title="Qui" navigation={navigation} />
      <Text>percentage :0</Text>
    </View>
  )
}

export default QuizResult

const styles = StyleSheet.create({})