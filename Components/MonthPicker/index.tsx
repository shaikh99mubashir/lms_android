import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import moment from 'moment';
import MonthPicker from 'react-native-month-year-picker';



const MonthPickerModal = ({ placeholder }: any) => {

  const [isOpen, toggleOpen] = useState(false);
  const [value, onChange] = useState(null);
  const onValueChange = () => {
    toggleOpen(false)
  }
  return (
    <View style={styles.container}>
    <TouchableOpacity onPress={() => toggleOpen(true)} style={styles.input}>
      <Text style={styles.inputText}>
        {value ? moment(value).format('MM/YYYY') : placeholder}
      </Text>
    </TouchableOpacity>

    <Modal
      transparent
      animationType="fade"
      visible={isOpen}
      >
      <View style={styles.contentContainer}>
          <MonthPicker
          onChange={onValueChange}
            value={value || new Date()}
          />
        {/* <View style={styles.content}>
        </View> */}
      </View>
    </Modal>
  </View>
  );
};

export default MonthPickerModal;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    input: {
      backgroundColor: 'white',
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderWidth: 0.5,
      borderRadius: 5,
      width: '100%',
      marginVertical: 6,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    inputText: {
      fontSize: 16,
      fontWeight: '500',
      color:'black'
    },
    contentContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    content: {
      backgroundColor: 'black',
      marginHorizontal: 20,
      marginVertical: 70,
      padding: 20,
      borderRadius: 10,
    },
    confirmButton: {
      borderWidth: 0.5,
      padding: 15,
      margin: 10,
      borderRadius: 5,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
