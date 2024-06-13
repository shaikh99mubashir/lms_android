import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from 'react-native';
  import React, { useEffect, useState } from 'react';
  import { FlatList } from 'react-native';
  import Header from '../../Components/Header';
  import { Color } from '../../Constant';
  import CustomLoader from '../../Components/CustomLoader';
  
  const NotificationsList = ({ navigation }: any) => {
    const [notifications, setNotifications] = useState([]);
    const [groupedNotifications, setGroupedNotifications] = useState([]);
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      setLoading(true);
      // Simulate fetching data
      setTimeout(() => {
        const dummyNotifications :any = [
          { id: 1, title: 'New Assignment', description: 'You have a new assignment due next week.', date: '2024-06-05T12:00:00Z' },
          { id: 2, title: 'Course Cancellation', description: 'Your math class has been cancelled.', date: '2024-06-05T15:00:00Z' },
          { id: 3, title: 'Exam Schedule', description: 'Your exams will start from next Monday.', date: '2024-06-06T09:00:00Z' },
          { id: 4, title: 'Holiday Notice', description: 'The school will be closed next Friday.', date: '2024-06-06T10:00:00Z' },
          { id: 5, title: 'Event Reminder', description: 'Remember to attend the school event tomorrow.', date: '2024-06-07T08:00:00Z' },
        ];
        setNotifications(dummyNotifications);
        groupNotificationsByDate(dummyNotifications);
        setLoading(false);
      }, 1000);
    }, []);
  
    const groupNotificationsByDate = (notifications: any) => {
      const grouped = notifications.reduce((acc: any, notification: any) => {
        const notificationDate = new Date(notification.date).toLocaleDateString(
          [],
          {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          },
        );
  
        if (!acc[notificationDate]) {
          acc[notificationDate] = [];
        }
        acc[notificationDate].push(notification);
        return acc;
      }, {});
  
      const groupedArray: any = Object.keys(grouped).map(date => ({
        date,
        data: grouped[date],
      }));
  
      setGroupedNotifications(groupedArray);
    };
  
    return (
      <View
        style={{
          backgroundColor: Color.GhostWhite,
          height: '100%',
        }}>
        <ScrollView>
          <View style={{ paddingHorizontal: 25 }}>
            <Header title={'Notifications'} goBack navigation={navigation} />
            <FlatList
              data={groupedNotifications}
              renderItem={({ item }: any) => (
                <View>
                  <Text
                    style={[
                      styles.textType1,
                      { color: Color.IronsideGrey, fontSize: 20, marginBottom: 10 },
                    ]}>
                    {item?.date}
                  </Text>
                  {item?.data.map((notification: any) => (
                    <View
                      key={notification.id}
                      style={{
                        marginBottom: 15,
                        backgroundColor: Color.white,
                        padding: 20,
                        borderRadius: 10,
                      }}>
                      <Text style={styles.textType1}>{notification.title}</Text>
                      <View style={{ margin: 5 }} />
                      <Text style={[styles.textType3, { color: Color.IronsideGrey }]}>
                        {notification.description}
                      </Text>
                    </View>
                  ))}
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
              ListEmptyComponent={() => (
                <View style={[{
                  flex: 1,
                  minHeight: 160,
                  justifyContent: 'center',
                  alignItems: 'center',
                }]}>
                  <Text style={{ textAlign: 'center', marginTop: 20 }}>No notifications available</Text>
                </View>
              )}
            />
          </View>
        </ScrollView>
        <View style={{ margin: 10 }} />
        <CustomLoader visible={loading} />
      </View>
    );
  };
  
  export default NotificationsList;
  
  const styles = StyleSheet.create({
    textType3: {
      color: Color.Dune,
      fontSize: 15,
      fontFamily: 'Circular Std Medium',
    },
    textType1: {
      fontSize: 21,
      color: Color.Black,
      fontFamily: 'Circular Std Medium',
    },
    dateHeader: {
      fontSize: 18,
      color: Color.Dune,
      fontFamily: 'Circular Std Medium',
      marginVertical: 10,
    },
  });
  