import {Image, PermissionsAndroid, Platform, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../Components/Header';
import {Color} from '../../Constant';
import InputText from '../../Components/InputText';
import CustomButton from '../../Components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BaseUrl, profileImage} from '../../Constant/BaseUrl';
import axios from 'axios';
import InputText2 from '../../Components/InputText2';
import CustomButton3 from '../../Components/CustomButton3';
import CustomLoader from '../../Components/CustomLoader';
import { launchImageLibrary } from 'react-native-image-picker';

const Profile = ({navigation}: any) => {
  const [profileData, setProfileData] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [uri, setUri] = useState('');
  const [type, setType] = useState('');
  const [name, setName] = useState('');
  const getProfileData = async () => {
    setLoading(true)
    try {
      const jsonValue = await AsyncStorage.getItem('studentAuth');
      if (jsonValue !== null) {
        const data = JSON.parse(jsonValue);
        console.log('Retrieved data:', data.token);

        axios
          .get(`${BaseUrl}users`, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${data.token}`,
            },
          })
          .then(response => {
            // console.log('profile',response.data);
            let profile = response.data.user;
            setProfileData(profile);
            setLoading(false)
          })
          .catch(error => {
            setLoading(false)
            console.log('error', error);
            if (error.response) {
              console.log(
                'users Server responded with data:',
                error.response.data.message,
              );
              console.log('users Status code:', error.response.status);
              console.log('users Headers:', error.response.headers);
            } else if (error.request) {
              console.log('users No response received:', error.request);
            } else {
              console.log('Error setting up the request: users', error.message);
            }
          });
      } else {
        setLoading(false)
        console.log('No data found in AsyncStorage for key studentAuth');
        return null;
      }
    } catch (error) {
      setLoading(false)
      console.error('Error retrieving data from AsyncStorage:', error);
      return null;
    }
  };

  const uploadProfilePicture = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs camera permission to upload profile picture',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission denied');
        return;
      }
    }

    console.log('running');
    const options: any = {
      title: 'Select Picture',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      maxWidth: 500,
      maxHeight: 500,
      quality: 0.5,
    };

    const result: any = await launchImageLibrary(options);

    if (result.didCancel) {
      console.log('Cancelled image selection');
    } else if (result.errorCode === 'permission') {
      console.log('Permission Not Satisfied');
    } else if (result.errorCode === 'others') {
      console.log(result.errorMessage);
    } else if (result.assets && result.assets.length > 0) {
      let selectedUri = result.assets[0].uri;
      let selectedType = result.assets[0].type;
      let selectedName = result.assets[0].fileName;

      setUri(selectedUri);
      setType(selectedType);
      setName(selectedName);
    }
  };
  useEffect(() => {
    getProfileData();
  }, []);

  return (
    <View
      style={{
        backgroundColor: Color.GhostWhite,
        height: '100%',
        paddingHorizontal: 25,
      }}>
      <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled>
        <Header title={'Profile'} goBack navigation={navigation} />
        <View style={{margin: 5}}></View>
        <View style={{alignItems: 'center'}}>
          <Image
            source={{uri:profileData?.full_image_url }} 
            style={{
              width: 95,
              height: 95,
              borderRadius: 50,
              borderWidth: 3,
              borderColor: Color.Primary,
            }}
          />
          <Image
            source={require('../../Images/gallery.png')}
            style={{position: 'absolute', top: 60, right: 130}}
          />
          <View style={{margin: 8}}></View>
          <Text style={[styles.textType1, {lineHeight: 35}]}>
            {profileData?.name}
          </Text>
          <Text style={[styles.textType3]}>{profileData?.email}</Text>
        </View>
        <View style={{gap: 5, marginTop: 25}}>
          <InputText2 label="Full Name*" 
          placeholder={profileData?.name} editable={false}/>
        </View>
        <View style={{margin: 5}}></View>
        <View>
          <InputText2 label="Email*" 
          placeholder={profileData?.email} editable={false}/>
        </View>
        <View style={{margin: 8}}></View>
        <View>
          <InputText2 label="Mobile Phone*" 
          placeholder="+60 2168-5000-6789" editable={false}/>
        </View>
        <View style={{margin: 8}}></View>
        <View>
          <InputText2 label="Parent Name*" 
          placeholder="Parent Name" editable={false}/>
        </View>
        <View style={{margin: 8}}></View>
        <View>
          <InputText2 label="Parent Email*" 
          placeholder="Parent Email" editable={false}/>
        </View>
       
      </ScrollView>
        <View style={{marginBottom:40,marginTop:30}}>
          <CustomButton3 btnTitle='Save'/>
        </View>
        <CustomLoader visible={loading} />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  textType3: {
    color: Color.Dune,
    fontWeight: '500',
    fontSize: 16,
    fontFamily: 'Circular Std Medium',
    fontStyle: 'normal',
  },
  textType1: {
    fontWeight: '500',
    fontSize: 26,
    color: Color.Black,
    fontFamily: 'Circular Std Medium',
    lineHeight: 24,
    fontStyle: 'normal',
  },
});
