import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../Components/Header';
import {Color} from '../../Constant';
import SearchBar from '../../Components/SearchBar';
import CustomButton from '../../Components/CustomButton';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Home = ({navigation}: any) => {
  const getDataFromStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('studentAuth');
      if (jsonValue !== null) {
        const data = JSON.parse(jsonValue);
        console.log('Retrieved data:', data);
        return data;
      } else {
        console.log('No data found in AsyncStorage for key studentAuth');
        return null;
      }
    } catch (error) {
      console.error('Error retrieving data from AsyncStorage:', error);
      return null;
    }
  };

  useEffect(() => {
    getDataFromStorage();
  }, []);

  const data = [
    {id: '1', title: 'Most Enroll Classes', jtuid: 'J9003428', mode: 'online'},
    {id: '2', title: 'Class One', jtuid: 'J9003428', mode: 'Physical'},
    {id: '3', title: 'Class Two', jtuid: 'J9003428', mode: 'online'},
    {id: '4', title: 'Class Three', jtuid: 'J9003428', mode: 'online'},
    {id: '5', title: 'Class Four', jtuid: 'J9003428', mode: 'online'},
    {id: '6', title: 'Class Five', jtuid: 'J9003428', mode: 'online'},
    {id: '7', title: 'Class Six', jtuid: 'J9003428', mode: 'online'},
    {id: '8', title: 'Class Seven', jtuid: 'J9003428', mode: 'online'},
    {id: '9', title: 'Class Eight', jtuid: 'J9003428', mode: 'online'},
    {id: '10', title: 'Class Nine', jtuid: 'J9003428', mode: 'online'},
    {id: '11', title: 'Class Ten', jtuid: 'J9003428', mode: 'online'},
  ];
  const [selectedJT, setSelectedJT] = useState(0);
  const handelJobTicketPress = (item: any) => {
    setSelectedJT(item.id === selectedJT ? null : item.id);
  };

  const [selectedItem, setSelectedItem] = useState(data[0].id);
  const [selectedClass, setSelectedClass] = useState('');
  console.log('selectedClass', selectedClass);
  const renderSubject = ({item}: any) => {
    const isSelected = selectedItem === item.id;
    const handelSubjectPress = (item: any) => {
      setSelectedItem(item.id);
      setSelectedClass(item.title);
      console.log(item);
    };
    return (
      <TouchableOpacity
        onPress={() => handelSubjectPress(item)}
        style={{
          paddingHorizontal: 15,
          height: 30,
          // borderBottomWidth: isSelected ? 3 : 2,
          alignItems: 'center',
          justifyContent: 'center',
          // borderBottomColor: isSelected ? Color.Primary : Color.shinyGrey,
          marginTop: 20,
          backgroundColor: isSelected ? Color.Primary : Color.PattensBlue,
          borderRadius: 30,
        }}>
        <Text
          style={[
            styles.textType3,
            {color: isSelected ? Color.white : 'black'},
          ]}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  const subjectData = [
    {
      id: '2',
      title: 'English',
      rating: 4.4,
      users: 10,
      image: require('../../Images/courses.png'),
      type: 'tranding',
      class: 'class one',
    },
    {
      id: '3',
      title: 'Physic',
      rating: 4.4,
      users: 10,
      image: require('../../Images/physic.png'),
      type: 'top rated',
      class: 'class one',
    },
    {
      id: '1',
      title: 'Mathematics',
      rating: 4.4,
      users: 10,
      image: require('../../Images/maths.png'),
      type: 'most popular',
      class: 'class two',
    },
    {
      id: '4',
      title: 'Chemistry',
      rating: 4.4,
      users: 10,
      image: require('../../Images/courses.png'),
      type: 'most popular',
      class: 'class four',
    },
    {
      id: '5',
      title: 'Biology',
      rating: 4.4,
      users: 10,
      image: require('../../Images/courses.png'),
      type: 'most popular',
      class: 'class four',
    },
    // Add more dummy data objects as needed
  ];
  const renderItem = ({item}: any) => (
    <View
      style={{
        backgroundColor: '#d7e5ffd9',
        borderRadius: 16,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
      }}>
      <View
        style={{
          position: 'relative',
          left: 20,
          justifyContent: 'center',
          zIndex: 10,
        }}>
        <Text
          style={[
            styles.textType3,
            {
              color: Color.white,
              backgroundColor:
                item.type == 'tranding'
                  ? Color.Yellow
                  : item.type == 'top rated'
                  ? 'blue'
                  : item.type == 'most popular'
                  ? Color.Yellow
                  : Color.Primary,

              fontSize: 14,
              textTransform: 'capitalize',
              textAlign: 'center',
              borderRadius: 5,
              width: 120,
              height: 20,
            },
          ]}>
          {item.type}
        </Text>

        <View style={{margin: 10}}></View>
        <Text style={[styles.textType1]}>{item.title}</Text>
        <View style={{flexDirection: 'row', gap: 20}}>
          <View style={{flexDirection: 'row', gap: 10, marginTop: 10}}>
            <FontAwesome
              name="star-half-empty"
              size={20}
              color={Color.Primary}
            />
            <Text style={styles.textType3}>{item.rating}</Text>
          </View>
          <View style={{flexDirection: 'row', gap: 10, marginTop: 10}}>
            <FontAwesome
              name="users"
              size={19}
              color={Color.Primary} // Make sure Color.Primary is defined or replace it with a color value
            />
            <Text style={styles.textType3}>{item.users}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            paddingHorizontal: 15,
            height: 30,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
            backgroundColor: Color.Primary,
            borderRadius: 8,
          }}>
          <Text
            style={[
              styles.textType3,
              {color: Color.white, fontSize: 18}, // Make sure Color.white is defined or replace it with a color value
            ]}>
            View Course
          </Text>
        </TouchableOpacity>
      </View>
      <Image source={item.image} style={{width: 200, height: 200}} />
    </View>
  );
  const [filterSubject, setFilterSubject] = useState<any>([]);
  useEffect(() => {
    // Filter subjectData based on the selected class ID
    if (selectedClass === 'Most Enroll Classes') {
      setFilterSubject(subjectData);
    } else {
      const filteredData = subjectData.filter(
        item => item.class.toLowerCase() === selectedClass.toLowerCase(),
      );
      setFilterSubject(filteredData);
    }
  }, [selectedClass]);
  console.log('filterSubject', filterSubject);

  return (
    <View
      style={{
        paddingHorizontal: 25,
        backgroundColor: Color.PattensBlue,
        height: '100%',
      }}>
      <Header navigation={navigation} drawerBtn notification />
      <Text style={{color: Color.Primary, fontSize: 34, fontWeight: 'bold'}}>
        Hello Zea!
      </Text>
      <Text
        style={{color: Color.IronsideGrey, fontSize: 18, fontWeight: 'bold'}}>
        Let's Found your favorite {'\n'}Courses
      </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{marginTop: 20}}></View>
        <SearchBar />
        <View style={{marginTop: 20}}></View>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginHorizontal: 10,
            marginTop: 15,
          }}>
          <Text style={[styles.textType1]}>Subjects</Text>
          <Text
            style={[
              styles.textType3,
              {color: Color.BrightBlue, fontFamily: 'Circular Std Book'},
            ]}>
            View All
          </Text>
        </View>
        <View>
          <FlatList
            data={data}
            renderItem={renderSubject}
            keyExtractor={item => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View style={{margin: 10}}></View>
        <View>
          {filterSubject.length > 0 ? (
            <FlatList
              data={filterSubject}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
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

        {/* <View
          style={{
            backgroundColor: '#d7e5ffd9',
            borderRadius: 16,
            display: 'flex',
            flexDirection: 'row',
            marginVertical: 15,
          }}>
          <View
            style={{position: 'relative', left: 20, justifyContent: 'center'}}>
            <Text style={[styles.textType1]}>Methamatics</Text>
            <View style={{flexDirection: 'row', gap: 20}}>
              <View style={{flexDirection: 'row', gap: 10, marginTop: 10}}>
                <FontAwesome
                  name="star-half-empty"
                  size={20}
                  color={Color.Primary}
                />
                <Text style={styles.textType3}>4.4</Text>
              </View>
              <View style={{flexDirection: 'row', gap: 10, marginTop: 10}}>
                <FontAwesome name="users" size={19} color={Color.Primary} />
                <Text style={styles.textType3}>10</Text>
              </View>
            </View>
            <TouchableOpacity
              style={{
                paddingHorizontal: 15,
                height: 30,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 20,
                backgroundColor: Color.Primary,
                borderRadius: 30,
              }}>
              <Text
                style={[styles.textType3, {color: Color.white, fontSize: 18}]}>
                View Course
              </Text>
            </TouchableOpacity>
          </View>
          <Image
            source={require('../../Images/courses.png')}
            style={{width: 200, height: 200}}
          />
        </View> */}
      </ScrollView>
    </View>
  );
};

export default Home;

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
