import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
  Image,
  Modal,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {Color} from '../../Constant';

function CustomDrawerContent(props: any) {
  return (
    <View style={{flex: 1, backgroundColor: 'white', paddingHorizontal: 15,marginVertical: 20,}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.drawerContent}
        showsVerticalScrollIndicator={false}>
        
          {/* <View
            style={{
              backgroundColor: Color.lightBlue,
              width: '100%',
              paddingVertical: 20,
              borderRadius: 10,
              padding: 10,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 15,
            }}>
            <Image
              source={require('../../Images/profile.png')}
              style={{width: 90, height: 90,borderRadius:50}}
            />
            <View>
              <Text
                style={{
                  color: Color.textHeading,
                  fontSize: 18,
                  fontWeight: '700',
                }}>
                Bella Smith
              </Text>
              <Text
                style={{
                  color: Color.textHeading,
                  fontSize: 14,
                  fontWeight: '700',
                }}>
                bellasmith@gmail.com
              </Text>
              <Text
                style={{
                  color: Color.textHeading,
                  fontSize: 14,
                  fontWeight: '700',
                }}>
                +91 123456789
              </Text>
            </View>
          </View> */}
        <TouchableOpacity  onPress={()=> props.navigation.navigate('EditProfile')} activeOpacity={0.8} style={{backgroundColor:Color.textHeading ,alignItems:'center',width:120,borderRadius:5,top:-20 ,alignSelf:'center',paddingHorizontal:20,paddingVertical:10}}>
          <Text style={{color:'white',fontSize:14, fontWeight:'400'}}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} onPress={()=> props.navigation.navigate('Home')} style={{flexDirection:'row', justifyContent:'space-between',marginHorizontal:10,marginVertical:10, borderBottomWidth:1, borderBottomColor:'#CBCBCB', paddingBottom:10}}>
        <View style={{flexDirection:'row', alignItems:'center', gap:20, }}>
          <Image source={require('../../Images/Home1.png')} style={{width:18, height:18}} resizeMode='contain'/>
          <Text style={{fontWeight:'400',fontSize:15, color:'black'}}>Dashboard</Text>
        </View>
        <Icon name="chevron-forward" size={15} color={'black'}/>
        </TouchableOpacity>
        {/* Schedule */}
        <TouchableOpacity activeOpacity={0.8} onPress={()=> props.navigation.navigate('Home')} style={{flexDirection:'row', justifyContent:'space-between',marginHorizontal:10,marginVertical:10, borderBottomWidth:1, borderBottomColor:'#CBCBCB', paddingBottom:10}}>
        {/* <View style={{flexDirection:'row', alignItems:'center', gap:20, }}>
          <Image source={require('../../Images/schedule.png')} style={{width:18, height:18}} resizeMode='contain'/>
          <Text style={{fontWeight:'400',fontSize:15, color:'black'}}>Schedule</Text>
        </View> */}
        <Icon name="chevron-forward" size={15} color={'black'}/>
        </TouchableOpacity>
        {/* Notifications */}
        <TouchableOpacity activeOpacity={0.8} onPress={()=> props.navigation.navigate('Notifications')} style={{flexDirection:'row', justifyContent:'space-between',marginHorizontal:10,marginVertical:10, borderBottomWidth:1, borderBottomColor:'#CBCBCB', paddingBottom:10}}>
        <View style={{flexDirection:'row', alignItems:'center', gap:20, }}>
          <Image source={require('../../Images/notifications.png')} style={{width:18, height:18}} resizeMode='contain'/>
          <Text style={{fontWeight:'400',fontSize:15, color:'black'}}>Notifications</Text>
        </View>
        <View style={{flexDirection:'row', alignItems:"center", gap:10}}>
        <Text style={{backgroundColor:Color.DarkBlue,width:20, borderRadius:50, color:'white',textAlign:'center'}}>4</Text>
        <Icon name="chevron-forward" size={15} color={'black'}/>
        </View>
        </TouchableOpacity>
        {/* messages */}
        <TouchableOpacity activeOpacity={0.8} onPress={()=> props.navigation.navigate('Home')} style={{flexDirection:'row', justifyContent:'space-between',marginHorizontal:10,marginVertical:10, borderBottomWidth:1, borderBottomColor:'#CBCBCB', paddingBottom:10}}>
        <View style={{flexDirection:'row', alignItems:'center', gap:20, }}>
          <Image source={require('../../Assets/Images/messages.png')} style={{width:18, height:18}} resizeMode='contain'/>
          <Text style={{fontWeight:'400',fontSize:15, color:'black'}}>Messages</Text>
        </View>
        <View style={{flexDirection:'row', alignItems:"center", gap:10}}>
        <Text style={{backgroundColor:Color.DarkBlue,width:20, borderRadius:50, color:'white',textAlign:'center'}}>4</Text>
        <Icon name="chevron-forward" size={15} color={'black'}/>
        </View>
        </TouchableOpacity>
        {/* Jobticket */}
        <TouchableOpacity activeOpacity={0.8} onPress={()=> props.navigation.navigate('Home')} style={{flexDirection:'row', justifyContent:'space-between',marginHorizontal:10,marginVertical:10, borderBottomWidth:1, borderBottomColor:'#CBCBCB', paddingBottom:10}}>
        <View style={{flexDirection:'row', alignItems:'center', gap:20, }}>
          <Image source={require('../../Images/Jobticket.png')} style={{width:18, height:18}} resizeMode='contain'/>
          <Text style={{fontWeight:'400',fontSize:15, color:'black'}}>Job Tickets</Text>
        </View>
        <Icon name="chevron-forward" size={15} color={'black'}/>
        </TouchableOpacity>
        {/* Demo Class */}
        <TouchableOpacity activeOpacity={0.8} onPress={()=> props.navigation.navigate('Home')} style={{flexDirection:'row', justifyContent:'space-between',marginHorizontal:10,marginVertical:10, borderBottomWidth:1, borderBottomColor:'#CBCBCB', paddingBottom:10}}>
        <View style={{flexDirection:'row', alignItems:'center', gap:20, }}>
          <Image source={require('../../Images/democlass.png')} style={{width:18, height:18}} resizeMode='contain'/>
          <Text style={{fontWeight:'400',fontSize:15, color:'black'}}>Demo Class</Text>
        </View>
        <Icon name="chevron-forward" size={15} color={'black'}/>
        </TouchableOpacity>
        {/*Reviews */}
        <TouchableOpacity activeOpacity={0.8} onPress={()=> props.navigation.navigate('Home')} style={{flexDirection:'row', justifyContent:'space-between',marginHorizontal:10,marginVertical:10, borderBottomWidth:1, borderBottomColor:'#CBCBCB', paddingBottom:10}}>
        <View style={{flexDirection:'row', alignItems:'center', gap:20, }}>
          <Image source={require('../../Images/reviews.png')} style={{width:18, height:18}} resizeMode='contain'/>
          <Text style={{fontWeight:'400',fontSize:15, color:'black'}}>Reviews</Text>
        </View>
        <Icon name="chevron-forward" size={15} color={'black'}/>
        </TouchableOpacity>
        {/*Students */}
        <TouchableOpacity activeOpacity={0.8} onPress={()=> props.navigation.navigate('Home')} style={{flexDirection:'row', justifyContent:'space-between',marginHorizontal:10,marginVertical:10, borderBottomWidth:1, borderBottomColor:'#CBCBCB', paddingBottom:10}}>
        <View style={{flexDirection:'row', alignItems:'center', gap:20, }}>
          <Image source={require('../../Images/students.png')} style={{width:18, height:18}} resizeMode='contain'/>
          <Text style={{fontWeight:'400',fontSize:15, color:'black'}}>Students</Text>
        </View>
        <Icon name="chevron-forward" size={15} color={'black'}/>
        </TouchableOpacity>
        {/*chat and support */}
        <TouchableOpacity activeOpacity={0.8} onPress={()=> props.navigation.navigate('Home')} style={{flexDirection:'row', justifyContent:'space-between',marginHorizontal:10,marginVertical:10, borderBottomWidth:1, borderBottomColor:'#CBCBCB', paddingBottom:10}}>
        <View style={{flexDirection:'row', alignItems:'center', gap:20, }}>
          <Image source={require('../../Images/chatsupport.png')} style={{width:18, height:18}} resizeMode='contain'/>
          <Text style={{fontWeight:'400',fontSize:15, color:'black'}}>Chat & Support</Text>
        </View>
        <Icon name="chevron-forward" size={15} color={'black'}/>
        </TouchableOpacity>
        {/*Comissions */}
        <TouchableOpacity activeOpacity={0.8} onPress={()=> props.navigation.navigate('Home')} style={{flexDirection:'row', justifyContent:'space-between',marginHorizontal:10,marginVertical:10, borderBottomWidth:1, borderBottomColor:'#CBCBCB', paddingBottom:10}}>
        <View style={{flexDirection:'row', alignItems:'center', gap:20, }}>
          <Image source={require('../../Images/comissions.png')} style={{width:18, height:18}} resizeMode='contain'/>
          <Text style={{fontWeight:'400',fontSize:15, color:'black'}}>Comissions</Text>
        </View>
        <Icon name="chevron-forward" size={15} color={'black'}/>
        </TouchableOpacity>
        {/*Reports */}
        <TouchableOpacity  activeOpacity={0.8} onPress={()=> props.navigation.navigate('Home')} style={{flexDirection:'row', justifyContent:'space-between',marginHorizontal:10,marginVertical:10, borderBottomWidth:1, borderBottomColor:'#CBCBCB', paddingBottom:10}}>
        <View style={{flexDirection:'row', alignItems:'center', gap:20, }}>
          <Image source={require('../../Images/reports.png')} style={{width:18, height:18}} resizeMode='contain'/>
          <Text style={{fontWeight:'400',fontSize:15, color:'black'}}>Reports</Text>
        </View>
        <Icon name="chevron-forward" size={15} color={'black'}/>
        </TouchableOpacity>
        {/*Change Password */}
        <TouchableOpacity activeOpacity={0.8} onPress={()=> props.navigation.navigate('Home')} style={{flexDirection:'row', justifyContent:'space-between',marginHorizontal:10,marginVertical:10, borderBottomWidth:0, borderBottomColor:'#CBCBCB', paddingBottom:10}}>
        <View style={{flexDirection:'row', alignItems:'center', gap:20, }}>
          <Image source={require('../../Images/changepassword.png')} style={{width:18, height:18}} resizeMode='contain'/>
          <Text style={{fontWeight:'400',fontSize:15, color:'black'}}>Change Password</Text>
        </View>
        <Icon name="chevron-forward" size={15} color={'black'}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.closeDrawer()} activeOpacity={0.8} style={{flexDirection:'row',justifyContent:'flex-end', alignItems:'center',gap:5, paddingHorizontal:10}}>
          <Icon name="chevron-back-sharp" size={15} color={Color.textHeading}/>
          <Text style={{color:Color.textHeading,fontWeight:'700',fontSize:14,}}>Back</Text>
        </TouchableOpacity>

      </DrawerContentScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  drawer: {
    width: '100%',
  },
  drawerContent: {
    // flex: 1,
    justifyContent: 'space-between',
  },
  closeButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  closeButton: {
    color: 'black',
    fontSize: 14,
  },
});
export default CustomDrawerContent;
