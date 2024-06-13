import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomButton from '../../Components/CustomButton';
import {Color} from '../../Constant';
import Header from '../../Components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BaseUrl} from '../../Constant/BaseUrl';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomTabView2 from '../../Components/CustomTabView2';
import CustomButton3 from '../../Components/CustomButton3';
import CustomLoader from '../../Components/CustomLoader';
const CourseDetail = ({navigation, route}: any) => {
  const courseDetail = route.params;
  let courseId = courseDetail.id;
  console.log('route================>', courseDetail);
  const [loading, setLoading] = useState(false);
  const handelEnrollNow = async () => {
    setLoading(true);
    try {
      const jsonValue = await AsyncStorage.getItem('studentAuth');
      if (jsonValue !== null) {
        const data = JSON.parse(jsonValue);
        console.log('Retrieved data:', data.token);
        const formData = new FormData();
        formData.append('course_id', courseId);

        axios
          .post(`${BaseUrl}enroll`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${data.token}`,
            },
          })
          .then(response => {
            console.log('response', response.data);
            setLoading(false);
            ToastAndroid.show(`${response.data.message}`, ToastAndroid.SHORT);
            // navigation.replace('MyDrawer', {
            //   screen: 'StudentCourses',
            // });

            navigation.replace('StudentCourses');
          })
          .catch(error => {
            console.log('error', error);
          });
      } else {
        console.log('No data found in AsyncStorage for key studentAuth');
        setLoading(false);
        navigation.replace('Login');
      }
    } catch (error) {
      console.error('Error retrieving data from AsyncStorage:', error);
      setLoading(false);
      return null;
    }
  };

  const [currentTab, setCurrentTab]: any = useState([
    {
      index: 0,
      name: 'About',
      selected: true,
    },
    {
      index: 1,
      name: 'Curriculcum',
      selected: false,
    },
  ]);
  const activateTab = (index: any) => {
    const newTabs = currentTab.map((e: any) => ({
      ...e,
      selected: e.index === index,
    }));

    setCurrentTab(newTabs);
  };
  const firstRoute = () => {
    const [showMore, setShowMore] = useState(false);

    const toggleShowMore = () => {
      setShowMore(!showMore);
    };

    const textContent = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;

    const truncatedContent = textContent.split(' ').slice(0, 25).join(' ');
    const remainingContent = textContent.split(' ').slice(25).join(' ');

    return (
      <View
        style={{
          paddingHorizontal: 25,
          paddingVertical: 15,
          backgroundColor: Color.white,
          marginTop: 10,
          borderRadius: 10,
        }}>
        <Text
          style={[
            styles.textType3,
            {color: Color.IronsideGrey, lineHeight: 20, textAlign: 'justify'},
          ]}>
          {showMore ? textContent : truncatedContent}
          {textContent.length > 25 && (
            <TouchableOpacity
              style={{padding: 0, margin: 0}}
              onPress={toggleShowMore}>
              <Text
                style={[
                  styles.textType3,
                  {
                    color: showMore ? Color.BrightBlue : Color.IronsideGrey,
                    position: 'relative',
                    top: 4,
                  },
                ]}>
                {showMore ? 'Read Less' : '...'}
                {!showMore && (
                  <Text style={{color: Color.BrightBlue}}>Read More</Text>
                )}
              </Text>
            </TouchableOpacity>
          )}
        </Text>
      </View>
    );
  };

  const secondRoute = () => {
    const data = [
      {id: 1, title: 'Why Using Graphic De..'},
      {id: 2, title: 'Setup Your Graphic De..'},
      {id: 3, title: 'Why Using Graphic De..'},
    ];
    const renderItem = ({item, index}: any) => (
      <View
        style={[
          styles.studentBox,
          {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          },
        ]}>
        <View style={{flexDirection: 'row', gap: 10}}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: '#E8F1FF',
            }}>
            <Text style={[styles.textType3, {fontSize: 18}]}>{index + 1}</Text>
          </View>
          <View>
            <Text style={[styles.textType3, {fontSize: 18}]}>{item.title}</Text>
            <Text style={[styles.textType3]}>15 min</Text>
          </View>
        </View>
        <View>
          <FontAwesome name="play-circle" size={25} color={Color.BrightBlue} />
        </View>
      </View>
    );
    return (
      <View
        style={{
          paddingHorizontal: 25,
          paddingVertical: 15,
          width: '100%',
          backgroundColor: Color.white,
          marginTop: 10,
          borderRadius: 10,
        }}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          nestedScrollEnabled={true}
        />
      </View>
    );
  };

  const Reviewdata = [
    {
      id: '1',
      name: 'Lisa Cameron',
      rating: 4.5,
      review:
        'Exceptional online tutoring – a game-changer for personalized learning and academic success!',
      likes: 56,
      date: '2 Weeks ago',
    },
    {
      id: '2',
      name: 'Lisa Cameron',
      rating: 4.5,
      review:
        'Exceptional online tutoring – a game-changer for personalized learning and academic success!',
      likes: 56,
      date: '1 Week ago',
    },
    {
      id: '31',
      name: 'Lisa Cameron',
      rating: 4.5,
      review:
        'Exceptional online tutoring – a game-changer for personalized learning and academic success!',
      likes: 56,
      date: '2 Weeks ago',
    },
  ];

  const renderReviewItems = ({item}: any) => {
    return (
      <View
        style={{
          backgroundColor: 'white',
          padding: 20,
          borderRadius: 16,
          marginBottom: 15,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
          <View>
            <Image
              source={require('../../Images/user-image.png')}
              style={{width: 40, height: 40, borderRadius: 50}}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              flex: 1,
            }}>
            <View>
              <Text style={[styles.textType3, {fontSize: 22}]}>
                {item.name}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 5,
                backgroundColor: Color.GhostWhite,
                borderWidth: 1,
                borderRadius: 30,
                alignSelf: 'center',
                paddingHorizontal: 10,
                borderColor: Color.Primary,
              }}>
              <FontAwesome
                name="star-half-empty"
                size={20}
                color={Color.Yellow}
              />
              <Text style={[styles.textType3, {lineHeight: 24, fontSize: 18}]}>
                {item.rating}
              </Text>
            </View>
          </View>
        </View>

        <View style={{paddingLeft: 52}}>
          <Text style={{color: 'gray', lineHeight: 20}}>{item.review}</Text>
          <View style={{marginVertical: 10}}></View>
          <View style={{flexDirection: 'row', gap: 40}}>
            <View style={{flexDirection: 'row', gap: 6, alignItems: 'center'}}>
              <AntDesign name="heart" size={18} color="red" />
              <Text style={styles.textType3}>{item.likes}</Text>
            </View>
            <Text style={styles.textType3}>{item.date}</Text>
          </View>
        </View>
      </View>
    );
  };

  // const CourseDetail = {
  //   id: 'ALG-101',
  //   title: 'Algebra I',
  //   description:
  //     'An introductory course to algebra, focusing on foundational concepts and skills.',
  //   topicsCovered: [
  //     'Algebraic Foundations',
  //     'Solving Equations & Inequalities',
  //     'Working with Units',
  //     'Linear Equations & Graphs',
  //     'Forms of Linear Equations',
  //     'Systems of Equations',
  //     'Inequalities (Systems & Graphs)',
  //     'Functions',
  //     'Sequences',
  //     'Absolute Value & Piecewise Functions',
  //     'Exponents & Radicals',
  //     'Exponential Growth & Decay',
  //   ],
  //   learningOutcomes: [
  //     'Understand and apply the properties of real numbers.',
  //     'Solve linear equations and inequalities with one variable.',
  //     'Graph linear equations and inequalities in two variables.',
  //     'Model real-world situations using algebraic expressions and equations.',
  //     'Analyze and solve systems of linear equations.',
  //     'Explore the concept of functions and their applications.',
  //     'Investigate sequences and their properties.',
  //     'Examine exponential relationships and their representations.',
  //   ],
  //   prerequisites: 'Basic understanding of arithmetic and number operations.',
  //   assessmentMethods: [
  //     'Quizzes',
  //     'Homework Assignments',
  //     'Unit Tests',
  //     'Final Exam',
  //   ],
  //   courseDuration: 'One semester',
  //   creditHours: 3,
  // };
  return (
    <View
      style={{
        backgroundColor: Color.GhostWhite,
        height: '100%',
      }}>
      <ScrollView>
        <View style={{paddingHorizontal: 25}}>
          <Header goBack title="Courses Detail" navigation={navigation} />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              style={[
                styles.textType3,
                {
                  color: Color.white,
                  backgroundColor:
                    courseDetail?.type == 'trending'
                      ? '#0033ff'
                      : courseDetail?.type == 'top rated'
                      ? 'blue'
                      : courseDetail?.type == 'most popular'
                      ? Color.Yellow
                      : Color.Primary,

                  fontSize: 16,
                  textTransform: 'capitalize',
                  textAlign: 'center',
                  paddingHorizontal: 15,
                  paddingVertical: 5,
                  borderRadius: 30,
                  width: 100,
                  marginBottom: 10,
                },
              ]}>
              trending
            </Text>
            <View style={{flexDirection: 'row', gap: 5}}>
              <FontAwesome
                name="star-half-empty"
                size={20}
                color={Color.Yellow}
              />
              <Text style={styles.textType3}>4.4</Text>
            </View>
          </View>
          <View style={{margin: 5}} />
          <Text style={[styles.textType3, {fontSize: 22}]}>
            {courseDetail.name}
          </Text>
          <View style={{margin: 5}} />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'row', gap: 8, alignItems: 'center'}}>
              <View
                style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                <FontAwesome
                  name="video-camera"
                  size={14}
                  color={Color.Black}
                />
                <Text
                  style={[
                    styles.textType3,
                    {
                      fontFamily: 'Circular Std Book',
                      color: Color.DustyGrey,
                      fontSize: 14,
                    },
                  ]}>
                  21 Class
                </Text>
              </View>
              <View
                style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                <FontAwesome name="clock-o" size={14} color={Color.Black} />
                <Text
                  style={[
                    styles.textType3,
                    {
                      fontFamily: 'Circular Std Book',
                      color: Color.DustyGrey,
                      fontSize: 14,

                    },
                  ]}>
                  42 Hours
                </Text>
              </View>
            </View>
            {/* <Text style={[styles.textType1, {color: Color.BrightBlue}]}>
              499/-
            </Text> */}
          </View>
          <View style={{margin: 10}} />
        </View>
        <View style={{paddingHorizontal: 25}}>
          {/* <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: Color.lineColor,
          }}></View> */}
          <CustomTabView2
            currentTab={currentTab}
            firstRoute={firstRoute}
            secondRoute={secondRoute}
            activateTab={activateTab}
            firstRouteTitle="About"
            secondRouteTitle="Curriculcum"
          />
        </View>
        <View style={{paddingHorizontal: 25}}>
          <Text style={[styles.textType1, {fontSize: 22}]}>Instructor</Text>
          <View style={{margin: 5}} />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              backgroundColor: Color.white,
              paddingVertical: 10,
              paddingHorizontal: 10,
              borderRadius: 10,
            }}>
            <Image
              source={require('../../Images/user-image.png')}
              style={{width: 50, height: 50, borderRadius: 50}}
            />
            <View>
              <Text style={[styles.textType1, {fontSize: 22}]}>Robert jr</Text>
              <Text
                style={[
                  styles.textType3,
                  {
                    fontFamily: 'Circular Std Book',
                    color: Color.DustyGrey,
                    fontSize: 14,
                  },
                ]}>
                Graphic Design
              </Text>
            </View>
          </View>
          <View style={{margin: 10}} />
          <Text style={[styles.textType1, {fontSize: 18}]}>
            What You’ll Get
          </Text>
          <View style={{margin: 5}} />
          <View
            style={{
              backgroundColor: Color.white,
              paddingVertical: 10,
              paddingHorizontal: 10,
              borderRadius: 10,
            }}>
            <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
              <FontAwesome name="copy" size={14} color={Color.Black} />
              <Text style={[
            styles.textType3,
            {
              fontFamily: 'Circular Std Book',
              color: Color.DustyGrey,
              fontSize: 14,
            },
          ]}>100 Quizs</Text>
            </View>
            <View style={{margin: 5}} />
            <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
              <FontAwesome name="certificate" size={14} color={Color.Black} />
              <Text style={[
            styles.textType3,
            {
              fontFamily: 'Circular Std Book',
              color: Color.DustyGrey,
              fontSize: 14,
            },
          ]}>
                Certificate of Completion
              </Text>
            </View>
          </View>
          <View style={{marginTop: 25}} />
          <Text style={[styles.textType1, {fontSize: 22}]}>Reviews</Text>
          <View style={{marginTop: 10}}>
            <FlatList
              data={Reviewdata}
              renderItem={renderReviewItems}
              keyExtractor={item => item.id}
            />
          </View>
        </View>
        <View>
          <View
            style={{paddingHorizontal: 25, paddingBottom: 20, paddingTop: 10}}>
            <CustomButton3
              btnTitle="Enroll Now"
              onPress={() => handelEnrollNow()}
            />
          </View>
        </View>
      </ScrollView>

      <CustomLoader visible={loading} />
    </View>
  );
};

export default CourseDetail;

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
  boxStyle: {
    width: '31%',
    padding: 10,
    alignItems: 'center',
    height: 70,
    justifyContent: 'center',
    borderRadius: 16,
  },
  studentBox: {
    backgroundColor: 'white',
    height: 60,
    borderRadius: 12,
    elevation: 4, // for Android
    shadowColor: 'rgba(213, 226, 245, 0.40)', // for iOS
    shadowOffset: {width: 0, height: 4}, // for iOS
    shadowOpacity: 1, // for iOS
    shadowRadius: 20,
    flex: 1,
    fontFamily: 'Circular Std Book',
    color: 'black',
    fontSize: 16,
    width: '100%',
    // padding: 15,
    // justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
});
