import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';
import {Color} from '../../Constant';
import Ionicons from 'react-native-vector-icons/Ionicons';
const InputText2 = ({
  label,
  placeholder,
  onChangeText,
  value,
  error,
  keyboardType,
  isCorrect,
  editable
}: any) => {
  return (
    <View style={{gap: 5, marginTop: 10,}}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
      </View>
      <View style={[styles.inputContainer, error && {borderWidth: 1, borderColor: 'red'},]}>
        <TextInput
          style={[
            styles.input,
            // Apply red border if there is an error
          ]}
          placeholder={placeholder}
          placeholderTextColor="#A9A9A9"
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          editable={editable}
        />
        <View style={{position:'absolute', right:8}}>
          {isCorrect &&
          <Ionicons name="checkmark-circle" size={22} color="#5c9272" />
          }
        </View>
      </View>
      {error && <Text style={{color: 'red'}}> {error}</Text>}
    </View>
  );
};

export default InputText2;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderBottomWidth: 1,
    borderColor: Color.DustyGrey,
  },
  input: {
    fontFamily: 'Poppins-Medium',
    color: Color.DustyGrey,
    fontSize: 18,
    width:'90%'
  },
  labelContainer: {
    // backgroundColor: 'white',
    // position: 'absolute',
    // top: -15,
    // left: 25,
    // paddingHorizontal: 10,
    // zIndex: 1,
  },
  label: {
    color: Color.Dune,
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
  },
});
