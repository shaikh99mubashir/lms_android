import {
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BaseUrl} from '../../Constant/BaseUrl';
import {Color} from '../../Constant';
import Header from '../../Components/Header';
import SearchBar from '../../Components/SearchBar';
import CustomTabView from '../../Components/CustomTabView';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomTabView3 from '../../Components/CustomTabView3';
import CustomLoader from '../../Components/CustomLoader';
import Icon from 'react-native-vector-icons/Ionicons';
import RightArrowSvg from '../../Svgs/RightArrowSvg';
import {useIsFocused} from '@react-navigation/native';
const StudentCourses = ({navigation}: any) => {
  const [ongoing, setOngoing] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log('ongoing========>', ongoing);
  console.log('completed========>', completed);
  const focus = useIsFocused();
  const getStudentCourses = async () => {
    setLoading(true);
    try {
      const jsonValue = await AsyncStorage.getItem('studentAuth');
      if (jsonValue !== null) {
        const data = JSON.parse(jsonValue);
        console.log('Retrieved data:', data.token);
        axios
          .get(`${BaseUrl}my-courses`, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${data.token}`,
            },
          })
          .then(response => {
            console.log('response', response.data);
            let studentCourses = response.data;
            let ongoingCourses = [];
            let completedCourses = [];
            ongoingCourses = studentCourses.filter(
              (course: any) => course.completed === false,
            );
            completedCourses = studentCourses.filter(
              (course: any) => course.completed === true,
            );
            console.log('ongoingCourses', ongoingCourses);

            setOngoing(ongoingCourses);
            setCompleted(completedCourses);
            setLoading(false);
          })
          .catch(error => {
            console.log('error', error);
            setLoading(false);
          });
      } else {
        console.log('No data found in AsyncStorage for key studentAuth');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error retrieving data from AsyncStorage:', error);
      setLoading(false);
      return null;
    }
  };

  useEffect(() => {
    getStudentCourses();
  }, [focus]);

  const [currentTab, setCurrentTab]: any = useState([
    {
      index: 0,
      name: 'Latest',
      selected: true,
    },
    {
      index: 1,
      name: 'Applied',
      selected: false,
    },
  ]);

  const activateTab = (index: any) => {
    const newTabs = currentTab.map((e: any) => ({
      ...e,
      selected: e.index === index,
    }));
    console.log('newTabs', newTabs);

    setCurrentTab(newTabs);
  };

  const firstRoute = useCallback(() => {
    const coursesData = [
      {
        id: 1,
        name: 'Algebra I',
        description: 'Introduction to algebraic expressions and equations.',
      },
      {
        id: 2,
        name: 'Geometry',
        description: 'Study of shapes, sizes, and properties of space.',
      },
      {
        id: 3,
        name: 'Calculus I',
        description: 'Fundamentals of limits, derivatives, and integrals.',
      },
      {
        id: 4,
        name: 'Statistics',
        description:
          'Basics of data collection, analysis, interpretation, and presentation.',
      },
      {
        id: 5,
        name: 'Trigonometry',
        description: 'Exploration of angles and their relationships.',
      },
      {
        id: 6,
        name: 'Linear Algebra',
        description: 'Understanding vector spaces and linear mappings.',
      },
      {
        id: 7,
        name: 'Differential Equations',
        description: 'Study of equations involving derivatives of functions.',
      },
      {
        id: 8,
        name: 'Discrete Mathematics',
        description: 'Introduction to mathematical structures and algorithms.',
      },
      {
        id: 9,
        name: 'Number Theory',
        description: 'Exploration of integers and integer-valued functions.',
      },
      {
        id: 10,
        name: 'Mathematical Logic',
        description: 'Study of formal systems and symbolic reasoning.',
      },
    ];

    const renderItem = ({item}: any) => {
      return (
        <TouchableOpacity
          onPress={() => navigation.navigate('OngoingDetail', item)}
          activeOpacity={0.8}
          key={item.id}
          style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 15,
            backgroundColor: Color.white,
            borderRadius: 20,
            padding: 10,
            flexDirection: 'row',
            paddingHorizontal: 20,
            paddingVertical: 15,
          }}>
          <View>
            <Text style={[styles.textType1]}>{item.name}</Text>
            <Text
              style={[
                styles.textType3,
                {
                  fontFamily: 'Circular Std Book',
                  color: Color.DustyGrey,

                  marginTop: 4,
                  fontSize: 14,
                },
              ]}>
              Build a Strong Foundation in English
            </Text>
          </View>
          <View>
            <RightArrowSvg />
          </View>
        </TouchableOpacity>
      );
    };
    return (
      <View>
        <View style={{margin: 10}} />
        {ongoing.length > 0 ? (
          <FlatList
            data={ongoing}
            renderItem={renderItem}
            keyExtractor={(item: any) => item.id}
          />
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={require('../../Images/nodatafound.png')}
              resizeMode="cover"
              style={{width: 350, height: 350}}
            />
          </View>
        )}
      </View>
    );
  }, [ongoing, completed]);
  const secondRoute = useCallback(() => {
    const [modalVisible, setModalVisible] = useState(false);
    const closeModal = () => {
      setModalVisible(false);
    };
    const renderItem = ({item}: any) => {
      return (
        <>
         <TouchableOpacity
          activeOpacity={0.8}
          key={item.id}
          style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 15,
            backgroundColor: Color.white,
            borderRadius: 20,
            padding: 10,
            flexDirection: 'row',
            paddingHorizontal: 20,
            paddingVertical: 15,
          }}>
          <View>
            <Text style={[styles.textType1]}>{item.name}</Text>
            <Text
              style={[
                styles.textType3,
                {
                  fontFamily: 'Circular Std Book',
                  color: Color.DustyGrey,

                  marginTop: 4,
                  fontSize: 14,
                },
              ]}>
              Build a Strong Foundation in English
            </Text>
            <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  backgroundColor: Color.Primary,
                  padding: 10,
                  borderRadius: 15,
                  marginTop: 10,
                  width: 130,
                }}>
                <Text
                  style={[
                    styles.textType3,
                    {
                      fontFamily: 'Circular Std Book',
                      color: Color.white,
                      fontSize: 14,
                      textAlign: 'center',
                    },
                  ]}>
                  View Certificate
                </Text>
              </TouchableOpacity>
          </View>
          <View>
            {/* <RightArrowSvg /> */}
          </View>
        </TouchableOpacity>
          <View style={{position: 'absolute', right: 15, top: 22, zIndex: 1}}>
            <AntDesign name="checkcircle" size={25} color={'green'} />
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={closeModal}>
            <View style={styles.modalContainer}>
              <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <Icon name="close-circle" size={30} color="#fff" />
              </TouchableOpacity>
              <View style={styles.certificate}>
                <Text style={styles.header}>Certificate of Completion</Text>
                <Text style={styles.subHeader}>This Certifies that</Text>
                <Text style={styles.name}>Alex</Text>
                <Text style={styles.details}>
                  Has Successfully Completed the Wallace Training Program,{'\n'}
                  Entitled{' '}
                  <Text style={styles.course}>
                    3D Design Illustration Course
                  </Text>
                  {'\n'}
                  Issued on November 24, 2022{'\n'}
                  ID: SKC2480806
                </Text>
                <View style={styles.signatureContainer}>
                  <Image
                    source={{uri: 'https://path-to-signature-image.png'}}
                    style={styles.signature}
                  />
                  <Text style={styles.signatureName}>Calvin E. McGinnis</Text>
                  <Text style={styles.signatureTitle}>
                    Virginia M. Patterson
                  </Text>
                  <Text style={styles.issueDate}>
                    Issued on November 24, 2022
                  </Text>
                </View>
              </View>
            </View>
          </Modal>
        </>
      );
    };
    return (
      <View>
        <View style={{margin: 10}} />
        {completed.length > 0 ? (
          <FlatList
            data={completed}
            renderItem={renderItem}
            keyExtractor={(item: any) => item.id}
          />
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={require('../../Images/nodatafound.png')}
              resizeMode="cover"
              style={{width: 350, height: 350}}
            />
          </View>
        )}
      </View>
    );
  }, [ongoing, completed]);

  return (
    <View
      style={{
        backgroundColor: Color.GhostWhite,
        height: '100%',
       
      }}>
      <ScrollView>
        <View style={{paddingHorizontal: 25}}>
          <Header goBack title="My Courses" navigation={navigation} />
          <View style={{marginTop: 10}}>
            <CustomTabView3
              currentTab={currentTab}
              firstRoute={firstRoute}
              secondRoute={secondRoute}
              activateTab={activateTab}
              firstRouteTitle="Ongoing"
              secondRouteTitle={`Completed`}
            />
          </View>
        </View>
      </ScrollView>
      <CustomLoader visible={loading} />
    </View>
  );
};

export default StudentCourses;

const styles = StyleSheet.create({
  BoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  Box: {
    backgroundColor: 'white',
    height: 60,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 12,
    elevation: 4, // for Android
    shadowColor: 'rgba(213, 226, 245, 0.40)', // for iOS
    shadowOffset: {width: 0, height: 4}, // for iOS
    shadowOpacity: 1, // for iOS
    shadowRadius: 20,
    flex: 1,
    padding: 15,
    fontFamily: 'Circular Std Book',
    color: 'black',
    fontSize: 18,
  },
  textType3: {
    color: Color.Dune,
    fontSize: 16,
    fontFamily: 'Circular Std Medium',
  },
  textType1: {
    fontSize: 21,
    color: Color.Black,
    fontFamily: 'Circular Std Medium',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  certificateModal: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  certificateText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  closeButton: {
    fontSize: 16,
    color: 'blue',
    textAlign: 'center',
    marginTop: 10,
  },
  certificate: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    borderWidth: 5,
    borderColor: '#e3e3e3',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  subHeader: {
    fontSize: 18,
    marginVertical: 10,
  },
  name: {
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  details: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
  course: {
    fontWeight: 'bold',
  },
  signatureContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  signature: {
    width: 200,
    height: 60,
    resizeMode: 'contain',
  },
  signatureName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  signatureTitle: {
    fontSize: 16,
    marginTop: 5,
  },
  issueDate: {
    fontSize: 16,
    marginTop: 5,
  },
});
