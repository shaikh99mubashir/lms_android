import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../../Components/Header';
import {Color} from '../../Constant';
import Entypo from 'react-native-vector-icons/Entypo';

const FAQs = ({navigation}: any) => {
  const [faqsData, setFaqsData]: any = useState<any>([
    {
      id: '1',
      question:
        'What are the Criteria needed to be selected when applying for job tickets?',
      description:
        'First and foremost, you must meet the eligibility criteria specified by the job provider.',
      open: false,
    },
    {
      id: '2',
      question: 'What are the Requirements to become a tutor-Partner?',
      description:
        'First and foremost, you must meet the eligibility criteria specified by the job provider.',
      open: false,
    },
    {
      id: '3',
      question:
        'I have applied for a few job tickets, but they are still pending. May l know why?',
      description:
        'First and foremost, you must meet the eligibility criteria specified by the job provider.',
      open: false,
    },
    {
      id: '4',
      question:
        'Who may l refer to regarding my application’s status as a Tutor-Partner?',
      description:
        'First and foremost, you must meet the eligibility criteria specified by the job provider.',
      open: false,
    },
    {
      id: '5',
      question: 'Can l apply for more than one job ticket?',
      description:
        'First and foremost, you must meet the eligibility criteria specified by the job provider.',
      open: false,
    },
    {
      id: '6',
      question:
        'What’s next if my Tutorla application is accepted? Do l need to fill out forms or prepare any documentation?',
      description:
        'First and foremost, you must meet the eligibility criteria specified by the job provider.',
      open: false,
    },
  ]);

  const handleQuestionPress = (index: number) => {
    setFaqsData((prevData: any) =>
      prevData.map((faq: any, i: number) => ({
        ...faq,
        open: i === index ? !faq.open : false,
      })),
    );
  };

  const renderFAQItem = ({item, index}: any) => (
    <View style={{marginBottom: 20}}>
      <TouchableOpacity
        onPress={() => handleQuestionPress(index)}
        activeOpacity={0.8}
        style={{
          backgroundColor: Color.white,
          padding: 20,
          borderRadius: 10,
         
        }}>
          <View style={{ flexDirection: 'row',
          alignItems: 'center',}}>
        <View style={{width: '90%'}}>
          <Text style={[styles.textType3, {fontSize: 14}]}>
            {item.question}
          </Text>
        </View>
        <View style={{marginLeft: 10}}>
          <Entypo
            name={item.open ? 'minus' : 'plus'}
            size={18}
            color={Color.Black}
          />
        </View>
        </View>
        {item.open && (
        <Text
          style={[
            styles.textType3,
            {
              fontSize: 14,
              fontFamily: 'Circular Std Book',
              color: Color.IronsideGrey,
              paddingVertical: 10,
            },
          ]}>
          {item.description}
        </Text>
      )}
      </TouchableOpacity>
     
    </View>
  );

  return (
    <View
      style={{
        backgroundColor: Color.GhostWhite,
        height: '100%',
      }}>
      <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled>
        <View style={{ paddingHorizontal: 25,}}>
        <Header goBack title="FAQs" navigation={navigation} />
        <View style={{margin: 10}}></View>
        <Text style={[styles.textType3, {textAlign: 'center'}]}>
          What do you want to know?
        </Text>
        <View style={{margin: 8}}></View>
        <Text
          style={[
            styles.textType1,
            {textAlign: 'center', fontFamily: 'Circular Std Bold'},
          ]}>
          Some of the most Frequently Asked Questions
        </Text>
        {/* <View style={{margin: 15}}></View> */}
        <View>{/* <Image source={require('../../Images/faq1.png')} /> */}</View>
        <View style={{margin: 15}}></View>

        <View>
          <FlatList
            data={faqsData}
            renderItem={renderFAQItem}
            keyExtractor={item => item.id}
          />
        </View>

        <View style={{margin: 15}}></View>
        <View>
          {/* <Image source={require('../../Images/FaqPayment.png')} /> */}
        </View>
        <View style={{margin: 15}}></View>

        {/* <View>
          <FlatList
            data={faqsData}
            renderItem={renderFAQItem}
            keyExtractor={item => item.id}
          />
        </View> */}

        <View style={{margin: 15}}></View>
        <View>
          {/* <Image source={require('../../Images/Other.png')} /> */}
        </View>
        <View style={{margin: 15}}></View>
        {/* <View>
          <FlatList
            data={faqsData}
            renderItem={renderFAQItem}
            keyExtractor={item => item.id}
          />
        </View> */}
        <View style={{margin: 20}}></View>
        </View>
      </ScrollView>
    </View>
  );
};

export default FAQs;

const styles = StyleSheet.create({
  textType3: {
    color: Color.Dune,
    // fontWeight: '500',
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
