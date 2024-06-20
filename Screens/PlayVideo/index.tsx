import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import RNVideo from '../../Components/RNVideo';
import { Color } from '../../Constant';

const PlayVideo = ({navigation,route}:any) => {
    const data = route.params
    console.log('data==================>',data);
    
  return (
    <View style={{justifyContent:'center',  height:'100%', backgroundColor:Color.GhostWhite}}>
      <RNVideo  videoUrl={data.url} navigation={navigation}/>
    </View>
  )
}

export default PlayVideo

const styles = StyleSheet.create({})